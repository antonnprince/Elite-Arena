const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser =  require("body-parser")
let port = 3000




const app = express();
app.use(bodyParser.json())
app.use(cors({origin:"*"}));

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

  const collection = await connect()
  const cursor = collection.find({})
  const result = await cursor.toArray();
  res.status(200).send({"data":result});
});

app.post('/get_my_participations', async (req, res) => {
  username = req.body.username
  
  const collection = await connect()
  const cursor = collection.find({ 'participants.name': username })
  const result = await cursor.toArray();
  res.status(200).send(result);
});

app.post('/create_team', async (req, res) => {
  const { eventName, teamName, username } = req.body

  const collection = await connect()
  
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

  const collection = await connect()
  
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
  console.log(req.body)
  const { name, team, ppt, organizer, reglastdate, startdate, maxteams, prizes, image, game } = req.body;
  console.log(name)
  const collection = await connect()
  const response = await fetch('https://api.imgbb.com/1/upload?expiration=300000&key=c5e552954a298ee10800c6bd21d66427', {
  method: 'POST',
  body: new FormData().append('image', image)
  })

  const jres = response.json()
  const newimage = jres.data.image
  


  const existingEvent = await collection.findOne({ name });
  if (existingEvent) {
    return res.status(400).json({ error: 'Event with this name already exists' });
  }

  
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
    image:newimage,
    game
  };

  await collection.insertOne(newGame);  

  res.status(200).json({ message: 'Event created successfully' });
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
