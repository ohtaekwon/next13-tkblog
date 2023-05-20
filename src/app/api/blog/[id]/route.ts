import db from "@/lib/db";
import blogModel from "@/models/blog.model";
import { verifyJwtToken } from "@/utils/jwt.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  await db.connect();

  const id = ctx.prams.id;

  try {
    const blog = await blogModel
      .findById(id)
      .populate("authorId")
      .select("-password");
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "something is wrong" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: any) {
  await db.connect();

  const id = ctx.params.id;
  const accessToken = req.headers.get("authorization");
  const token = accessToken?.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return NextResponse.json({ error: "인증이 되지 않음" }, { status: 400 });
  }
}
