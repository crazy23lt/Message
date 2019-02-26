const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'test';

function _connectDB(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        // console.log("Connected successfully to server");

        const db = client.db(dbName);
        callback(db, client)
    });
}

exports.insert = (collectionName, json, callback) => {
    _connectDB((db, client) => {
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Insert some documents
        collection.insertMany(json, (err, result) => {
            assert.equal(err, null);
            // assert.equal(1, result.result.n);
            // assert.equal(1, result.ops.length);
            // console.log("Inserted 1 documents into the collection");
            callback(err, result);
            client.close()
        });
    })
}

exports.find = (collectionName, json,page, callback) => {
    _connectDB((db, client) => {  
        let sk = parseInt(page)*3
        console.log(sk)
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Find some documents
        collection.find(json).skip(sk).limit(3).toArray((err, docs) => {
            assert.equal(err, null);
            // console.log("Found the following records");
            // console.log(docs)
            callback(err, docs);
            client.close()
        });
    })
}
exports.updata = (collectionName, arg1, arg2, callback) => {
    _connectDB((db, client) => {
        const collection = db.collection(collectionName);
        // Update document where a is 2, set b equal to 1
        collection.updateOne(
            arg1, arg2,
            (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                // console.log("Updated the document with the field a equal to 2");
                callback(err, result);
                client.close()
            });
    })
}
exports.remove = (collectionName, json, callback) => {
    _connectDB((db, client) => {
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Delete document where a is 3
        collection.deleteOne(json, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            // console.log("Removed the document with the field a equal to 3");
            callback(err, result);
            client.close()
        });
    })
}

exports.count = (collectionName, json, callback) => {
    _connectDB((db, client) => {
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Find some documents
        collection.find(json).count((err,result)=>{
            assert.equal(err, null);
            // console.log("Found the following records");
            // console.log(docs)
            callback(err, result);
            client.close()
        })
    })
}