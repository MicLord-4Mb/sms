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

  private mapDtoToStudent(dto: IStudentDTO): Student {
    const student = new Student(dto.id, dto.name, new Date(dto.dateOfBirth));
    if (dto.grades) {
      dto.grades.forEach(g => student.addGrade(g.courseId, g.score))
    }
    return student;
  }

  private mapStudentToDto(student: Student): IStudentDTO {
    return {
      id: student.id,
      name: student.name,
      dateOfBirth: student.dateOfBirth.toISOString(),
      grades: student.grades.map(g => ({
        courseId: g.courseId,
        studentId: g.studentId,
        score: g.score
      }))
    }
  }

  private mapDtoToCourse(dto: ICourseDTO): Course {
    return new Course(
      dto.id,
      dto.courseName,
      dto.credits,
      dto.type,
      dto.hasBeenUsed,
      dto.isArchived
    );
  }

  private mapCourseToDto(course: Course): ICourseDTO {
    return {
      id: course.id,
      courseName: course.courseName,
      credits: course.credits,
      type: course.type,
      hasBeenUsed: Boolean(course.hasBeenUsed),
      isArchived: Boolean(course.isArchived)
    }
  }

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

  async updateStudent(id: PersonID, name: string, dateOfBirth: Date): Promise<Student> {
    const existingData = await this.studentRepo.getById(id);
    if (!existingData) throw new Error(`Student with id ${id} not found`);

    const student = this.mapDtoToStudent(existingData);
    student.name = name;
    student.dateOfBirth = dateOfBirth;

    await this.studentRepo.update(this.mapStudentToDto(student));
    return student;
  }

  async deleteStudent(id: PersonID): Promise<boolean> {
    return await this.studentRepo.delete(id);
  }

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

  async updateCourse( id: CourseID, courseName: string, credits: number, type: CourseType ): Promise<Course> {
    const existingData = await this.coursesRepo.getById(id);
    if (!existingData) throw new Error(`Course with id ${id} not found`);

    const course = this.mapDtoToCourse(existingData);
    course.courseName = courseName;
    course.credits = credits;
    course.type = type;

    await this.coursesRepo.update(this.mapCourseToDto(course));
    return course;
  }

  async deleteCourse(id: CourseID): Promise<boolean> {
    const courseDto = await this.coursesRepo.getById(id);
    if (courseDto && courseDto.hasBeenUsed) {
      throw new Error("Cannot delete a course that has already been used. Please archive it.");
    }
    return await this.coursesRepo.delete(id);
  }

  // ?? async clearAllData(): void {}

  async assignGradeToStudent(studentID: PersonID, courseID: CourseID, score: number): Promise<void> {
    const [studentDto, courseDto] = await Promise.all([
      this.studentRepo.getById(studentID),
      this.coursesRepo.getById(courseID)
    ]);

    if (!studentDto) throw new Error(`Student with id ${studentID} not found`);
    if (!courseDto) throw new Error(`Course with id ${courseID} not found`);

    const student = this.mapDtoToStudent(studentDto);
    const course = this.mapDtoToCourse(courseDto);

    student.addGrade(courseID, score);
    course.markAsUsed();

    //in fact, there is no need to save the course data now
    await Promise.all([
      this.studentRepo.update(this.mapStudentToDto(student)),
      this.coursesRepo.update(this.mapCourseToDto(course))
    ]);
  }

  async findStudentByName(name:string): Promise<Student[]> {
    const query = name.trim().toLowerCase();
    const allStudentDto = await this.studentRepo.getAll()

    return allStudentDto
      .filter(sDto => sDto.name.toLowerCase().includes(query))
      .map(sDto => this.mapDtoToStudent(sDto));
  }

  async findStudentByCourse(courseName: string): Promise<Student[]> {
    const query = courseName.trim().toLowerCase();
    const [allStudents, allCourses] = await Promise.all([
      this.studentRepo.getAll(),
      this.coursesRepo.getAll()
    ]);

    const targetCourseIds = new Set<CourseID>(
      allCourses
        .filter(c => c.courseName.toLowerCase().includes(query))
        .map(c => c.id)
    );

    return allStudents
      .filter(sDto => sDto.grades.some(g => targetCourseIds.has(g.courseId)))
      .map(sDto => this.mapDtoToStudent(sDto));
  }
}