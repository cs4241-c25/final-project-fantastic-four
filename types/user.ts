import {ObjectId} from "mongodb";

export interface User{
    name: string,
    email: string,
    role: string,
    verified: boolean,
    access: boolean,
    _id: ObjectId
}