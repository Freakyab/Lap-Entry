import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line import/prefer-default-export
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
      ip
    } = body;
    // Use Prisma to perform database operations
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
        ip
      },
    }).catch((err) => console.log(err))
    ;
    let msg = "";
    if (result.id) {
      msg = "success";
    } else {
      msg = "failed";
    }

    return new NextResponse(JSON.stringify({ message: msg }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
