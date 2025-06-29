// app/api/register/route.ts ✅ this is important: filename must be `route.ts`

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prismadb from '@/lib/prismadb';
/*
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import prismadb from @/lib/prismadb;
*/

//Since we are registering , POST function is created.
//export asynce function POST(request:Request){};
export async function POST(request: Request) {
  try {
    //To body = await request.json();
    const body = await request.json();
    const { email, name, password } = body;
    //const {email,name,password} = body;
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });
    //If(existingUser): If user exists {return NextResponse.json({},{});}
    if (existingUser) {
      return NextResponse.json({ error: 'Email Taken' }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    //Everything, assiging here will be stored in the database through the model.
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log('[REGISTER_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
