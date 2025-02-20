import { MongoClient } from "mongodb"
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const handler = async () => {
    const session = await getServerSession(authOptions)
    console.log(session?.user!.name)
    if(!session || !(session.user!.name == 'admin')){
      return NextResponse.json({}, {status: 403})
    }

    const client = new MongoClient(process.env.DB_URL!)
    await client.connect()
    const userDB = await client.db('fantastic-four').collection('users')

    const users = await userDB.find().toArray()
    client.close()

    return NextResponse.json(users, {status: 200})
}

export {handler as GET}