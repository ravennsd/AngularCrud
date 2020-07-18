const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var productData = require('./src/models/productData');

const User = require('./src/models/signupuser');
const app = express();

app.use(bodyParser.json());
 
app.use(cors());
app.use(function (err, req, res, next) {
    console.error(err.message); 
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message);  
  });


app.get("/", (req,res)=> {
    res.send("Hello from the server");
})

app.get("/products", (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
    productData.find()
        .then(function (products){
            res.send(products);
        })
})

app.get('/products/:id',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
  console.log(req.params.id);
  productData.findOne
    ({_id:req.params.id}).exec().then(
    data=>{res.status(200).json(data)
    console.log(data);}
  ).catch(e=>console.log(e))
})

app.post("/insert",(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION");
    console.log(req.body.product);
    var product={
        productId : req.body.product.productId,
        productName: req.body.product.productName,
         productCode: req.body.product.productCode,
         releaseDate: req.body.product.releaseDate,
         description: req.body.product.description,
         price: req.body.product.price,
         starRating: req.body.product.starRating,
         imageUrl: req.body.product.imageUrl   
    }
    
    var product= new productData(product);
    product.save();
    // (err=>{
    //     if(err){ console.log(err)}
    //     else{console.log("Data Inserted");}
    // });
        
});

  // Delete employee
app.post(('/delete'),(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION");
    productData.deleteOne({_id: req.body.id})
    .then(products=>{
        res.status(200).send(products)  
    })
  })

// Update employee
// app.put(('/products/:id'),(req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION");
//   var product={
//     productId : req.body.product.productId,
//     productName: req.body.product.productName,
//      productCode: req.body.product.productCode,
//      releaseDate: req.body.product.releaseDate,
//      description: req.body.product.description,
//      price: req.body.product.price,
//      starRating: req.body.product.starRating,
//      imageUrl: req.body.product.imageUrl   
// }
// if (product.productId == null){
//     productData.findByIdAndUpdate({_id: req.params.id}, {
//       "$set": {productid:product.productId}})
//       .then(product => {
//         product.save()
//         console.log('Data updated successfully')
//       })
  
//   }
// })
app.put('/products/:id',function(req,res) {

  console.log("íd:" + req.params.id);
  console.log(req.body);
  productData.findByIdAndUpdate(req.params.id,req.body).exec().then(
    data => res.status(200).json({
      message:"updated",
      data:data
    })
  ).catch(e => console.log(e))
})

app.post('/signup', (req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser)=> {
    if(err){
        console.log(err)
    }else{
      res.status(200).send(registeredUser);
    }
    // else{
    //     let payload = { subject: registeredUser._id}
    //     let token = jwt.sign(payload,'secretkey')
    //     res.status(200).send({token})                                                          //object {token} replaces the registerUserDetails
    // }
    })
})
app.post('/login', (req,res)=>{
  let userData = req.body
  User.findOne({email: userData.email}, (err,user)=> {
  if(err){
      console.log(err)
  }else if( !user ) {
      res.status(401).send('Invalid Email');
  }else if( user.password !== userData.password ){
      res.status(401).send('Invalid Password');
  }else{
    res.status(200).send(user) 
  }
  // else {
  //     let payload = { subject: user._id}
  //     let token = jwt.sign (payload, 'secretkey')
  //     res.status(200).send({token})
  // }
  })
})

app.listen(3100)
