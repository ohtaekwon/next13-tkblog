import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "../models/user.model";
import { verifyJwtToken } from "@/utils/jwt.util";

interface CustomRequest extends NextRequest {
  user?: JwtPayload;
}

const tokenDecode = (req: NextRequest) => {
  try {
    const accessToken = req.headers.get("authorization") as string;
    if (accessToken) {
      const token = accessToken.split(" ")[1];
      return verifyJwtToken(token);
    }
    return false;
  } catch {
    return false;
  }
};

const tokenAuth = async (req: CustomRequest, next: () => void) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return NextResponse.json(
      { error: "토큰이 유효하지 않습니다. - 1" },
      { status: 501 }
    );
  }

  const user = await userModel.findById((tokenDecoded as JwtPayload).data);

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
