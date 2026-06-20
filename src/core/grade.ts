import type {CourseID, UserID} from "./types";

/**
 * Represents a grade assigned to a student for a specific course.
 */
export class Grade {
  #_courseId: CourseID;
  #_studentId: UserID;
  #_score: number;

  /**
   * Creates a new grade instance.
   * @param courseId - The unique identifier of the course.
   * @param studentId - The unique identifier of the student.
   * @param score - The score achieved, must be between 0 and 100.
   */
  constructor(
    courseId: CourseID,
    studentId: UserID,
    score: number
  ) {
    if (score < 0 || score > 100) {
      throw new Error('Grade score must be between 0 and 100');
    }
    this.#_courseId = courseId;
    this.#_studentId = studentId;
    this.#_score = score;
  }

  get courseId(): CourseID { return this.#_courseId }
  get studentId(): UserID { return this.#_studentId }
  get score(): number { return this.#_score }

  set score(newScore: number) {
    if (newScore < 0 || newScore > 100) {
      throw new Error('Grade score must be between 0 and 100');
    }

    this.#_score = newScore;
  }
}