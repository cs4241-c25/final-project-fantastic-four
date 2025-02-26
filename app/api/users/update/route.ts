import {MongoClient, ObjectId} from "mongodb";
import {NextResponse} from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const client = new MongoClient(process.env.DB_URL!)
let user = null

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({status: 401, message: "Not logged in"});
    }

    await client.connect();
    user = await client.db("fantastic-four").collection("users");

    const {id, email} = await request.json();

    const result = await user.findOneAndUpdate({"_id": new ObjectId(id)}, [{$set: {email: email}}]);

    if (result) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to verify user"}, {status: 500});
    }
}