import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true, "Pls Enter Product Name"],
        trim : true
    },
    description : {
        type:String,
        required : [true, "Pls Enter Product Decription"],
    },
    price :{
        type:Number,
        required : [true, "Pls Enter Product Price"],
        maxLength :[7, "Price Can't Exceed 7 digits"]
    },
    ratings:{
        type:Number,
        default : 0,
    },
    image : [
        {
            public_id : {
                type:String,
                required : true
            },
            url : {
                type:String,
                required:true
            }
        }
    ],
    category : {
        type:String,
        required : [true, "Pls Enter Product Category"],
    },
    stock :{
        type:Number,
        required : [true, "Pls Enter Product Stock"],
        maxLength :[5, "Quantity Can't Exceed 5 digits"],
        default:1,
    },
    numOfReviews :{
        type:Number,
        default:0,
    },
    reviews : [
        {
            name:{
                type:String,
                required : [true, "Pls Enter Product Name"],   
            },
            rating :{
                type:Number,
                required : true,
            },
            comment :{
                type:String,
                required : true,
            }
        }
    ],
    createdAt : {
        type:Date,
        default : Date.now,
    }
})

export default mongoose.model("Product", productSchema); // (model_name, schema)