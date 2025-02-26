import { ObjectId } from "mongodb";
export default interface Guest{
    _id: ObjectId,
    firstName: string,
    lastName: boolean,
    eventID: string
}