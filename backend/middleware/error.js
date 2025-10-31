import HandleError from "../utils/handleError.js    ";

export const errorHandleMiddleware =  (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Sever Error";

    if(err.name === "CastError"){
        const message = `This resource is invalid ${err.path}`;
        err = new HandleError(message, 404)
    }
    console.log(err);
    
    res.status(err.statusCode).json({
        status:false,
        message: err.message
        // message: err.stack
    })
}