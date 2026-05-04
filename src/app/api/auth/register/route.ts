import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { error } from "console";
export async function POST(request: NextRequest) {
    try {
        const { username, password, phoneNumber } = await request.json();
        const userExist= await prisma.user.findFirst({where:{OR:[{email:username}, {email:username}]}})
        if(userExist){
            return NextResponse.json({error:"User already exists"})
        }
        // Save the user to the database
        const user = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                username,
                email: username,
                password: await bcrypt.hash(password, 10),
                phoneNumber
            }
        });
        
        return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}