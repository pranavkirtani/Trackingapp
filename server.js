var express=require('express');
var tickets=require('./models/model');
var bodyParser=require('body-parser');
//var geo = require('geo-hash');
var app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/tickets',function(req,res){
    var query={}
tickets.find(query,function(err,results){
    res.json(results);
})
});
app.get('/ticket/:ticketId',function(req,res){
    var query={'_id':req.params.ticketId};
    tickets.find(query,function(err,results){
    if(err){
       res.status(400).send(err);
        return;
     }
    res.json(results);
})
});
app.post('/ticket',function(req,res){

    
    var data={}
    data.created_by=req.body.created_by;
    data.status=req.body.status;
    data.date=new Date();
    data.customer_information={};
    data.customer_information.name=req.body.customer_name;
    data.customer_information.number=parseInt(req.body.customer_number);
    data.area=req.body.area;
    if(req.body.assigned_to){
          data.assigned_to=req.body.assigned_to;
    }
  
    if(req.body.comment){
        data.comments=[];
        var comment={}
        comment.body=req.body.comment;
        comment.date= new Date();
        data.comments.push(comment);
    }
    var ticketData= new tickets(data);
    ticketData.save(data,function(err,result){
     if(err){
       res.status(400).send(err);
         return;
     }
        res.json(result);
    })
    

});
app.put('/ticket/:ticketId',function(req,res){
    var query={'_id':req.params.ticketId};
    console.log(req.body);
    tickets.findOne(query,function(err,ticket){
       if(err||!ticket){
         res.status(400).send(err);
         return;
     }
        if(req.body.comment){
            var commentBody={};
            commentBody.body=req.body.comment;
            commentBody.date= new Date();
           ticket.comments.push(commentBody);
        
        }
        if(req.body.status){
           ticket.status=req.body.status;
        
        }  if(req.body.customer_name){
           ticket.customer_information.name=req.body.customer_name;
        
        }
         if(req.body.customer_number){
           ticket.customer_information.number=req.body.customer_number;
        
        }
        if(req.body.assigned_to){
           ticket.assigned_to=req.body.assigned_to;
        
        }
        if(req.body.area){
          ticket.area=req.body.area;
        }
        console.log(ticket);
        ticket.save(function(err2){
            if(err2){
                res.status(400).send(err2);
                return;
            }
            res.json(ticket);
        
        })
        
        
        
    
    });

});

app.get('/',function(req,res){
    
   /* var latlon = geohash.decodeGeoHash(req.params["id"]);
        console.log("latlon : " + latlon);
        var lat = latlon.latitude[2];
        console.log("lat : " + lat);
        var lon = latlon.longitude[2];
        console.log("lon : " + lon);
        zoom = req.params["id"].length + 2;
        console.log("zoom : " + zoom);*/
res.sendFile(__dirname+'/views/index.html');
    

    
    
});




app.get('/producer',function(req,res){

res.sendFile(__dirname+'/views/producer.html');
    
    io.on('connection', function (socket) {
  socket.emit('start');
        socket.setMaxListeners(100);
  socket.on('start_sending', function (data) {
      console.log(data);
    socket.broadcast.emit('news', data);
  });
});
    
    io.on('start_sending',function(){
    console.log('started aah');
    })
    
    
    
});
app.use(express.static(__dirname));
var server=app.listen(9000);
console.log('Listening on 9000');
var io = require('socket.io')(server);