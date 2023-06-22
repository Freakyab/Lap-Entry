import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
      },
    });

    let msg = '';
    if (result.id) {
      msg = 'success';
    } else {
      msg = 'failed';
    }

    return new NextResponse(JSON.stringify({ message: msg }), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
