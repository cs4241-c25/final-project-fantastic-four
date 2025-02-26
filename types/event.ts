import { ObjectId } from "mongodb";
export default interface Event{
    _id: ObjectId,
    name: string,
    isActive: boolean,
    date: string
}