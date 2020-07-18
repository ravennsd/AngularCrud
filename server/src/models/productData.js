const mongoose = require('mongoose');

 db= 'mongodb://localhost:27017/ProductsDB';
 mongoose.connect(db, function(err){
     if(err){
         console.log(err);
     }else{
         console.log("Connected to MongoDB");
     }
});

const Schema = mongoose.Schema;

var NewProductsSchema = new Schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number, 
    imageUrl: String

})
var productData = mongoose.model('productsDB',NewProductsSchema,'products'); 

module.exports = productData;