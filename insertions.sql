INSERT INTO city (name, created_on, updated_on) 
VALUES 
  ('Prishtina', NOW(), NOW()),
  ('Ferizaj', NOW(), NOW()),
  ('Peja', NOW(), NOW()),
  ('Gjakova', NOW(), NOW()),
  ('Mitrovica', NOW(), NOW()),
  ('Gjilan', NOW(), NOW()),
  ('Prizren', NOW(), NOW()),
  ('Vushtrri', NOW(), NOW());

INSERT INTO generation (name, start_date, end_date, created_on, updated_on)
VALUES 
  ('24/25', '2024-10-01', '2025-07-01', NOW(), NOW()),
  ('25/26', '2025-10-01', '2026-07-01', NOW(), NOW());

INSERT INTO student ( student_id, first_name, last_name, email, password, birth_date, phone_number, enrollment_date, status, gender, city_id, created_on, updated_on)
VALUES 
	(252664975, 'Adea', 'Piperku', 'adeapiperku@gmail.com', 'admin', '2004-09-23', '123123', '2024-04-03', 'ACTIVE', 'F', 1, NOW(), NOW()),
	(252664976, 'Loresa', 'Gashi', 'loresagashi@gmail.com', 'admin', '2004-05-17', '123123', '2024-04-03', 'ACTIVE', 'F', 1, NOW(), NOW());
-- 	(252664977, 'Benina', 'Sharapolli', 'beninasharapolli@gmail.com', 'admin', '2004-08-26', '123123', '2024-04-03', 'ACTIVE', 'F', 1, NOW(), NOW()),
-- 	(252664978, 'Olti', 'Berbatovci', 'oltiberbatovci@gmail.com', 'admin', '2004-06-24', '123123', '2024-04-03', 'ACTIVE', 'M', 1, NOW(), NOW()),
-- 	(252664979, 'Rilind', 'Simnica', 'rilindsimnica@gmail.com', 'admin', '2004-07-09', '123123', '2024-04-03', 'ACTIVE', 'M', 1, NOW(), NOW()),
-- 	(252664980, 'Orges', 'Avdiu', 'orgesavdiu@gmail.com', 'admin', '2004-03-15', '123123', '2024-04-03', 'ACTIVE', 'M', 1, NOW(), NOW());

INSERT INTO professor (first_name, last_name, email, password, birth_date, phone_number, department, city_id, created_on, updated_on)
VALUES 
    ('Profesor', 'Profesor', 'profesor@gmail.com', 'admin', '1985-06-15', '123456', 'Computer Science', 1, NOW(), NOW()),
    ('Arta', 'Berisha', 'arta.berisha@gmail.com', 'admin', '1978-03-22', '234567', 'Architecture', 2, NOW(), NOW());
--     ('Blerim', 'Krasniqi', 'blerim.k@gmail.com', 'admin', '1982-11-10', '345678', 'Mechatronics', 3, NOW(), NOW()),
--     ('Donika', 'Tahiri', 'donika.t@gmail.com', 'admin', '1990-01-05', '456789', 'Law', 4, NOW(), NOW()),
--     ('Ilir', 'Hasani', 'ilir.hasani@gmail.com', 'admin', '1975-07-19', '567890', 'Business and Economics', 5, NOW(), NOW()),
--     ('Gentiana', 'Shala', 'gentiana.shala@gmail.com', 'admin', '1988-09-12', '678901', 'Nursing', 6, NOW(), NOW()),
--     ('Ardian', 'Morina', 'ardian.morina@gmail.com', 'admin', '1980-12-30', '789012', 'Media and Communication', 7, NOW(), NOW()),
--     ('Shqipe', 'Gashi', 'shqipe.gashi@gmail.com', 'admin', '1983-04-25', '890123', 'Psychology', 1, NOW(), NOW()),
--     ('Mentor', 'Zeqiri', 'mentor.zeqiri@gmail.com', 'admin', '1979-08-08', '901234', 'Energy Engineering', 2, NOW(), NOW()),
--     ('Luljeta', 'Dervishi', 'luljeta.d@gmail.com', 'admin', '1986-05-03', '012345', 'Food Science and Technology', 3, NOW(), NOW());
	
