import { authOptions } from "@/lib/auth";
import {MongoClient} from "mongodb";
import { getServerSession } from "next-auth";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let user = null

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if(!session || !(session.user!.role == 'admin')){
        return NextResponse.json({}, {status: 403})
    }

    await client.connect();
    user = await client.db("fantastic-four").collection("events");
    const {name} = await request.json();
    const result = await user.findOneAndUpdate({"name": name}, [{ $set: { isActive: { $not: "$isActive" } } }]);

    if (result) {
        return NextResponse.json({status: "success"}, {status: 200});
    } else {
        return NextResponse.json({status: "error", message: "Failed to modify event active status"}, {status: 500});
    }
}