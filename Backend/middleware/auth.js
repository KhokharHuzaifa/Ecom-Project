import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const { JWT } = req.cookies;
  if (!JWT) return next(new Error("LogIn to access this resource"));

  try {
    let userdecode = jwt.verify(JWT, process.env.JWT_SECRET);

    req.user = userdecode;

    next();
  } catch (error) {
    next(error);
  }
};


export const isAuthorized = (...roles)=>{
    return (req,res,next) => {
    
        if(!roles.includes(req.user.role)) return next(new Error("Not Allowed to access this Resource"))
        
        next()

    }
}
