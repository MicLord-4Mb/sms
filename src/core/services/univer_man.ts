import { Student } from '../domain/models/student.ts';
import { Course } from '../domain/models/course.ts';
import {type CourseID, CourseType, type StudentID} from '../domain/types.ts';
import type {ICourseDTO, IStudentDTO} from "../dto/dto.ts";
import type {IRepository} from "../repositories/interfaces.ts";

/**
 * Main management class handling operations for students, courses, and grades.
 * Acts as the central core of the application business logic.
 */
export class UniversityManager {

  constructor(
    private readonly studentRepo: IRepository<IStudentDTO>,
    private readonly coursesRepo: IRepository<ICourseDTO>
  ) {}

  /**
   * Adds a new student to the university.
   * @param id - The unique ID of the student.
   * @param name - The full name of the student.
   * @param dateOfBirth - The student's date of birth.
   * @returns The created student instance.
   */
  addStudent (id: StudentID, name: string, dateOfBirth: Date): Student {
    const student = new Student(id, name, dateOfBirth);
    this.studentRepo.add(student);
    this.saveData();
    return student;
  }
  // TODO write this
  updateStudent(id: StudentID, name: string, dateOfBirth: Date): void {}
  deleteStudent(id: StudentID): void {}

  addCourse(
    id: CourseID,
    courseName: string,
    credits: number,
    type: CourseType = CourseType.COMPULSORY
    ): Course {

    const course = new Course(id, courseName, credits, type);
    this.coursesRepo.add(course);
    this.saveData();
    return course;
  }

  // TODO and this
  updateCourse( id: CourseID, courseName: string, credits: number, type: CourseType ): void {}
  deleteCourse(id: CourseID): void {}
  clearAllData(): void {}

  assignGradeToStudent(studentID: StudentID, courseID: CourseID, score: number): void {}

  findStudentByName(name:string): Student[] {
    return this.studentRepo.getAll()
  }
  findStudentByCourse(courseName: string): Student[] {
    return this.studentRepo.getAll()
  }

}