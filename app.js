
require('dotenv').config()
const http = require('http');
const https = require('https');

//Mongodb connection
const { MongoClient } = require('mongodb');
const { title } = require('process');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


//Db and collection
const database = client.db('sample_airbnb');
const listingsAndReviews = database.collection('listingsAndReviews');

//FindOne
async function FindOne() {
    try {
        
        const query = { room_type: 'Entire home/apt' };
        
        const roomtype = await listingsAndReviews.findOne(query);

        console.log(roomtype);

    } 
    finally {
        await client.close();
    }

}

//FindOne().catch(console.dir);


//Using Projection
async function Projection() {
    try {

        const query = { name: 'Copacabana Apartment Posto 6' };

        const options = {

            projection: { _id: 0, summary: 1, property_type: 1, minimum_nights: 1 , reviews: 1}
        };

        const name = await listingsAndReviews.findOne(query,options)

        console.log(name);

    }
    finally {
        client.close();

    }
}

//Projection().catch(console.dir);

//Using Find
async function Find() {

    try {

        const query = { price: { $gt: 500 }}

        const options = {
            sort: { name: 1 },

            projection: { _id: 0, name: 1, summary: 1 , price: 1 },
        };

        const results = listingsAndReviews.find(query,options);

        if((await results) === 0){
            console.log("No listings found")
        }

        await results.forEach(console.dir)
    }
    finally {
        client.close()
    }
}

Find().catch(console.dir)

