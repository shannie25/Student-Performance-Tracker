const express = require("express");
const cors = require("cors");
const { pool, testConnection } = require("./db");

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.get("/api/health", async (_req, res) => {
  try {
    await testConnection();
    res.json({ ok: true, message: "Database connected" });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({ ok: false, message: "Database connection failed" });
  }
});

const getUsers = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, name, role, password FROM users ORDER BY name ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const getGrades = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        student_id AS studentId,
        subject,
        score,
        feedback
      FROM grades
      ORDER BY id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch grades:", error);
    res.status(500).json({ message: "Failed to fetch grades" });
  }
};

app.get("/api/users", getUsers);
app.get("/users", getUsers);
app.get("/api/grades", getGrades);
app.get("/grades", getGrades);

app.post("/api/login", async (req, res) => {
  const { identifier, password, role } = req.body;

  if (!identifier || !password || !role) {
    return res.status(400).json({ message: "Identifier, password, and role are required" });
  }

  const field = role === "student" ? "id" : "email";

  try {
    const [rows] = await pool.query(
      `SELECT id, email, name, role, password
       FROM users
       WHERE ${field} = ? AND role = ?
       LIMIT 1`,
      [identifier, role]
    );

    const user = rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/register", async (req, res) => {
  const { studentId, email, firstName, middleName, lastName, password, role = "student" } = req.body;
  const normalizedRole = role === "teacher" ? "teacher" : "student";

  if (!studentId || !email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "Missing required registration fields" });
  }

  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

  try {
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE id = ? OR email = ? LIMIT 1",
      [studentId, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "A user with that ID or email already exists" });
    }

    await pool.query(
      "INSERT INTO users (id, email, name, role, password) VALUES (?, ?, ?, ?, ?)",
      [studentId, email, fullName, normalizedRole, password]
    );

    res.status(201).json({
      id: studentId,
      email,
      name: fullName,
      role: normalizedRole,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/grades", async (req, res) => {
  const { studentId, subject, score, feedback } = req.body;

  if (!studentId || !subject || Number.isNaN(Number(score))) {
    return res.status(400).json({ message: "studentId, subject, and score are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO grades (student_id, subject, score, feedback) VALUES (?, ?, ?, ?)",
      [String(studentId), subject, Number(score), feedback || ""]
    );

    res.status(201).json({
      id: result.insertId,
      studentId: String(studentId),
      subject,
      score: Number(score),
      feedback: feedback || "",
    });
  } catch (error) {
    console.error("Failed to create grade:", error);
    res.status(500).json({ message: "Failed to create grade" });
  }
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled server error:", error);
  res.status(500).json({ message: "Internal server error" });
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await testConnection();
    console.log("MySQL Connected");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
});

module.exports = server;
