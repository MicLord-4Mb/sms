import { Student } from '../domain/models/student.ts';
import { Course } from '../domain/models/course.ts';
import { Repository } from '../repositories/repository.ts';
import {type CourseID, CourseType, type UserID} from '../domain/types.ts';

/**
 * Main management class handling operations for students, courses, and grades.
 * Acts as the central core of the application business logic.
 */
export class UniversityManager {

  // TODO if I wanna do universal repo storage -> i need DI: receive repo in the constructor...
  readonly studentRepo = new Repository<Student>();
  readonly coursesRepo = new Repository<Course>();
  private readonly storageKey = 'university_data';

  constructor() {
    this.loadData();
  }

  // TODO make load/save/init async
  private saveData(): void {}
  private loadData() {}


  /**
   * Adds a new student to the university.
   * @param id - The unique ID of the student.
   * @param name - The full name of the student.
   * @param dateOfBirth - The student's date of birth.
   * @returns The created student instance.
   */
  addStudent (id: UserID, name: string, dateOfBirth: Date): Student {
    const student = new Student(id, name, dateOfBirth);
    this.studentRepo.add(student);
    this.saveData();
    return student;
  }
  // TODO write this
  updateStudent(id: UserID, name: string, dateOfBirth: Date): void {}
  deleteStudent(id: UserID): void {}

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

  assignGradeToStudent(studentID: UserID, courseID: CourseID, score: number): void {}

  findStudentByName(name:string): Student[] {
    return this.studentRepo.getAll()
  }
  findStudentByCourse(courseName: string): Student[] {
    return this.studentRepo.getAll()
  }

}