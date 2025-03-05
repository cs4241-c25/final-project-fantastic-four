import { ObjectId } from "mongodb";
export default interface Guest{
    _id: ObjectId,
    name: string,
    eventID: ObjectId,
    addedById: ObjectId,
    addedByName: string
}