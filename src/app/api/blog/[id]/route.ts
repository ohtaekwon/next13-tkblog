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

  const decodedToken: any = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return NextResponse.json({ error: "인증이 되지 않음" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const blog = await blogModel.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can update his blog" },
        { status: 403 }
      );
    }

    const updateBlog = await blogModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return NextResponse.json(updateBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  await db.connect();
  const id = ctx.params._id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodeToken = verifyJwtToken(token);

  if (!accessToken || !decodeToken) {
    return NextResponse.json();
  }
}
