import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let events = null

export async function GET() {
    await client.connect();
    events = await client.db("fantastic-four").collection("events").find().toArray();
    return NextResponse.json(events, { status: 200 });
}