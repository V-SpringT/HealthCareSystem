import connect from './DB/connect.js'

const PORT = 3484;	
import http from 'http'
				
import { Server } from 'socket.io';
var app = http.createServer();					
var io = new Server(app,{
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});				
app.listen(PORT);									
console.log("Server nodejs chay tai dia chi: " + "localhost" + ":" + PORT)
// connect() 


//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

function sendTime() {
	
	//Đây là một chuỗi JSON
	var json = {
				
    }
    // io.sockets.emit('atime', json);
}
 
io.on('connection', function(socket) {	
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
	//Gửi đi lệnh 'welcome' với một tham số là một biến JSON. Trong biến JSON này có một tham số và tham số đó tên là message. Kiểu dữ liệu của tham số là một chuối.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
	
	
    socket.on('atime', function(data) {
        console.log("----------------------Data ESP8266-----------------")
        console.log(data);
    });
    let i=0;
    setInterval(() => {
        console.log("GIA TRI i: "+{i})
        io.sockets.emit('welcome', {title: "title "+i,message : 'server-time Lan thu '+ i,type: "chu de " + i});
        i+=1
    }, 5000); // Mỗi 3 giây

});