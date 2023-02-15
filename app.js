require('dotenv').config()

//Mongodb connection
const { MongoClient } = require('mongodb');
const { db } = require('../Todolist/models/todo.model');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


//Db and collection
const database = client.db('sample_airbnb');
const listingsAndReviews = database.collection('listingsAndReviews');

//FindOne
async function FindOneDoc() {
    try {
        
        const query = { room_type: 'Entire home/apt' };
        
        const roomtype = await listingsAndReviews.findOne(query);

        console.log(roomtype);

    } 
    finally {
        await client.close();
    }

}

//FindOneDoc().catch(console.dir);


//Using Projection
async function ProjectionDoc() {
    try {

        const query = { name: 'Copacabana Apartment Posto 6' };

        const options = {

            projection: { _id: 0, summary: 1, property_type: 1, minimum_nights: 1 , reviews: 1}
        };

        const name = await listingsAndReviews.findOne(query,options)

        console.log(name);

    }
    finally {
        await client.close();

    }
}

//ProjectionDoc().catch(console.dir);

//Using Find
async function FindDocs() {

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
        await client.close()
    }
}

//FindDocs().catch(console.dir);


//Using insertOne
async function InsertOneDoc() {

    try {

        const database = client.db('test');
        const todos = database.collection('todos');

        const doc = {
            todo: "Learn expresss",
            time: new Date().toISOString()
        }

        const result = await todos.insertOne(doc);

        console.log(`A document was inserted with the _id: ${result.insertedId}`)
    }

    finally {
        await client.close()
    }
}

//InsertOneDoc().catch(console.dir);


//Using insertMany
async function InsertManyDocs() {

    try {

        const database = client.db('test');
        const todos = database.collection('todos');
        
        const docs = [
            {
                todo: "Learn node.js",
                time: new Date().toISOString()
            },
            {
                todo: "Watch news",
                time: new Date().toISOString()
            },
            {
                todo: "Learn mysql",
                time: new Date().toISOString()
            }
        ]

        const options = { ordered: true }

        const results = await todos.insertMany(docs,options);

        console.log(`${results.insertedCount} todo items were added`)
    }
    finally {
        await client.close();
    }
}

//InsertManyDocs().catch(console.dir);



//Using updateOne
async function UpdateOneDoc() {
    try {
        const database = client.db('test');
        const inventory = database.collection('inventory');

        const filter = { item: "journal"}

        const options = { upsert: true }

        const updateDoc = {
            $set: {
                qty: 50,
                status: "B"
            },
        };

        const result = await inventory.updateOne(filter,updateDoc,options);

        console.log(`${result.modifiedCount} inventory item updated`)
    }
    finally {
        await client.close()
    }
}

//UpdateOneDoc().catch(console.dir)

//Using updateMany
async function UpdateManyDocs() {
    try {

        const database = client.db('test');
        const inventory = database.collection('inventory');

        const filter = { status: "D" };

        const updateDoc = {
            $set: {
                qty: 200
            },
        }

        const result = await inventory.updateMany(filter,updateDoc);

        console.log(`${result.modifiedCount} inventory items were updated`)
    }
    finally {
        await client.close();
    }
}

//UpdateManyDocs().catch(console.dir)

//Using replaceOne
async function ReplaceOne() {
   try {
    const database = client.db('test');
    const inventory = database.collection('inventory');

    const query = { item: { $regex: "sketch pad"}}

    const doc = {
        item: "sketch pad pro",
        qty: 300,
        size: {
            h: 50.5,
            w: 25.2,
            uom: "cm"
        },
        status: "F"
    }

    const result = await inventory.replaceOne(query,doc);

    console.log(`Replaced ${result.matchedCount} item`)
   }
   finally {
        await client.close()
   }
}

//ReplaceOne().catch(console.dir)

//Using deleteOne
async function DeleteOneDoc() {

    try {

        const database = client.db('test');
        const posts = database.collection('posts');

        const query = { title: "Hopes and dreams were dashed that day." };

        const result = await posts.deleteOne(query);


        if (result.deletedCount === 1) {
            console.log("Successfully deleted one post.");
        } 
        else {
            console.log("No posts mfound. Deleted 0 posts.");
        }
    }
    finally {
        await client.close();
    }

}

//DeleteOneDoc().catch(console.dir);

//Using deleteMany
async function DeleteManyDocs(){

    try {
        const database = client.db('test');
        const posts = database.collection('posts');

        const query = { title: {$regex: "cook"} }

        const result = await posts.deleteMany(query);

        console.log(`Deleted ${result.deletedCount} posts`)
    }
    finally {
        await client.close()
    }
}

DeleteManyDocs().catch(console.dir)


