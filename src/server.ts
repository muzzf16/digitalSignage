import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3004",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  const forwardEvent = (eventName: string) => {
    socket.on(eventName, (data) => {
      socket.broadcast.emit(eventName, data);
    });
  };

  forwardEvent("slide_created");
  forwardEvent("slide_updated");
  forwardEvent("slide_deleted");
  forwardEvent("rate_created");
  forwardEvent("rate_updated");
  forwardEvent("rate_deleted");
  forwardEvent("news_created");
  forwardEvent("news_updated");
  forwardEvent("news_deleted");
  forwardEvent("exchange_rate_created");
  forwardEvent("exchange_rate_updated");
  forwardEvent("exchange_rate_deleted");
});

const PORT = 3005;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
