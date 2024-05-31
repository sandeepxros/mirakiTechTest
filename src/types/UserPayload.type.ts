import { UserType } from "src/models/user.model";

export interface UserPayload {
    userId: string;
    firstName: string;
    LastName: string;
    role:UserType
  }
  