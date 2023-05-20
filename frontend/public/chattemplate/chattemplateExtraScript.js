const fab = document.getElementById("fab");
const conversation = document.querySelector(".conversation");
const closeButton = document.querySelector(".close-button");
const sendButton = document.getElementById("send-button");
const conversationBody = document.querySelector(".conversation-body");
const input = document.querySelector(".conversation-footer input");

fab.addEventListener("click", () => {
  conversation.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  conversation.classList.add("hidden");
});

sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const userMessage = input.value.trim();

  if (userMessage !== "") {
    const userMessageElement = createMessageElement(
      userMessage,
      "user-message"
    );
    conversationBody.appendChild(userMessageElement);

    input.value = "";
    input.focus();

    fetchResponse(userMessage);
  }
}

function fetchResponse(message) {
  const apiUrl = "http://localhost:8000/chat?id=CHAT_ID";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      id: "CHAT_ID",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = data.response;
      const botMessageElement = createMessageElement(botMessage, "bot-message");
      conversationBody.appendChild(botMessageElement);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function createMessageElement(message, className) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add(
    "message",
    className,
    "bg-gray-100",
    "py-1",
    "px-2",
    "rounded",
    "mb-2"
  );
  return messageElement;
}

const cleanUp = (usersInitialMsg, usersBotName) => {
  const initialBotMsg = document.querySelector("#initialBotMsg");
  initialBotMsg.innerText = usersInitialMsg;
  const botName = document.querySelector("#botName");
  botName.innerText = usersBotName;
};

cleanUp("INITIAL_DESCRIPTION", "BOT_NAME");
