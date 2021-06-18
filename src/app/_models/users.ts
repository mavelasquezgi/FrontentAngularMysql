﻿import { Role } from "./role";

export interface UserI {
    id: string,
    fullname: string,
    username: string,
    role: string,
    email: string,
    token?: string,
    expiresIn: string
}

export class User {
    id: string;
    fullname: string;
    username: string;
    role: Role;
    email: string;
    token?: string;
    expiresIn: string;
}