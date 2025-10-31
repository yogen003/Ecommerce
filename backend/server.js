import dotenv from 'dotenv';
import app from './app.js';
import {connectMongoDB} from './config/db.js'
dotenv.config({path: "backend/config/config.env"})

const port = process.env.PORT || 3000

connectMongoDB()
// handle uncaught exception like varible not defined
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1)
})
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

// handle promise rejection like db connection error
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1)
    })
})