import {type HasId, type StudentID, type CourseID, CourseType} from "../domain/types.ts";


export interface IGradeDTO {
  courseId: CourseID;
  studentId: StudentID;
  score: number;
}

export interface IStudentDTO extends HasId {
  id: StudentID;
  name: string;
  dateOfBirth: string;
  grades: IGradeDTO[];
}

export interface ICourseDTO extends HasId {
  id: CourseID;
  courseName: string;
  credits: number;
  ype: CourseType;
  hasBeenUsed: boolean;
  isArchived: boolean;
}