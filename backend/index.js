const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json({limit: "10mb"}));

//connecting with database
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));

//user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmpassword: String,
})

//user model
const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
    try {
        //console.log(req.body);
        const { email } = req.body;
        const existingUser = await userModel.findOne({ email: email });
        
        if (existingUser) {
            res.send({ message: "E-mail id is already registered", alert:false });
        } else {
            const data = new userModel(req.body);
            await data.save();
            res.send({ message: "Successfully registered", alert: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred" });
    }
});

//login
app.post("/login", async (req, res) => {
    //console.log(req.body);
    const { email } = req.body;
    try {
        const result = await userModel.findOne({ email: email });
        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
            }
            res.send({ message: "Login successful", alert: true, data: dataSend });
        } else {
            res.send({ message: "User not found", alert: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred" });
    }
});

//new product schema
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

//new product model
const productModel = mongoose.model("product", schemaProduct);

//add a new product
app.post("/uploadProduct", async(req, res) => {
    //console.log(req.body);
    const data = await productModel(req.body);
    const dataSave = await data.save();
    res.send({message: "Uploaded a new product successfully"});
})

//retrieving products from database
app.get("/product", async(req,res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data));
})

//payment gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async(req, res) => {
    try{
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",

            line_items: req.body.map(item => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.qty,
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        console.log(session);
        res.status(200).json({id: session.id})
    } catch(err) {
        console.error(err);
        res.status(err.statusCode || 500).json({error: err.message})
    }
})


app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});