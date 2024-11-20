import getCollection from "@/DB/collection";
import clientPromise from "@/DB/Connector";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextResponse,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  console.log(email);
  try {
    const collection = await getCollection();

    const body = await req.json();
    body.createdBy = email;

    const result = await collection?.updateOne(
      { createdBy: email },
      {
        $set: body,
      },
      { upsert: true }
    );
    return NextResponse.json({ msg: "found existing so update" });
  } catch (error) {
    throw new Error();
  }
}
