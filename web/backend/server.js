import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
let port = 3000




const app = express();

app.use(cors({origin: "*"}));


app.get('/getgame', async (req, res) => {

  const uri = "mongodb+srv://mishal0404:mishal2003@mishal0404.35lsnon.mongodb.net/?retryWrites=true&w=majority";
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  await client.connect();
  const database = client.db("shifa");
  const collection = database.collection("usertimes");

  res.status(200).send({"newUser":"sdfs"});
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
