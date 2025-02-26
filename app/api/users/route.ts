import { MongoClient } from "mongodb"
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions)
    if(!session || !(session.user!.role == 'admin')){
        return NextResponse.json({}, {status: 403})
    }

    const client = new MongoClient(process.env.DB_URL!)
    await client.connect()
    const userDB = await client.db('fantastic-four').collection('users')

    const users = await userDB.find().project({
        _id: 1,
        name: 1,
        email: 1,
        verified: 1,
        access: 1,
        role: 1
    }).toArray()
    client.close()

    return NextResponse.json(users, {status: 200})
}