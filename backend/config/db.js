import {mongoose} from "mongoose" ;

export const connectMongoDB = () => {
    mongoose.connect(process.env.DB_URI).then((data) =>{
        console.log(`MongoDB Connected With Server ${data.connection.host}` );
    })
}