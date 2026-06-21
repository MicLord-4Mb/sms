export enum CourseType {
  COMPULSORY = 'Compulsory',
  OPTIONAL = 'Optional'
}

export interface HasId {
  id: string | number;
}

/*
 *  Types section
 */

export type StudentID = (number | string) & {readonly __brand: unique symbol};
export type CourseID = (number | string) & {readonly __brand: unique symbol};

export function createUserID(id: string | number): StudentID {
  return id as StudentID;
}

export function createCourseID(id: string| number): CourseID {
  return id as CourseID;
}