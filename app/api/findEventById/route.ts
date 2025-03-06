import {MongoClient,ObjectId} from "mongodb";
import {NextResponse} from 'next/server';

const client = new MongoClient(process.env.DB_URL!)
let event = null

export async function POST(request: Request) {
    await client.connect();
    let {_id} = await request.json();
    _id = ObjectId.createFromHexString(_id)
    event = await client.db("fantastic-four").collection("events").findOne({"_id": _id});
    if (event && event.isActive) {
        return NextResponse.json({ status: "success", isActive: true }, { status: 201 });
    } else {
        return NextResponse.json(
            { status: "error", message: "Event is either inactive or does not exist" },
            { status: 500 }
        );
    }
}