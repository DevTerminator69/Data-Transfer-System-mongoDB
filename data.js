const MongoClient = require('mongodb').MongoClient;

const sourceUrl = 'TRANSFER FROM';
const destUrl = 'TRANSFER TOO';

async function transferData() {
    try {

        const sourceClient = await MongoClient.connect(sourceUrl, { useNewUrlParser: true });
        const destClient = await MongoClient.connect(destUrl, { useNewUrlParser: true });

        const sourceDB = sourceClient.db();
        const destDB = destClient.db();

        const collectionName = 'YOUR DB COLLECTION NAME';
        const sourceCollection = sourceDB.collection(collectionName);
        const destCollection = destDB.collection(collectionName);

        console.log('Connected to source database');
        const data = await sourceCollection.find().toArray();
        console.log('Fetched data:', data);
        
        if (data.length === 0) {
            console.log('No data to transfer.');
            return;
        }

        await destCollection.insertMany(data);

        console.log('Data transferred successfully');

        sourceClient.close();
        destClient.close();
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

transferData();
