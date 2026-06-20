export enum CourseType {
  COMPULSORY = 'Compulsory',
  OPTIONAL = 'Optional'
}

/*
 * interface section
 */

export interface HasId {
  id: string | number;
}

/*
 *  Types section
 */

export type UserID = (number | string) & {readonly __brand: unique symbol};
export type CourseID = (number | string) & {readonly __brand: unique symbol};

export function createUserID(id: string | number): UserID {
  return id as UserID;
}

export function createCourseID(id: string| number): CourseID {
  return id as CourseID;
}