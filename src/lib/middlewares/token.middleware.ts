import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "../models/user.model";

interface CustomRequest extends NextRequest {
  user?: JwtPayload;
}

const tokenDecode = (req: NextRequest) => {
  try {
    const bearer = req.headers.get("authorization") as string;
    if (bearer) {
      const token = bearer.split(" ")[1];
      return jwt.verify(token, process.env.JWT_SECRET!);
    }
    return false;
  } catch {
    return false;
  }
};

const tokenAuth = async (
  req: CustomRequest,
  res: NextResponse,
  next: () => void
) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return NextResponse.json(
      { error: "토큰이 유효하지 않습니다. - 1" },
      { status: 501 }
    );
  }

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) {
    return NextResponse.json(
      { error: "토큰이 유효하지 않습니다. - 2" },
      { status: 502 }
    );
  }

  req.user = user;
  next();
};
export default { tokenDecode, tokenAuth };
