import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';
import { ObjectId } from 'mongodb';

const client = new MongoClient(process.env.DB_URL!)


export async function POST(request: Request) {
    await client.connect();
    const db = client.db('fantastic-four'); 
    const guests = db.collection('guests');
    const newGuest = await request.json(); 
    
    //convert strings passed from frontend into Object Id's for the backend
    newGuest.eventID = ObjectId.createFromHexString(newGuest.eventID);
    newGuest.addedById = ObjectId.createFromHexString(newGuest.addedById);

    // Check if guest already exists
    const existingGuest = await guests.findOne({
        eventID: newGuest.eventID,
        name: { $regex: new RegExp(`^${newGuest.name}$`, "i") } // Case-insensitive 
    });

    if (existingGuest) {
        return NextResponse.json({status: "error", message: "Guest already exists"}, {status: 400});
    }
    
    await guests.insertOne(newGuest); 
    const result = await guests.find().toArray();
    
    if (result) {
        return NextResponse.json({result: result}, {status: 200});
    } else {
        return NextResponse.json({status: "error", message: "Failed to add guest"}, {status: 500});
    }
}

