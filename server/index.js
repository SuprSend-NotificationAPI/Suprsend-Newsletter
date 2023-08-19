require("dotenv").config()
const express = require("express")
const port = 4000;
const app  = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const { Event } = require("@suprsend/node-sdk");
const { Suprsend, SubscriberListBroadcast } = require("@suprsend/node-sdk")
const supr_client = new Suprsend(process.env.WKEY, process.env.WSECRET);


const data1 = supr_client.subscriber_lists.create({
    list_id: "TrendyBytes",
    list_name: "TrendyBytes",
    list_description: "Stay in the know about the latest trends, tech, and more with our bite-sized newsletter."
});

const data2 = supr_client.subscriber_lists.create({
    list_id: "WellnessWave",
    list_name: "WellnessWave",
    list_description: "A weekly wellness boost delivered to your inbox, packed with tips for a healthier you."
});

const data3 = supr_client.subscriber_lists.create({
    list_id: "EcoEcho",
    list_name: "EcoEcho",
    list_description: "Get your eco-friendly fix with news and tips on sustainable living and environmental updates."
});

const data4  = supr_client.subscriber_lists.create({
    list_id: "CultureSnap",
    list_name: "CultureSnap",
    list_description: " Explore global cultures through quick snapshots of traditions, stories, and art from around the world."
});

const data5 = supr_client.subscriber_lists.create({
    list_id: "BizBrief",
    list_name: "BizBrief",
    list_description: "Your quick business update stay informed about markets, money, and more in a nutshell."
});

const data0 = supr_client.subscriber_lists.create({
    list_id: "notasubscriber",
    list_name: "notasubscriber",
    list_description: "user is not subscribed to any of the list"
});

/********************** Subscribe to a list **************************************/

app.post("/subscribe/:listname",async(req,res)=>{
    const {usermail} = req.body;
    const distinct_id = usermail; 
    const user = supr_client.user.get_instance(distinct_id)
    user.add_email(usermail)
    const response = user.save()
    response.then((res) => console.log("response", res));

    const data1 = supr_client.subscriber_lists.remove("notasubscriber", [
        distinct_id
     ]);
     data1.then((res) => console.log(res)).catch((err) => console.log(err));
    
    const event_name = "NEWSSUBSCRIBED";
    let properties = {
        "name":req.params.listname
    }
    const event = new Event(distinct_id, event_name, properties);
    const response2 = await supr_client.track_event(event);
    console.log('response', response2);

    const data = supr_client.subscriber_lists.add(req.params.listname, [
       distinct_id
    ]);

    data.then((res) => console.log(res)).catch((err) => console.log(err));
    res.json("Added a user");
})


/************************* Unsubscribe to a list **************************************/

app.post("/unsubscribe/:listname",async(req,res)=>{
    const distinct_id = req.body.usermail;
    const data = supr_client.subscriber_lists.remove(req.params.listname, [
       distinct_id
    ]);
    data.then((res) => console.log(res)).catch((err) => console.log(err));
    res.json("unsubscribed a user");
})


/************************* send notification to a list **************************************/

app.post("/sendnotification/:listname",async(req,res)=>{
    const broadcast_body = {
        list_id: req.params.listname,
        template:  req.params.listname.toLowerCase(),
        notification_category: "transactional",
        channels: ["email"],
        data:{
            
        }
    }  
    const inst = new SubscriberListBroadcast(broadcast_body);
    const data = supr_client.subscriber_lists.broadcast(inst);
    data.then((res) => console.log(res)).catch((err) => console.log(err));
    res.json("notification sent");
})

/************************* listening of port **************************************/

app.listen(port,()=>{
    console.log("server started on port 4000");
})

 