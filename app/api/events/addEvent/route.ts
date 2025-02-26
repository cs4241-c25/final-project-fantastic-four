import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let events = null

export async function POST(request: Request) {
    await client.connect();
    events = await client.db("fantastic-four").collection("events");
    const {name, date, time} = await request.json();
    const result = await events.insertOne({"name": name, "isActive": true, "date": date, "time": time});
    
    if (result) {
        return NextResponse.json({status: "success", event: result}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to add event"}, {status: 500});
    }
}