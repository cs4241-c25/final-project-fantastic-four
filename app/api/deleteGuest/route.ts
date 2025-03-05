import {MongoClient, ObjectId} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)

export async function POST(request: Request) {
    // const session = await getServerSession(authOptions)
    // if(!session || !(session.user!.role == 'admin')){
    //   return NextResponse.json({}, {status: 403})
    // }
    
    await client.connect();
    const guests = await client.db("fantastic-four").collection("guests");
    let {_id} = await request.json();
    _id = ObjectId.createFromHexString(_id)
    const result = await guests.deleteOne({"_id": _id});

    if (result) {
        return NextResponse.json({status: "success"}, {status: 201});
    } else {
        return NextResponse.json({status: "error", message: "Failed to delete user"}, {status: 500});
    }
}