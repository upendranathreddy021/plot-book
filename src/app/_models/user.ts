import { Role } from "./role";

export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    userRole: Role;
    mobileNo: string;
    token?: string;
}