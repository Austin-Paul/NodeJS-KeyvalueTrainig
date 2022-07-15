import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";
import HttpException from "../exception/HttpException";


const authorize = (permittedRoles?:string[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      console.log(jsonwebtoken.decode(token));
      const data:any=jsonwebtoken.decode(token);
      data['custom:role']
      
    
    
     
    // Comparing each element of array
    while(true)
    { var i=0;
      for(;i<permittedRoles.length;i++)
     {if(data===(permittedRoles[i]))
      {
        break;
      }
     }
     if(i==permittedRoles.length+1)
      throw new UserNotAuthorizedException();
    break;
    }
    
      //array.includes() check if it contains or not
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";


  
};

export default authorize;