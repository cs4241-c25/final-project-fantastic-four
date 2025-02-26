import { authOptions } from "@/lib/auth";
import {MongoClient, ObjectId} from "mongodb";
import { getServerSession } from "next-auth";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if(!session || !(session.user!.role == 'admin')){
      return NextResponse.json({}, {status: 403})
    }
    
    await client.connect();
    const events = await client.db("fantastic-four").collection("events");
    let {_id} = await request.json();
    _id = ObjectId.createFromHexString(_id)
    const result = await events.deleteOne({"_id": _id});

    const guests = await client.db("fantastic-four").collection("guests");
    const result2 = await guests.deleteMany({"eventID": _id});

    if (result && result2) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to delete user"}, {status: 500});
    }
}