CREATE DATABASE student_tracker;

USE student_tracker;

CREATE TABLE users (
  id          VARCHAR(10)  PRIMARY KEY,
  email       VARCHAR(100) NOT NULL,
  firstname   VARCHAR(100) NOT NULL,
  lastname    VARCHAR(100) NOT NULL,
  role        VARCHAR(20)  NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  password    VARCHAR(255) NOT NULL,
  UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE student_profile (
  student_id  VARCHAR(10) PRIMARY KEY,
  grade_level INT,
  section     VARCHAR(50),
  FOREIGN KEY (student_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE teacher_profile (
  teacher_id  VARCHAR(10)  PRIMARY KEY,
  department  VARCHAR(100),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE admin_profile (
  admin_id     VARCHAR(10) PRIMARY KEY,
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

CREATE TABLE audit_log (
  log_id     INT AUTO_INCREMENT PRIMARY KEY,
  admin_id   VARCHAR(10)  NOT NULL,
  action     VARCHAR(50)  NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id  VARCHAR(50)  NOT NULL,
  old_value  TEXT,
  new_value  TEXT,
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- ==============================	SAMPLE DATA	==============================
INSERT INTO users (id, email, firstname, lastname, role, password) VALUES
('1001', 'admin@school.com',   'System', 'Admin', 'admin',   '$2b$10$hashedpasswordhere'),
('2001', 'teacher@school.com', 'Mr.',    'Smith', 'teacher', '$2b$10$hashedpasswordhere'),
('3001', 'student@school.com', 'John',   'Doe',   'student', '$2b$10$hashedpasswordhere');

INSERT INTO admin_profile (admin_id, access_level) VALUES ('1001', 1);
INSERT INTO teacher_profile (teacher_id, department) VALUES ('2001', 'Science and Math');
INSERT INTO student_profile (student_id, grade_level, section) VALUES ('3001', 10, 'Section A');

INSERT INTO subjects (subject_name, teacher_id) VALUES
('Mathematics', '2001'),
('Science',     '2001');but

INSERT INTO grades (student_id, subject_id, score, feedback) VALUES
('3001', 1, 85, 'Excellent work!'),
('3001', 2, 92, 'Consistent performance.');

-- ==============================	TRIGGERS: USERS TABLE	==============================
CREATE TRIGGER after_users_insert
AFTER INSERT ON users
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, new_value) VALUES (
  @current_admin_id, 'INSERT', 'users', NEW.id,
  CONCAT('firstname: ', NEW.firstname, ', lastname: ', NEW.lastname, ', role: ', NEW.role, ', email: ', NEW.email)
);

CREATE TRIGGER after_users_update
AFTER UPDATE ON users
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value, new_value) VALUES (
  @current_admin_id, 'UPDATE', 'users', OLD.id,
  CONCAT('firstname: ', OLD.firstname, ', lastname: ', OLD.lastname, ', role: ', OLD.role, ', email: ', OLD.email),
  CONCAT('firstname: ', NEW.firstname, ', lastname: ', NEW.lastname, ', role: ', NEW.role, ', email: ', NEW.email)
);

CREATE TRIGGER after_users_delete
AFTER DELETE ON users
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value) VALUES (
  @current_admin_id, 'DELETE', 'users', OLD.id,
  CONCAT('firstname: ', OLD.firstname, ', lastname: ', OLD.lastname, ', role: ', OLD.role, ', email: ', OLD.email)
);

-- ==============================	TRIGGERS: GRADES TABLE	==============================
CREATE TRIGGER after_grades_insert
AFTER INSERT ON grades
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, new_value) VALUES (
  @current_admin_id, 'INSERT', 'grades', NEW.id,
  CONCAT('student_id: ', NEW.student_id, ', subject_id: ', NEW.subject_id, ', score: ', NEW.score)
);

CREATE TRIGGER after_grades_update
AFTER UPDATE ON grades
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value, new_value) VALUES (
  @current_admin_id, 'UPDATE', 'grades', OLD.id,
  CONCAT('student_id: ', OLD.student_id, ', subject_id: ', OLD.subject_id, ', score: ', OLD.score),
  CONCAT('student_id: ', NEW.student_id, ', subject_id: ', NEW.subject_id, ', score: ', NEW.score)
);

CREATE TRIGGER after_grades_delete
AFTER DELETE ON grades
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value) VALUES (
  @current_admin_id, 'DELETE', 'grades', OLD.id,
  CONCAT('student_id: ', OLD.student_id, ', subject_id: ', OLD.subject_id, ', score: ', OLD.score)
);

-- ==============================	TRIGGERS: SUBJECTS TABLE	==============================
CREATE TRIGGER after_subjects_insert
AFTER INSERT ON subjects
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, new_value) VALUES (
  @current_admin_id, 'INSERT', 'subjects', NEW.subject_id,
  CONCAT('subject_name: ', NEW.subject_name, ', teacher_id: ', NEW.teacher_id)
);

CREATE TRIGGER after_subjects_update
AFTER UPDATE ON subjects
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value, new_value) VALUES (
  @current_admin_id, 'UPDATE', 'subjects', OLD.subject_id,
  CONCAT('subject_name: ', OLD.subject_name, ', teacher_id: ', OLD.teacher_id),
  CONCAT('subject_name: ', NEW.subject_name, ', teacher_id: ', NEW.teacher_id)
);

CREATE TRIGGER after_subjects_delete
AFTER DELETE ON subjects
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value) VALUES (
  @current_admin_id, 'DELETE', 'subjects', OLD.subject_id,
  CONCAT('subject_name: ', OLD.subject_name, ', teacher_id: ', OLD.teacher_id)
);


-- ==============================	TRIGGERS: ATTENDANCE TABLE	==============================
CREATE TRIGGER after_attendance_insert
AFTER INSERT ON attendance
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, new_value) VALUES (
  @current_admin_id, 'INSERT', 'attendance', NEW.log_id,
  CONCAT('student_id: ', NEW.student_id, ', date: ', NEW.log_date, ', status: ', NEW.status)
);

CREATE TRIGGER after_attendance_update
AFTER UPDATE ON attendance
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value, new_value) VALUES (
  @current_admin_id, 'UPDATE', 'attendance', OLD.log_id,
  CONCAT('student_id: ', OLD.student_id, ', date: ', OLD.log_date, ', status: ', OLD.status),
  CONCAT('student_id: ', NEW.student_id, ', date: ', NEW.log_date, ', status: ', NEW.status)
);

CREATE TRIGGER after_attendance_delete
AFTER DELETE ON attendance
FOR EACH ROW
INSERT INTO audit_log (admin_id, action, table_name, record_id, old_value) VALUES (
  @current_admin_id, 'DELETE', 'attendance', OLD.log_id,
  CONCAT('student_id: ', OLD.student_id, ', date: ', OLD.log_date, ', status: ', OLD.status)
);