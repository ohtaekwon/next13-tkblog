import { NextResponse } from "next/server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import userModel from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await db.connect();

    const { username, email, password: pass } = await req.json();

    const isExisting = await userModel.findOne({ email });

    if (isExisting) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(pass, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const { password, ...user } = newUser._doc; // '_doc' : the value of the user

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "something is wrong" }, { status: 500 });
  }
}
