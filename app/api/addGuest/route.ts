import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)


export async function POST(request: Request) {
    await client.connect();
    const db = client.db('fantastic-four'); 
    const guests = db.collection('guests'); 
    let newGuest = await request.json(); 
    const result = await guests.insertOne(newGuest);  

    
    if (result) {
        return NextResponse.json({status: "success", guest: newGuest}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to add guest"}, {status: 500});
    }
}