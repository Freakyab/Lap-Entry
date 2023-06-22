import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    const result = await prisma.student.findMany();
    return new NextResponse(JSON.stringify(result), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
