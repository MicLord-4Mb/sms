import { Grade } from "./grade.ts";
import type { HasId, PersonID, CourseID } from "../types.ts"

/**
 * Abstract class representing a person with a unique ID, name, and date of birth.
 */
export abstract class Person implements HasId<PersonID> {
  readonly id: PersonID;
  #_name: string;
  #_dateOfBirth: Date;

  constructor(id: PersonID, name: string, dateOfBirth: Date) {
    this.id = id;
    this.#_name = name;
    this.#_dateOfBirth = dateOfBirth;
  }

  get name(): string { return this.#_name }
  set name(newName: string) {
    if (newName.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    this.#_name = newName.trim();
  }

  get dateOfBirth(): Date { return this.#_dateOfBirth }
  set dateOfBirth(newDate: Date) {
    if (isNaN(newDate.getTime())) {
      throw new Error('Invalid date');
    }
    this.#_dateOfBirth = newDate;
  }

  calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.#_dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - this.#_dateOfBirth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        today.getDate() < this.#_dateOfBirth.getDate()
      )
    ) {
      age--;
    }

    return age;
  }
}

/**
 * Represents a student in the university, extending the Person class.
 * Includes functionality for managing academic grades.
 */
export class Student extends Person {
  #_grades: Grade[] = [];

  constructor(id: PersonID, name: string, dateOfBirth: Date) {
    super(id, name, dateOfBirth);
  }

  get grades(): readonly Grade[] { return this.#_grades; }

  /**
   * Adds a new grade to the student's record.
   * @param courseId - The unique identifier of the course.
   * @param score - The score achieved.
   */
  addGrade(courseId: CourseID, score: number): void {
    const grade = new Grade(courseId, this.id, score);
    this.#_grades.push(grade);
  }

  /**
   * Calculates the student's average grade across all courses.
   * @returns The average grade, or 0 if no grades are recorded.
   */
  calculateAverageGrade(): number {
    // TODO get all grades from all student course and calculate average...
    return 0;
  }
}