export default (myErrorFun) => (req,res,next)=>{
    Promise.resolve(myErrorFun(req,res,next)).catch(next) // goes to errorHandle middleware
}

// जो भी function आप handleAsyncError() में पास करते हो (जैसे controller),
// वो function automatically try-catch में wrap हो जाता है।
// try {

// }
// catch{

// }