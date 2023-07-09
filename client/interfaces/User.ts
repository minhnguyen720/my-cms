export interface User {
  id: string;

  // Name is the value display cassualy on the UI
  name: string;

  // Email that user register when create account
  email: string;

  // Value use for login purpose
  username: string;

  gender?: string;

  // Value use for login purpose
  password: string;

  createDated?: Date;

  updatedDate?: Date;

  // Company that user belong to
  company?: string;

  // User can be super admin or project admin
  role?: string;

  // Number of projects that are assigned to a user
  assignedProjects?: number;

  avatar?: string;

  bio?:string;
}
