import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised Request",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;

    console.log("decodedData", decodedData);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorised Request",
    });
  }
};

export default verifyJWT;
