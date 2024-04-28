import { MongoClient, ServerApiVersion } from 'mongodb';
import express, { response } from 'express';
import cors from 'cors';
let port = 3000




const app = express();

app.use(cors({origin: "*"}));

async function connect(){
  const uri = "mongodb+srv://mishal0404:mishal2003@mishal0404.35lsnon.mongodb.net/?retryWrites=true&w=majority";
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  await client.connect();
  const database = client.db("elite-arena");
  const collection = database.collection("events");
  return collection
}


app.get('/get_all_events', async (req, res) => {

  const collection = connect()
  const cursor = collection.find({})
  const result = await cursor.toArray();
  res.status(200).send(result);
});

app.post('/get_my_participations', async (req, res) => {
  username = req.body.username
  
  const collection = connect()
  const cursor = collection.find({ 'participants.name': username })
  const result = await cursor.toArray();
  res.status(200).send(result);
});

app.post('/create_team', async (req, res) => {
  const { eventName, teamName, username } = req.body

  const collection = connect()
  
  const event = await collection.findOne({ name: eventName });

  const currentDate = new Date();
  const registrationDeadline = new Date(event.reglastdate);
  if (currentDate > registrationDeadline) {
    return res.status(400).json({ error: 'Registration deadline has passed' });
  }

  const existingTeam = event.participants.find(participant => participant.team === teamName);
  if (existingTeam) {
    return res.status(400).json({ error: 'Team already exists for this event' });
  }

  const newParticipant = { name: username, team: teamName };
  await collection.updateOne({ name: eventName }, { $push: { participants: newParticipant } });
  

  res.status(200).json({ message: 'User added to the team successfully' });
});


app.post('/join_team', async (req, res) => {
  const { eventName, teamName, username } = req.body

  const collection = connect()
  
  const event = await collection.findOne({ name: eventName });

  const currentDate = new Date();
  const registrationDeadline = new Date(event.reglastdate);
  if (currentDate > registrationDeadline) {
    return res.status(400).json({ error: 'Registration deadline has passed' });
  }

  const existingTeam = event.participants.find(participant => participant.team === teamName);
  if (!existingTeam) {
    return res.status(404).json({ error: 'Team not found for this event' });
  }

  const newParticipant = { name: username, team: teamName };
  await collection.updateOne({ name: eventName }, { $push: { participants: newParticipant } });
  

  res.status(200).json({ message: 'User joined the team successfully' });
});

app.post('/create_game', async (req, res) => {
  const { name, team, ppt, organizer, reglastdate, startdate, maxteams, prizes, image } = req.body;

  const collection = connect()
  
  const existingEvent = await collection.findOne({ name });
  if (existingEvent) {
    return res.status(400).json({ error: 'Event with this name already exists' });
  }

  const url = "https://api.imgbb.com/1/upload"
    
  const payload = {
        "key": "aa0696eab1a460991ba67d2ed95e2602",
        "image": image,
        "expiration":2592000
    }
    
    const response = fetch(url, payload)
    image = response.data.url

  const newGame = {
    name,
    team,
    ppt,
    organizer,
    participants: [],
    reglastdate,
    startdate,
    maxteams,
    prizes,
    image
  };

  await collection.insertOne(newGame);  

  res.status(200).json({ message: 'Event created successfully' });
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
