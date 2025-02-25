import {MongoClient} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let user = null

export async function POST(request: Request) {
    await client.connect();
    user = await client.db("fantastic-four").collection("users");
    const {email} = await request.json();
    const result = await user.deleteOne({"email": email});

    if (result) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to delete user"}, {status: 500});
    }
}