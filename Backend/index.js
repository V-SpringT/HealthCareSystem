import connect from './DB/connect.js';

const PORT = 3484;
import http from 'http';

import { Server } from 'socket.io';

var app = http.createServer();
var io = new Server(app, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.listen(PORT);
console.log(`Server đang chạy tại địa chỉ: http://localhost:${PORT}`);
// connect()

// Trạng thái và interval
let statuses = {
    heart: true,
    temperature: true,
    signal: true,
    exam: false,
};

let intervals = {
    heart: null,
    temperature: null,
    signal: null,
    examination: null,
};

// Khởi tạo interval
function startInterval(event, io) {
    if (intervals[event] || !statuses[event]) return;

    let counter = 0;
    const intervalTime = { heart: 5000, temperature: 6000, signal: 7000, examination: 5000 };

    intervals[event] = setInterval(() => {
        let payload;
        if (event === 'examination') {
            payload = {
                heart: 60 + counter,
                temperature: 30 + counter,
            };
        } else {
            payload = {
                title: `${event} ${counter}`,
                message: `server-time Lần thứ ${counter}`,
                type: `chủ đề ${counter}`,
            };
        }
        io.sockets.emit(event, payload);
        counter++;
    }, intervalTime[event]);
}

// Dừng interval
function stopInterval(event) {
    if (intervals[event]) {
        clearInterval(intervals[event]);
        intervals[event] = null;
    }
}

io.on('connection', (socket) => {
    console.log("Client đã kết nối");

    // Nhận trạng thái cập nhật từ client
    socket.on('updateStatus', (data) => {
        console.log("Nhận trạng thái cập nhật:", data);

        Object.keys(data).forEach(event => {
            if (statuses[event] !== data[event]) {
                statuses[event] = data[event];
                if (data[event]) startInterval(event, io);
                else stopInterval(event);
            }
        });
    });

    // Dừng tất cả intervals khi client ngắt kết nối
    socket.on('disconnect', () => {
        console.log("Client đã ngắt kết nối");
        Object.keys(statuses).forEach(event => stopInterval(event));
    });

    // Khởi tạo interval nếu trạng thái ban đầu là true
    Object.keys(statuses).forEach(event => {
        if (statuses[event]) startInterval(event, io);
    });
});
