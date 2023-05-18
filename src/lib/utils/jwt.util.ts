import jwt from "jsonwebtoken";

// signing jwt
const signJwtToken = (payload: any, option = {}) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret!, option);
  return token;
};

// verifying jwt
const verifyJwtToken = (token: any) => {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret!);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default { signJwtToken, verifyJwtToken };
