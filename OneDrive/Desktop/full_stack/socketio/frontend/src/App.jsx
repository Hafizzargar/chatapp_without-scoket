import { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";

const serverbackend = "http://localhost:4000/";

function App() {
  const [txt, settxt] = useState("");
  const [txt1, settxt1] = useState("");
  const [getdatas, setgetdatas] = useState([]);

  // Separate refs for each chat container
  const chatEndRef1 = useRef(null);
  const chatEndRef2 = useRef(null);

  const senddatafxn = async ({ chat, senderid, reciverid }) => {
    if (chat.trim() === "") {
      toast.error("Empty input string");
      return;
    }

    // Clear input field after sending message
    if (senderid === "1111") settxt("");
    if (senderid === "2222") settxt1("");

    try {
      const res = await axios.post(`${serverbackend}sendchats`, {
        chat,
        senderid,
        reciverid,
      });

      if (res.data.message === "send chat") {
        fetchMessages(); // Fetch messages after sending
      }
    } catch (err) {
      console.log("Error sending chat:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${serverbackend}getchats`, {
        withCredentials: true,
      });
      setgetdatas(res.data.getData);
    } catch (err) {
      console.log("Error fetching chats:", err);
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages on page load
  }, []);

  // Scroll to the latest message after fetching
  useLayoutEffect(() => {
    setTimeout(() => {
      chatEndRef1.current?.scrollIntoView({ behavior: "smooth" });
      chatEndRef2.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [getdatas]);

  return (
    <>
      <div>Chat App (No WebSockets)</div>
      <div>Hafiz ID: 1111 and Hamid ID: 2222</div>
      <div className="display">
        {/* Container for Hafiz (ID: 1111) */}
        <div className="container">
          {Array.isArray(getdatas) && getdatas.length > 0 ? (
            getdatas.map((item, index) => (
              <div key={index}>
                <div className={item.senderid === "1111" ? "sendercss" : "recievercss"}>
                  {item.chat}
                </div>
              </div>
            ))
          ) : (
            <div>No chats available.</div>
          )}
          <div ref={chatEndRef1} /> {/* Scroll target */}
        </div>

        {/* Input for Hafiz */}
        <div className="input-container">
          <input
            placeholder="Enter text here"
            type="text"
            value={txt}
            onChange={(e) => settxt(e.target.value)}
          />
          <button onClick={() => senddatafxn({ chat: txt, senderid: "1111", reciverid: "2222" })}>
            Send
          </button>
        </div>

        {/* Container for Hamid (ID: 2222) */}
        <div className="container">
          {Array.isArray(getdatas) && getdatas.length > 0 ? (
            getdatas.map((item, index) => (
              <div key={index}>
                <div className={item.senderid === "2222" ? "sendercss" : "recievercss"}>
                  {item.chat}
                </div>
              </div>
            ))
          ) : (
            <div>No chats available.</div>
          )}
          <div ref={chatEndRef2} /> {/* Scroll target */}
        </div>

        {/* Input for Hamid */}
        <div className="input-container">
          <input
            placeholder="Enter text here"
            value={txt1}
            type="text"
            onChange={(e) => settxt1(e.target.value)}
          />
          <button onClick={() => senddatafxn({ chat: txt1, senderid: "2222", reciverid: "1111" })}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
