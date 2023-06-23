import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      uid,
      fullname,
      labno,
      pcno,
      personalLaptop,
      subject,
      semester,
      section,
      ip,
    } = body;

    const result = await prisma.student.create({
      data: {
        uid,
        fullname,
        labno,
        pcno,
        personalLaptop,
        subject,
        semester,
        section,
        createdAt: new Date(),
        ip,
      },
    }).catch((err) => console.log(err));

    // response
    const msg = result.id ? "success" : "failed";

    // return response with msg
    return new NextResponse(JSON.stringify({ message: msg }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
