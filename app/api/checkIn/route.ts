import { MONGO_CLIENT_EVENTS, MongoClient } from "mongodb"
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)

export async function GET(){
    await client.connect(); 
    const guests = await client.db("fantastic-four").collection("guests").find().toArray();
    return NextResponse.json(guests, { status: 200 });
}
    
