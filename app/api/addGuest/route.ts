import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';
import { ObjectId } from 'mongodb';

const client = new MongoClient(process.env.DB_URL!)


export async function POST(request: Request) {
    await client.connect();
    const db = client.db('fantastic-four'); 
    const guests = db.collection('guests'); 
    let newGuest = await request.json(); 
    //convert strings passed from frontend into Object Id's for the backend
    newGuest.eventID = ObjectId.createFromHexString(newGuest.eventID);
    newGuest.addedBy = ObjectId.createFromHexString(newGuest.addedBy);
    await guests.insertOne(newGuest); 
    const result = await guests.find().toArray();
    

    
    if (result) {
        return NextResponse.json({result: result}, {status: 200});
    } else {
        return NextResponse.json({status: "error", message: "Failed to add guest"}, {status: 500});
    }
}

