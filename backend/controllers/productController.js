import handleAsyncError from '../middleware/handleAsyncError.js';
import Product from '../models/productModel.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import HandleError from "../utils/handleError.js";

export const createProduct = handleAsyncError(async(req, res) =>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

export const getAllProducts = handleAsyncError(async(req, res, next)=>{
   const resultPerPage = 3
   const apiFeatures = new APIFunctionality(Product.find(), req.query).
   search().filter();
// for pagination logic 
   const filteredQueryClone = apiFeatures.query.clone();
   const filterdProductCount = await filteredQueryClone.countDocuments(); //Count no. of filtered product
   const totalPages = Math.ceil(filterdProductCount/resultPerPage);
   const page = Number(req.query.page) || 1 ;

   if(page > totalPages && filterdProductCount > 0){ // for first page it show empty product list if productCount = 0 
    return next(new HandleError("This Page does not exist", 404))
   }
   apiFeatures.pagination(resultPerPage)
   const products = await apiFeatures.query; //  get all the filterd and searched   product 
    if(!products || products.length==0){
        return next(new HandleError("Product Not Found", 404))
    }
   res.status(200).json({
       status: true,
       products,
       filterdProductCount, // The total number of filtered products available across all pages.
       resultPerPage,
       totalPages,
       currentPage:page,
    })
})

export const updateProduct = handleAsyncError(async(req, res, next)=>{
    const productId = req.params.id;
    // 1) const result = await Product.updateOne(filter, updateData); You can match using any field (not just _id).
    // 2) Product.findOneAndUpdate({ _id: id }, updateData, options);
    const product = await Product.findByIdAndUpdate(productId, req.body, {new:true, runValidators:true})
    if(!product){
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

export const deleteProduct = handleAsyncError(async(req,res,next)=>{
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if(!deletedProduct){ 
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"})
})

export const getProductDetails = handleAsyncError(async(req, res,next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})