INSERT INTO orientation (name, created_on, updated_on) 
VALUES
  ('Management, Business and Economics', NOW(), NOW()),
  ('Computer Science and Engineering', NOW(), NOW()),
  ('Mechatronics', NOW(), NOW()),
  ('Information Systems', NOW(), NOW()),
  ('Law', NOW(), NOW()),
  ('Architecture and Spatial Planning', NOW(), NOW()),
  ('Political Science', NOW(), NOW()),
  ('Media and Communication', NOW(), NOW()),
  ('Construction and Infrastructure', NOW(), NOW()),
  ('Energy Engineering', NOW(), NOW()),
  ('Nursing', NOW(), NOW()),
  ('Food Science and Technology', NOW(), NOW()),
  ('Integrated Design', NOW(), NOW()),
  ('UW - International Relations', NOW(), NOW()),
  ('Dentistry', NOW(), NOW()),
  ('Pharmacy', NOW(), NOW()),
  ('Agricultural Engineering and Environment', NOW(), NOW()),
  ('Art and Digital Media', NOW(), NOW()),
  ('Modern Music, Digital Production and Management', NOW(), NOW()),
  ('English Language', NOW(), NOW()),
  ('Security Studies', NOW(), NOW()),
  ('Psychology', NOW(), NOW()),
  ('Dental Technician', NOW(), NOW()),
  ('Sports and Movement Sciences', NOW(), NOW()),
  ('Biochemistry', NOW(), NOW()),
  ('Acting', NOW(), NOW());

INSERT INTO course (name, description, orientation_id, created_on, updated_on)
VALUES 
  ('Introduction to Programming', 'Covers basic programming concepts using Java, including variables, control structures, functions, and object-oriented principles.', 1, NOW(), NOW()),
  ('Data Structures and Algorithms', 'In-depth study of arrays, lists, stacks, queues, trees, graphs, sorting, and searching algorithms.', 1, NOW(), NOW()),
  ('Database Systems', 'Covers relational databases, SQL, normalization, indexing, transactions, and database design principles.', 2, NOW(), NOW()),
  ('Digital Electronics', 'Introduction to logic gates, circuits, flip-flops, microcontrollers, and their applications in embedded systems.', 3, NOW(), NOW()),
  ('Administrative Law', 'Explores the legal framework of public administration, rights, and judicial review mechanisms.', 4, NOW(), NOW()),
  ('Marketing Principles', 'Covers marketing strategies, consumer behavior, branding, pricing, and distribution concepts.', 5, NOW(), NOW()),
  ('Nursing Ethics and Practice', 'Introduction to the ethical standards and best practices in nursing, including patient care scenarios.', 6, NOW(), NOW()),
  ('Media Writing and Journalism', 'Teaches writing for media, reporting techniques, storytelling, and digital content creation.', 7, NOW(), NOW()),
  ('Psychology of Learning', 'Explores cognitive, behavioral, and social aspects of learning processes in educational contexts.', 8, NOW(), NOW()),
  ('Food Safety and Quality Control', 'Covers food hygiene, safety standards, quality assurance methods, and regulations in the food industry.', 9, NOW(), NOW());

INSERT INTO course_professor (course_id, professor_id) VALUES
  (1, 1),
  (1, 1),
  (2, 2),
  (3, 1),
  (4, 2),
  (5, 2),
  (6, 1),
  (7, 1),
  (8, 2),
  (9, 1),
  (10, 1);

INSERT INTO semester (name, season, start_date, end_date, generation_id, created_on, updated_on)
VALUES
  -- Generation 1 (2024/2025)
  ('Semester 1', 'Fall',   '2024-09-01 00:00:00', '2024-12-20 23:59:59', 1, NOW(), NOW()),
  ('Semester 2', 'Spring', '2025-02-01 00:00:00', '2025-05-15 23:59:59', 1, NOW(), NOW()),
  ('Semester 3', 'Fall',   '2025-09-01 00:00:00', '2025-12-20 23:59:59', 1, NOW(), NOW()),
  ('Semester 4', 'Spring', '2026-02-01 00:00:00', '2026-05-15 23:59:59', 1, NOW(), NOW()),
  ('Semester 5', 'Fall',   '2026-09-01 00:00:00', '2026-12-20 23:59:59', 1, NOW(), NOW()),
  ('Semester 6', 'Spring', '2027-02-01 00:00:00', '2027-05-15 23:59:59', 1, NOW(), NOW()),

  -- Generation 2 (2025/2026)
  ('Semester 1', 'Fall',   '2025-09-01 00:00:00', '2025-12-20 23:59:59', 2, NOW(), NOW()),
  ('Semester 2', 'Spring', '2026-02-01 00:00:00', '2026-05-15 23:59:59', 2, NOW(), NOW()),
  ('Semester 3', 'Fall',   '2026-09-01 00:00:00', '2026-12-20 23:59:59', 2, NOW(), NOW()),
  ('Semester 4', 'Spring', '2027-02-01 00:00:00', '2027-05-15 23:59:59', 2, NOW(), NOW()),
  ('Semester 5', 'Fall',   '2027-09-01 00:00:00', '2027-12-20 23:59:59', 2, NOW(), NOW()),
  ('Semester 6', 'Spring', '2028-02-01 00:00:00', '2028-05-15 23:59:59', 2, NOW(), NOW());

