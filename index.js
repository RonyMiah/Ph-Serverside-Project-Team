const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000

// middle ware 

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzdlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("DhakaShop");
        const productCollection = database.collection("all_product");
        console.log('Database connected successfully');

        app.post('/addService', async (req, res) => {
            const service = req.body;
            const result = await productCollection.insertOne(service);

            console.log(result);

            res.json(result)
        } )

        // get method

        app.get('/product', async (req, res) => {
            const cursor = productCollection.find({});
            const service = await cursor.toArray();
            res.send(service);
          })

   



    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Backend Team project !')
})


app.listen(port, () => {
    console.log(` Listening on port ${port}`)
})