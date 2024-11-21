import clientPromise from "@/DB/Connector";
import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  try {
    const client = await clientPromise;
    const db = client?.db("flavourbot");
    const data = await db
      ?.collection("flavourbot")
      .findOne({ createdBy: email });
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        dietaryPreference: "",
        cuisinePreferences: [],
        spiciness: 0,
        sweetness: 0,
        excludeItems: [],
        healthCondition: [],
        otherExclusions: "",
      });
    }
  } catch (error) {
    throw new Error();
  }
}
