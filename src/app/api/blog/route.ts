// Files inside must be named route.ts
import db from "@/lib/db";
import tokenMiddleware from "@/middlewares/token.middleware";
import blogModel from "@/models/blog.model";
import { verifyJwtToken } from "@/utils/jwt.util";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface CustomRequest extends NextRequest {
  user?: JwtPayload;
}

export async function GET(req: Request) {
  await db.connect();

  try {
    const blogs = await blogModel.find({}).limit(16).populate("authorId");
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "something is wrong" }, { status: 500 });
  }
}

export async function POST(req: CustomRequest) {
  await db.connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken?.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { error: "토큰이 유효하지 않습니다. - 1" },
      { status: 501 }
    );
  }
  try {
    const body = await req.json();
    const newBlog = await blogModel.create(body);
    return NextResponse.json({ newBlog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "something is wrong" }, { status: 500 });
  }
}
