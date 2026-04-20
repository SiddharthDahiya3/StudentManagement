import 'dotenv/config';

import { db } from "../lib/db.js";
import {
  departments,
  faculties,
  students,
  courses,
  enrollments,
  marks,
  attendance,
} from "../lib/schema.js";

async function main() {
  console.log("🌱 Seeding database...");
  console.log(process.env.DATABASE_URL)

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await db.delete(attendance);
  await db.delete(marks);
  await db.delete(enrollments);
  await db.delete(courses);
  await db.delete(students);
  await db.delete(faculties);
  await db.delete(departments);
  console.log("✅ Data cleared");

  // --- Departments ---
  const [cse, ece, mech] = await db
    .insert(departments)
    .values([
      {
        name: "Computer Science and Engineering",
        code: "CSE",
        description: "Department of Computer Science",
      },
      {
        name: "Electronics and Communication Engineering",
        code: "ECE",
        description: "Department of Electronics and Communication",
      },
      {
        name: "Mechanical Engineering",
        code: "MECH",
        description: "Department of Mechanical Engineering",
      },
    ] as any)
    .returning();

  console.log("✅ Departments seeded");

  // --- Faculties ---
  const [faculty1, faculty2, faculty3, faculty4, faculty5] = await db
    .insert(faculties)
    .values([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@university.edu",
        departmentId: cse.id,
        designation: "Professor",
        joinDate: "2020-07-01",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@university.edu",
        departmentId: ece.id,
        designation: "Associate Professor",
        joinDate: "2021-01-15",
      },
      {
        firstName: "Robert",
        lastName: "Brown",
        email: "robert.brown@university.edu",
        departmentId: mech.id,
        designation: "Assistant Professor",
        joinDate: "2022-03-10",
      },
      {
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@university.edu",
        departmentId: cse.id,
        designation: "Lecturer",
        joinDate: "2023-01-20",
      },
      {
        firstName: "Michael",
        lastName: "Wilson",
        email: "michael.wilson@university.edu",
        departmentId: ece.id,
        designation: "Professor",
        joinDate: "2019-09-01",
      },
    ] as any)
    .returning();

  console.log("✅ Faculties seeded");

  // --- Students ---
  const [student1, student2, student3, student4, student5, student6, student7, student8, student9, student10] = await db
    .insert(students)
    .values([
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@student.edu",
        departmentId: cse.id,
        enrollmentDate: "2023-08-01",
        address: "123 Main St, City",
      },
      {
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@student.edu",
        departmentId: ece.id,
        enrollmentDate: "2023-08-01",
        address: "456 Second St, City",
      },
      {
        firstName: "Charlie",
        lastName: "Taylor",
        email: "charlie.taylor@student.edu",
        departmentId: mech.id,
        enrollmentDate: "2023-08-01",
        address: "789 Third St, City",
      },
      {
        firstName: "Diana",
        lastName: "Anderson",
        email: "diana.anderson@student.edu",
        departmentId: cse.id,
        enrollmentDate: "2023-08-01",
        address: "101 Fourth St, City",
      },
      {
        firstName: "Ethan",
        lastName: "Thomas",
        email: "ethan.thomas@student.edu",
        departmentId: ece.id,
        enrollmentDate: "2023-08-01",
        address: "202 Fifth St, City",
      },
      {
        firstName: "Fiona",
        lastName: "Jackson",
        email: "fiona.jackson@student.edu",
        departmentId: mech.id,
        enrollmentDate: "2023-08-01",
        address: "303 Sixth St, City",
      },
      {
        firstName: "George",
        lastName: "White",
        email: "george.white@student.edu",
        departmentId: cse.id,
        enrollmentDate: "2023-08-01",
        address: "404 Seventh St, City",
      },
      {
        firstName: "Hannah",
        lastName: "Harris",
        email: "hannah.harris@student.edu",
        departmentId: ece.id,
        enrollmentDate: "2023-08-01",
        address: "505 Eighth St, City",
      },
      {
        firstName: "Ian",
        lastName: "Martin",
        email: "ian.martin@student.edu",
        departmentId: mech.id,
        enrollmentDate: "2023-08-01",
        address: "606 Ninth St, City",
      },
      {
        firstName: "Julia",
        lastName: "Thompson",
        email: "julia.thompson@student.edu",
        departmentId: cse.id,
        enrollmentDate: "2023-08-01",
        address: "707 Tenth St, City",
      },
    ] as any)
    .returning();

  console.log("✅ Students seeded");

  // --- Courses ---
  const [course1, course2, course3, course4, course5] = await db
    .insert(courses)
    .values([
      {
        code: "CS101",
        name: "Introduction to Programming",
        description: "Basics of programming with C",
        credits: 4,
        departmentId: cse.id,
        facultyId: faculty1.id,
      },
      {
        code: "EC201",
        name: "Digital Circuits",
        description: "Fundamentals of electronic circuits",
        credits: 3,
        departmentId: ece.id,
        facultyId: faculty2.id,
      },
      {
        code: "ME301",
        name: "Thermodynamics",
        description: "Principles of thermodynamics",
        credits: 3,
        departmentId: mech.id,
        facultyId: faculty3.id,
      },
      {
        code: "CS201",
        name: "Data Structures",
        description: "Advanced data structures and algorithms",
        credits: 4,
        departmentId: cse.id,
        facultyId: faculty4.id,
      },
      {
        code: "EC301",
        name: "Microprocessors",
        description: "Introduction to microprocessors and embedded systems",
        credits: 3,
        departmentId: ece.id,
        facultyId: faculty5.id,
      },
    ] as any)
    .returning();

  console.log("✅ Courses seeded");

  // --- Enrollments ---
  const enrollmentsData = [
    { student: student1, course: course1, grade: "A" },
    { student: student1, course: course4, grade: "B" },
    { student: student2, course: course2, grade: "B" },
    { student: student3, course: course3, grade: "C" },
    { student: student4, course: course1, grade: "A" },
    { student: student4, course: course4, grade: "A" },
    { student: student5, course: course2, grade: "B" },
    { student: student5, course: course5, grade: "C" },
    { student: student6, course: course3, grade: "B" },
    { student: student7, course: course1, grade: "A" },
    { student: student7, course: course4, grade: "B" },
    { student: student8, course: course2, grade: "C" },
    { student: student8, course: course5, grade: "B" },
    { student: student9, course: course3, grade: "A" },
    { student: student10, course: course1, grade: "B" },
    { student: student10, course: course4, grade: "A" },
  ];

  const enrollmentsInserted = await db
    .insert(enrollments)
    .values(
      enrollmentsData.map(({ student, course, grade }) => ({
        studentId: student.id,
        courseId: course.id,
        semester: "Fall",
        year: 2023,
        grade: grade as any,
      }))
    )
    .returning();

  console.log("✅ Enrollments seeded");

  // --- Marks ---
  const marksData = [
    { enrollment: enrollmentsInserted[0], examType: "Midterm", score: "45", maxScore: "50", remarks: "Excellent work" },
    { enrollment: enrollmentsInserted[0], examType: "Final", score: "90", maxScore: "100", remarks: "Great performance" },
    { enrollment: enrollmentsInserted[1], examType: "Midterm", score: "40", maxScore: "50", remarks: "Good job" },
    { enrollment: enrollmentsInserted[2], examType: "Midterm", score: "38", maxScore: "50", remarks: "Good job" },
    { enrollment: enrollmentsInserted[3], examType: "Midterm", score: "30", maxScore: "50", remarks: "Needs improvement" },
    { enrollment: enrollmentsInserted[4], examType: "Midterm", score: "48", maxScore: "50", remarks: "Outstanding" },
    { enrollment: enrollmentsInserted[5], examType: "Final", score: "95", maxScore: "100", remarks: "Excellent" },
    { enrollment: enrollmentsInserted[6], examType: "Midterm", score: "42", maxScore: "50", remarks: "Well done" },
    { enrollment: enrollmentsInserted[7], examType: "Midterm", score: "35", maxScore: "50", remarks: "Satisfactory" },
    { enrollment: enrollmentsInserted[8], examType: "Midterm", score: "40", maxScore: "50", remarks: "Good" },
    { enrollment: enrollmentsInserted[9], examType: "Midterm", score: "47", maxScore: "50", remarks: "Very good" },
    { enrollment: enrollmentsInserted[10], examType: "Final", score: "88", maxScore: "100", remarks: "Good" },
    { enrollment: enrollmentsInserted[11], examType: "Midterm", score: "32", maxScore: "50", remarks: "Average" },
    { enrollment: enrollmentsInserted[12], examType: "Midterm", score: "36", maxScore: "50", remarks: "Fair" },
    { enrollment: enrollmentsInserted[13], examType: "Midterm", score: "49", maxScore: "50", remarks: "Excellent" },
    { enrollment: enrollmentsInserted[14], examType: "Midterm", score: "43", maxScore: "50", remarks: "Good" },
  ];

  await db.insert(marks).values(
    marksData.map(({ enrollment, examType, score, maxScore, remarks }) => ({
      enrollmentId: enrollment.id,
      examType,
      score,
      maxScore,
      remarks,
    }))
  );

  console.log("✅ Marks seeded");

  // --- Attendance ---
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  const attendanceData = [];
  enrollmentsInserted.forEach((enrollment, index) => {
    dates.forEach((date, dateIndex) => {
      attendanceData.push({
        enrollmentId: enrollment.id,
        date: date,
        isPresent: Math.random() > 0.2, // 80% attendance
        remarks: Math.random() > 0.8 ? "Late" : null,
      });
    });
  });

  await db.insert(attendance).values(attendanceData as any);

  console.log("✅ Attendance seeded");
  console.log("🎉 All data inserted successfully!");
}

main()
  .then(() => {
    console.log("✅ Seeding completed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  });
