import {MongoClient, ObjectId} from "mongodb";
import {NextResponse} from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const client = new MongoClient(process.env.DB_URL!)

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role != 'admin') {
        return NextResponse.json({status: 401, message: "Not logged in"});
    }

    await client.connect();
    const events = await client.db("fantastic-four").collection("events");

    const {id, name, date} = await request.json();

    console.log(id)

    const result = await events.findOneAndUpdate({"_id": ObjectId.createFromHexString(id)}, [{$set: {name: name, date: date}}]);

    if (result) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to verify user"}, {status: 500});
    }
}