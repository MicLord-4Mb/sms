import {type HasId, type PersonID, type CourseID, CourseType} from "../domain/types.ts";


export interface IGradeDTO {
  courseId: CourseID;
  studentId: PersonID;
  score: number;
}

export interface IStudentDTO extends HasId<PersonID> {
  id: PersonID;
  name: string;
  dateOfBirth: string;
  grades: IGradeDTO[];
}

export interface ICourseDTO extends HasId<CourseID> {
  id: CourseID;
  courseName: string;
  credits: number;
  type: CourseType;
  hasBeenUsed: boolean;
  isArchived: boolean;
}