INSERT INTO student_group (name, capacity, generation_id, created_on, updated_on)
VALUES
  ('G1', 30, 1, NOW(), NOW()),
  ('G2', 30, 1, NOW(), NOW()),
  ('G3', 30, 1, NOW(), NOW()),
  ('G1', 30, 2, NOW(), NOW()),
  ('G2', 30, 2, NOW(), NOW()),
  ('G3', 30, 2, NOW(), NOW());

-- INSERT INTO student_group_semester (group_id, semester_id, created_on, updated_on) VALUES
-- (1, 1, NOW(), NOW()),
-- (1, 2, NOW(), NOW()),
-- (2, 1, NOW(), NOW()),
-- (2, 2, NOW(), NOW()),
-- (3, 1, NOW(), NOW()),
-- (3, 2, NOW(), NOW());

-- INSERT INTO schedule (group_semester_id, course_id, day_of_week, start_time, end_time, room, professor_id, created_on, updated_on) 
-- VALUES
-- 	(1, 1, 'MONDAY', '09:00', '10:30', 'Room 101', 1, NOW(), NOW()),
-- 	(1, 2, 'WEDNESDAY', '11:00', '12:30', 'Room 102', 2, NOW(), NOW()),
-- 	(2, 3, 'TUESDAY', '14:00', '15:30', 'Room 201', 3, NOW(), NOW()),
-- 	(2, 4, 'THURSDAY', '08:00', '09:30', 'Room 202', 4, NOW(), NOW()),
-- 	(3, 5, 'FRIDAY', '10:00', '11:30', 'Room 301', 5, NOW(), NOW()),
-- 	(3, 6, 'MONDAY', '13:00', '14:30', 'Room 303', 6, NOW(), NOW()),
-- 	(4, 7, 'WEDNESDAY', '15:00', '16:30', 'Room 401', 7, NOW(), NOW()),
-- 	(4, 8, 'THURSDAY', '09:00', '10:30', 'Room 402', 8, NOW(), NOW()),
-- 	(5, 9, 'TUESDAY', '12:00', '13:30', 'Room 501', 9, NOW(), NOW()),
-- 	(5, 10, 'FRIDAY', '14:00', '15:30', 'Room 502', 10, NOW(), NOW());

-- INSERT INTO lecture (course_id, name, lecture_date, topic)
-- VALUES (1, 'Introduction to Algorithms', '2025-04-05', 'Basic Sorting Algorithms');

-- INSERT INTO assignment (course_id, title, description, due_date)
-- VALUES (1, 'Assignment 1: Introduction to Java', 'Complete the exercises on Java fundamentals', '2025-04-10');

-- INSERT INTO submission (assignment_id, student_id, submission_date, file_url)
-- VALUES (1, 1, '2025-04-05', 'submission1.pdf');

-- INSERT INTO grade (assignment_id, student_id, grade) 
-- VALUES 
--     (1, 1, 10);

-- INSERT INTO payments (student_id, amount, payment_date, payment_method, status)
-- VALUES (1, 49.99, NOW(), 'CREDIT_CARD', 'COMPLETED');

-- INSERT INTO schedule (student_id, course_id, professor_id, day_of_week, start_time, end_time, room) 
-- VALUES (1, 1, 1, 'MONDAY', '09:00:00', '10:30:00', 'Room 101');

-- INSERT INTO enrollment (student_id, course_id, enrollment_date, status) 
-- VALUES (1, 1, '2025-04-04', 'ACTIVE');

-- INSERT INTO feedback (student_id, course_id, rating, comment, timestamp) 
-- VALUES (1, 1, 4.5, 'Great course, learned a lot!', '2025-04-04 10:00:00');
