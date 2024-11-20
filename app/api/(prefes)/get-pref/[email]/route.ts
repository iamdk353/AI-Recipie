import clientPromise from "@/DB/Connector";
import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  console.log(email);
  try {
    const client = await clientPromise;
    const db = client?.db("flavourbot");
    const data = await db
      ?.collection("flavourbot")
      .findOne({ createdBy: email });
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ msg: "user not found" });
    }
  } catch (error) {
    throw new Error();
  }
}
