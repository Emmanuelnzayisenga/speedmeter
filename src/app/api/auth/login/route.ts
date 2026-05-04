import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        console.log(username, " ", password)

        // Save the user to the database
        const user = await prisma.user.findFirst({
            where: {
           email:username
            }
        });
        if(!user){
            return NextResponse.json({error:"Invalid username or password"}, {status:404})
        }
        console.log(user)

        const checkPassword= await bcrypt.compare(password, user.password)
        if(!checkPassword)  return NextResponse.json({error:"Invalid username or password"}, {status:401})
        console.log("isPawword true: ", checkPassword)
        return NextResponse.json({ success:true, user}, { status: 200 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}