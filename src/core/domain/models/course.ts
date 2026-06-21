import {type HasId, type CourseID, CourseType} from "../types";

/**
 * Represents a course offered by the university.
 */
export class Course implements HasId {
  readonly id: CourseID;
  #_courseName!: string;
  #_credits!: number;
  #_type: CourseType;
  #_hasBeenUsed: boolean = false;
  #_isArchived: boolean = false;

  constructor(
    id: CourseID,
    courseName: string,
    credits: number,
    type: CourseType = CourseType.COMPULSORY,
    hasBeenUsed: boolean = false,
    isArchived: boolean = false
  ) {
    this.id = id;
    this.courseName = courseName;
    this.credits = credits;
    this.#_type = type;
    this.#_hasBeenUsed = hasBeenUsed;
    this.#_isArchived = isArchived;
  }

  get courseName(): string { return this.#_courseName }
  set courseName(newName: string) {
    if (newName.trim() === '') throw new Error("Course name cannot be empty");
    this.#_courseName = newName.trim()
  }

  get credits(): number { return this.#_credits; }
  set credits(newCredits: number) {
    if (newCredits <= 0) throw new Error("Credit must be positive");
    this.#_credits = newCredits;
  }

  get type(): CourseType { return this.#_type; }
  set type(newType: CourseType) { this.#_type = newType; }

  get hasBeenUsed(): Boolean { return this.#_hasBeenUsed; }
  get isArchived(): Boolean { return this.#_isArchived; }

  /**
   * Marks the course as having been used (e.g., grades assigned to it).
   */
  markAsUsed(): void {
    this.#_hasBeenUsed = true;
  }

  /**
   * Archives the course so it is no longer actively displayed.
   */
  archive(): void {
    this.#_isArchived = true;
  }
}

