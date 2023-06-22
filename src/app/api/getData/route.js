import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try{
        console.log("running");

        const result = await prisma.student.findMany();
        
        return new NextResponse(JSON.stringify(result), {
            headers: {
                'content-type': 'application/json',
            },
        });
    }catch(error){
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}