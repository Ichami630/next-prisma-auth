import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        //parse the request body as json
        const { email, name, password } = await req.json();

        //validate input fields
        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Email or Password cannot be empty" }, { status: 400 });
        }

        //check if user with the given email already exist
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        //hash the password before storing it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        return NextResponse.json({ success: true, user }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong:" +error }, { status: 500 });
    }
}
