const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const connectDB = require('./configs/database');
const router = require('./routers');
const loginMiddleware = require('./middlewares/login.middleware');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, POST, PUT, PATCH, DELETE',
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.get('/login', loginMiddleware, (req, res) => {
  res.render('index.ejs', { user: req.query });
});

io.on('connection', function (client) {
  // console.log('client connected...');
  var room;
  client.on('join', function (data) {
    room = data;
    client.join(room);
  });
  client.on('messages', function (data) {
    io.to(room).emit('thread', data);
  });
});

connectDB();
router(app);

server.listen(3000, () => {
  console.log('Running in port 3000');
});
