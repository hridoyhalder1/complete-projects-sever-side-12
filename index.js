const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
require ('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkcjl29.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const categoryCollection = client.db('UsedGoods').collection('category');
        const bookingsCollection = client.db('UsedGoods').collection('bookings');

        app.get('/category', async(req, res) => {
            const query = {};
            const result = await categoryCollection.find(query).toArray();
            res.send(result);
        });
        
        app.get('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectId(id) };
            const products = await categoryCollection.findOne(query);
            res.send(products);
        });

        // bookings post
        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(console.log)





app.get ('/', async( req, res ) => {
    res.send('server side is running');
});
app.listen(port, () => console.log(`server running on ${port}`));