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
        const usersCollection = client.db('UsedGoods').collection('users');


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

        app.get('/bookings', async(req, res ) => {
            const displayName = req.body.displayName;
            console.log(displayName);
            const query = { displayName:displayName };
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
        });

        // bookings post
        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/users', async(req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        // users
        app.post('/users', async(req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        // admin
        app.put('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

    }
    finally{

    }
}
run().catch(console.log)





app.get ('/', async( req, res ) => {
    res.send('server side is running');
});
app.listen(port, () => console.log(`server running on ${port}`));