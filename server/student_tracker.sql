CREATE DATABASE student_tracker;

USE student_tracker;

CREATE TABLE users (
  id          VARCHAR(10)  PRIMARY KEY,
  email       VARCHAR(100) NOT NULL,
  firstname        VARCHAR(100) NOT NULL,
  lastname        VARCHAR(100) NOT NULL,
  role        VARCHAR(20)  NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  password    VARCHAR(255) NOT NULL, -- store hashed passwords (e.g. bcrypt)
  UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE student_profile (
  student_id  VARCHAR(10) PRIMARY KEY,
  grade_level INT,
  section     VARCHAR(50),
  FOREIGN KEY (student_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE teacher_profile (
  teacher_id    VARCHAR(10)  PRIMARY KEY,
  department    VARCHAR(100),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE admin_profile (
  admin_id    VARCHAR(10)  PRIMARY KEY,
  access_level INT DEFAULT 1,
  FOREIGN KEY (admin_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE subjects (
  subject_id   INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL,
  teacher_id   VARCHAR(10)  NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE grades (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(10) NOT NULL,
  subject_id INT         NOT NULL,
  score      INT         NOT NULL,
  feedback   TEXT,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
) ENGINE=InnoDB;

CREATE TABLE attendance (
  log_id     INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(10) NOT NULL,
  log_date   DATE        NOT NULL,
  status     VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  FOREIGN KEY (student_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- ============================================================
-- SAMPLE DATA
-- NOTE: In production, passwords must be hashed (e.g. bcrypt)
-- ============================================================
INSERT INTO users (id, email, firstname, lastname, role, password) VALUES
('1001', 'admin@school.com',   'System',	'Admin', 	'admin',   'hashed_password_here'),
('2001', 'teacher@school.com', 'Mr.', 		'Smith',    'teacher', 'hashed_password_here'),
('3001', 'student@school.com', 'John', 		'Doe',     	'student', 'hashed_password_here');

INSERT INTO admin_profile (admin_id, access_level) VALUES
('1001', 1);

INSERT INTO teacher_profile (teacher_id, department) VALUES
('2001', 'Science and Math');

INSERT INTO student_profile (student_id, grade_level, section) VALUES
('3001', 10, 'Section A');

INSERT INTO subjects (subject_name, teacher_id) VALUES
('Mathematics', '2001'),
('Science',     '2001');

INSERT INTO grades (student_id, subject_id, score, feedback) VALUES
('3001', 1, 85, 'Excellent work!'),
('3001', 2, 92, 'Consistent performance.');