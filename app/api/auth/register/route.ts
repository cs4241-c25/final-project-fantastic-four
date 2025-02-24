import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const handler = async (req: NextRequest) => {
    const client = new MongoClient(process.env.DB_URL!)
    await client.connect()
    const userDB = await client.db('fantastic-four').collection('users')

    const data = await req.json()
    console.log(data)
    data.admin = false
    data.verified = false
    data.access = false
    data.password = await bcrypt.hash(data.password, 10)

    const exists = await userDB.findOne({email: data.email})

    if(exists) return NextResponse.json({error: 'user already exists'}, {status: 409})

    await userDB.insertOne(data)

    client.close()

    return NextResponse.json({}, {status: 200})
}

export {handler as POST}