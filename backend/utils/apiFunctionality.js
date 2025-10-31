// Work API functionality queryStr = url se data lena and query = database query  
class APIFunctionality{
    constructor(query, queryStr){
        this.query = query; // product.find() (Mongoose Query Object)
        this.queryStr = queryStr; // keyword = T-Shirt (URL Parameters)
    }
    search(){
        const keyword = this.queryStr.keyword ?{
            name : {
                $regex : this.queryStr.keyword,  // keyword is key in body
                $options : "i" // search case insensitive data like Laptop, laptop, LAPTOP all same  
            }
        }:{}        
        this.query = this.query.find({...keyword}); 
        return this; // return current object 
    }
    filter(){
        const queryCopy = {...this.queryStr}; // store query param from link 
        console.log(queryCopy);
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key=>delete queryCopy[key])
        console.log(queryCopy);
        this.query = this.query.find(queryCopy); // Search product based on category 
        return this;
    }
    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage*(currentPage-1) // skip the no. of product  
        this.query = this.query.limit(resultsPerPage).skip(skip)
        return this;        
    }
}
export default APIFunctionality;