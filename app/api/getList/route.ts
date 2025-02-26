import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';
import {ObjectId} from 'mongodb';

const client = new MongoClient(process.env.DB_URL!)
let guests = null

export async function POST(request: Request) {
    await client.connect();
    let {eventID} = await request.json();
    console.log(eventID);
    eventID = ObjectId.createFromHexString(eventID);
    guests = await client.db("fantastic-four").collection("guests").find({ eventID: eventID }).toArray();
    return NextResponse.json(guests, { status: 200 });
}