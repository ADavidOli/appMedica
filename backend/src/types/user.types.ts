import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    image: string;
};

// utility types 
export type CreateUserI = Pick<User, "name" | "email" | "password">;
export type LoginUserI = Pick<User, "email" | "password">;
export type AuthUser = Omit<User, "password" >;
export type UpdateUser = Omit<User, "password" | "_id" | "image">;

