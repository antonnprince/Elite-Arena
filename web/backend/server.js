const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Razorpay = require('razorpay');  
const bodyParser =  require("body-parser")
let port = 3000




const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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

app.post('/get_my_tournaments', async (req,res)=>{
  username = req.body.username
  const collection = await connect()
  const cursor = collection.find({ 'organizer.name': username})
  const result = await cursor.toArray();
  res.status(200).send(result)
})

app.post('/create_team', async (req, res) => {
  const { eventName, teamName, username } = req.body
  console.log(eventName, teamName, username)
  const collection = await connect()
  
  const event = await collection.findOne({ name: eventName });
  const razorpayInstance = new Razorpay({ 
  
    // Replace with your key_id 
    key_id: event.key, 
  
    // Replace with your key_secret 
    key_secret: event.secret 
  }); 


  const currentDate = new Date();
  const registrationDeadline = new Date(event.reglastdate);

  const existingTeam = event.participants.find(participant => participant.team === teamName);
  if (existingTeam) {
    return res.status(400).json({ error: 'Team already exists for this event' });
  }
  console.log("sdfsdfsdfsf")
  const newParticipant = { name: username, team: teamName };
  await collection.updateOne({ name: eventName }, { $push: { participants: newParticipant } });
  console.log("1222222")
  if (event.fee>0){
    console.log("yojojon")
    const amount = event.fee 
    const currency = "INR"
    const receipt = "payment done"
    const notes = {"name":event.name}
    razorpayInstance.orders.create({amount, currency, receipt, notes},  
      (err, order)=>{ 

        if(!err) 
          res.status(200).json(order) 
        else
        res.status(400).send(err); 
      } 
    ) 
  }

  console.log("llllllllll")
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
  const { name, team, ppt, organizer, reglastdate, startdate, description ,maxteams, prizes, image, game, fee, key, secret } = req.body;
  console.log(name)
  const collection = await connect()
  const body = new FormData()
  const kimage = image.replace("data:image/jpeg;base64,","")
  body.append('image', kimage)
  body.append("key","c5e552954a298ee10800c6bd21d66427")
  body.append("expiration","300000")
  const response = await fetch('https://api.imgbb.com/1/upload', {
  method: 'POST',
  body: body
  })

  const jres = await response.json()

  console.log(jres)
  const newimage = jres.data.url
  


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
    description,
    maxteams,
    prizes,
    image:newimage,
    game,
    fee,
    key,
    secret
  };

  await collection.insertOne(newGame);  

  return res.status(200).json({ message: 'Event created successfully' });
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
