import { Student } from '../domain/models/student.ts';
import { Course } from '../domain/models/course.ts';
import {type CourseID, CourseType, type PersonID} from '../domain/types.ts';
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

  private mapDtoToStudent(dto: IStudentDTO): Student {}
  private mapStudentToDto(student: Student): IStudentDTO {}

  private mapDtoToCourse(dto: ICourseDTO): Course {}
  private mapCourseToDto(course: Course): ICourseDTO {}



  /**
   * Adds a new student to the university.
   * @param id - The unique ID of the student.
   * @param name - The full name of the student.
   * @param dateOfBirth - The student's date of birth.
   * @returns The created student instance.
   */
  async addStudent (id: PersonID, name: string, dateOfBirth: Date): Promise<Student> {
    const student = new Student(id, name, dateOfBirth);
    const dto: IStudentDTO = this.mapStudentToDto(student);
    await this.studentRepo.create(dto);
    return student;
  }
  // TODO write this
  async updateStudent(id: PersonID, name: string, dateOfBirth: Date): Promise<Student> {}
  async deleteStudent(id: PersonID): Promise<boolean> {}

  async addCourse(
    id: CourseID,
    courseName: string,
    credits: number,
    type: CourseType = CourseType.COMPULSORY
    ): Promise<Course> {

    const course = new Course(id, courseName, credits, type);
    const dto: ICourseDTO = this.mapCourseToDto(course);
    await this.coursesRepo.create(dto);
    return course;
  }

  // TODO and this
  async updateCourse( id: CourseID, courseName: string, credits: number, type: CourseType ): Promise<Course> {}

  async deleteCourse(id: CourseID): Promise<boolean> {
    const courseDto = await this.coursesRepo.getById(id);
    if (courseDto && courseDto.hasBeenUsed) {
      throw new Error("Cannot delete a course that has already been used. Please archive it.");
    }
    return await this.coursesRepo.delete(id);
  }
  // ?? async clearAllData(): void {}

  async assignGradeToStudent(studentID: PersonID, courseID: CourseID, score: number): void {}

  async findStudentByName(name:string): Student[] {
    return this.studentRepo.getAll()
  }
  async findStudentByCourse(courseName: string): Student[] {
    return this.studentRepo.getAll()
  }

}