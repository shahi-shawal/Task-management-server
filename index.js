const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleaware

app.use(express.json())
app.use(cors())

// shahishawal
// CR4v2r6Kz1oc6dHa



const uri = "mongodb+srv://shahishawal:CR4v2r6Kz1oc6dHa@cluster0.xynle10.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
    try {
        client.connect()
        console.log('DB Connected Successfully✅')
    } catch (error) {
        console.log(error.name, error.message)
    }
  }
  dbConnect()


  const database = client.db("Task-Management");
  const taskCollection = database.collection("tasks");


app.post("/task", async(req, res)=>{
    const task = req.body
    const result = await taskCollection.insertOne(task)
    res.send(result)
})

app.get("/task", async(req, res)=>{
    const result = await taskCollection.find().toArray()
    res.send(result)
})
app.get("/task/:email", async(req, res)=>{
    const email=  req.params.email
    const query = {useremail:email}
    const result = await taskCollection.find(query).toArray()
    res.send(result)
})
app.get("/task/:id", async(req, res)=>{
    const id= req.params.id
    const query ={_id:new ObjectId(id)}
    const result = await taskCollection.findOne(query)
    res.send(result)
})


app.put("/task/:id", async(req, res)=>{
    const id = req.params.id
    const data= req.body
    const filter= {_id: new ObjectId(id)}
    const updateTask = {
        $set:{
            title:data.title,
            priority: data.priority,
            deadline: data.deadline,
            description: data.description
        }
    }
    const result = await taskCollection.updateOne(filter,updateTask)
    res.send(result)
})



app.delete("/task/:id",async(req, res)=>{
    const id =req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await taskCollection.deleteOne(query)
    res.send(result)
})






app.get("/",async(req, res)=>{
    res.send("Task management is Running")
})

app.listen(port,()=>{
    console.log(`Task management is Runing on ${port}`
    );
})