import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Lắng nghe sự kiện từ Laravel Echo
        window.Echo.channel("chat").listen("MessageSent", (e) => {
            setMessages((prevMessages) => [...prevMessages, e.message]);
        });

        return () => {
            window.Echo.leave("chat");
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8000/api/send-message", { message });

        setMessage("");
    };

    return (
        <div className="App">
            <h1>Chat App</h1>
            <form onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
