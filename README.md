### Basic Chat Room Project Description:

The **Basic Chat Room** project is a simple real-time web application that enables multiple users to communicate by sending and receiving text messages in a shared chat interface.

---

#### Features:

* **Real-time messaging**: Users can send and receive messages instantly without reloading the page.
* **Multiple users**: Supports multiple users connected to the same chat room.
* **Basic user identification**: Users can set a username before joining the chat.
* **Simple interface**: Displays messages along with the sender’s username and timestamp.


#### Technologies Used:

* **Frontend**: HTML, CSS, JavaScript.
* **Backend**: Node.js with Express.js.
* **WebSockets**: Socket.IO for real-time communication.
* **Server**: Handles connections and broadcasts messages to all users.


#### Flow:

1. A user opens the chat room webpage and enters their username.
2. User sends a message via a text input.
3. The frontend emits the message event to the server using WebSocket.
4. The server receives the message and broadcasts it to all connected clients.
5. Each client updates the chat window in real time.


#### Purpose:

* Learn about real-time communication.
* Understand how WebSockets work.
* Practice frontend-backend interaction.

