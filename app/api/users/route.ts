import { MongoClient } from "mongodb"
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const handler = async () => {
    const session = await getServerSession(authOptions)
<<<<<<< HEAD
    if(!session || !(session.user!.name == 'admin')){
=======
    if(!session || !(session.user!.role == 'admin')){
>>>>>>> dbccb004b1ebccb6ed1cdc0038166d2eaed37bfc
      return NextResponse.json({}, {status: 403})
    }

    const client = new MongoClient(process.env.DB_URL!)
    await client.connect()
    const userDB = await client.db('fantastic-four').collection('users')

<<<<<<< HEAD
    const users = await userDB.find().toArray()
=======
    const users = await userDB.find().project({
      _id: 1,
      name: 1,
      email: 1,
      verified: 1,
      access: 1,
      role: 1
    }).toArray()
>>>>>>> dbccb004b1ebccb6ed1cdc0038166d2eaed37bfc
    client.close()

    return NextResponse.json(users, {status: 200})
}

export {handler as GET}