const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
require ('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkcjl29.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





app.get ('/', async( req, res ) => {
    res.send('server side is running');
});
app.listen(port, () => console.log(`server running on ${port}`));