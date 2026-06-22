export enum CourseType {
  COMPULSORY = 'Compulsory',
  OPTIONAL = 'Optional'
}

export interface HasId<T = string | number> {
  id: T;
}

/*
 *  Types section
 */

export type PersonID = (number | string) & {readonly __brand: unique symbol};
export type CourseID = (number | string) & {readonly __brand: unique symbol};

export function createUserID(id: string | number): PersonID {
  return id as PersonID;
}

export function createCourseID(id: string| number): CourseID {
  return id as CourseID;
}