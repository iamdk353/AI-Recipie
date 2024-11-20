import { NextResponse } from "next/server";
import clientPromise from "@/DB/Connector";
export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client?.db("flavourbot");

    const data = await db?.collection("flavourbot").find({}).toArray();
    console.log(data);
    if (data) {
      return new NextResponse(JSON.stringify(data));
    }
  } catch (error) {
    throw new Error();
  }
};
