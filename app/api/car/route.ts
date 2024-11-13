import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const car = await db.car.create({
      data: {
        UserId: userId,
        ...data,
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error("[CAR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
