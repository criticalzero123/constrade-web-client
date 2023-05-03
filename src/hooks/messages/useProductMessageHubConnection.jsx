import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export default function useProductMessageHubConnection() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetch = async () => {
      const apiKey = JSON.parse(localStorage.getItem("ApiKey"));
      const token = JSON.parse(localStorage.getItem("Authorization"));
      if (apiKey && token) {
        const newConnection = new HubConnectionBuilder()
          .withUrl(`${process.env.REACT_APP_API_URL}/hubs/productChatHub`, {
            withCredentials: true,
            headers: {
              ApiKey: apiKey,
            },
            accessTokenFactory: () => {
              return `${token}`;
            },
          })
          .withAutomaticReconnect({
            nextRetryDelayInMilliseconds: (retryContext) => {
              newConnection.headers["ApiKey"] = apiKey;
              return Math.random() < 0.5 ? 1000 : 3000;
            },
          })
          .configureLogging(LogLevel.Information)
          .build();
        setConnection(newConnection);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (connection && connection._connectionState === "Disconnected") {
      connection
        .start()
        .then(() => {
          console.log("SignalR connection established.");

          // Message Receiver
          connection.on("ProductReceiveMessage", (message) => {
            setMessage(message);
          });
        })
        .catch((err) => {
          console.log(`SignalR connection error: ${err}`);
        });
    }

    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection closed.");
      }
    };
  }, [connection]);

  //id for the creating chat or email for the uniqueness of the auth
  const sendMessage = async (senderId, receiverId, productId, message) => {
    if (connection) {
      await connection.invoke(
        "SendMessage",
        senderId,
        receiverId,
        productId,
        message
      );
    }
  };
  return { sendMessage, message };
}
