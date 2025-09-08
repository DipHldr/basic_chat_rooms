import express from 'express';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import {Server} from 'socket.io';

const app=express();
const server=createServer(app);
const io=new Server(server,{
        connectionStateRecovery:{}
    });

const __dirname=dirname(fileURLToPath(import.meta.url));
app.use('/socket.io', express.static(join(__dirname, 'node_modules/socket.io/client-dist')));

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'client.html'));
})

const rooms=new Map();

io.on('connection',(socket)=>{
    console.log(`user connected ${socket.id}`);


    socket.on('create:room',(roomName,username,callback)=>{
        if(rooms.has(roomName)){
            return callback({success:false,message:'Room already exist'});
        }

        rooms.set(roomName,new Set([username]));
        socket.join(roomName);

        socket.data.username=username;
        socket.data.room=roomName;
        callback({success:true,message:`New Room created by ${username}`});
    });


    socket.on('join:room',(roomName,username,callback)=>{
        if(!rooms.get(roomName)){
            return callback({success:false,message:'Room does not exist'});
        }

        rooms.get(roomName).add(username);
        socket.join(roomName);
        socket.data.username=username;
        socket.data.room=roomName;
        callback({success:true,message:`${username} joined the room`});

        //notify the users of that room that a new user joined
        socket.to(roomName).emit('user:joined',`${username} joined the Room`);
    })


    socket.on('send:message',(message)=>{
        const username=socket.data.username;
        const room=socket.data.room;
        io.to(room).emit('receive:message',{message,username});
    })

    socket.on('disconnect',()=>{
        const room=socket.data.room;
        const username=socket.data.username;

        if(rooms&&rooms.has(room)){
            rooms.get(room).delete(username);
        }
        // Notify other users
            socket.to(room).emit('user:left', `${username} left the room`);

        
    })
})


server.listen(3000,()=>{
    console.log('Listening on port 3000')
})