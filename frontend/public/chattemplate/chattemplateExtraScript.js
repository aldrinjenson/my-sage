const fab = document.getElementById("fab");
const conversation = document.querySelector(".conversation");
const closeButton = document.querySelector(".close-button");
const sendButton = document.getElementById("send-button");
const conversationBody = document.querySelector(".conversation-body");
const input = document.querySelector(".conversation-footer input");
const botIsTypingMsg = document.querySelector("#botIsTypingMsg");

let isMessageLoading = false;

fab.addEventListener("click", () => {
  conversation.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  conversation.classList.add("hidden");
});

sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) sendMessage();
});

function sendMessage() {
  if (isMessageLoading) {
    console.log("mesage is loading bro, wait!");
    return;
  }
  const userMessage = input.value.trim();

  if (userMessage !== "") {
    const userMessageElement = createMessageElement(
      userMessage,
      "user-message"
    );
    conversationBody.appendChild(userMessageElement);
    conversationBody.scrollTop = conversationBody.scrollHeight;

    input.value = "";
    input.focus();

    fetchResponse(userMessage);
  }
}

function fetchResponse(message) {
  botIsTypingMsg.classList.remove("opa-hidden");

  isMessageLoading = true;
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
    })
    .finally(() => {
      botIsTypingMsg.classList.add("opa-hidden");
      conversationBody.scrollTop = conversationBody.scrollHeight;
      isMessageLoading = false;
    });
}

function createMessageElement(message, className) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message", className);
  return messageElement;
}

const cleanUp = (usersInitialMsg, usersBotName) => {
  const initialBotMsg = document.querySelector("#initialBotMsg");
  initialBotMsg.innerText = usersInitialMsg;
  const botName = document.querySelector("#botName");
  botName.innerText = usersBotName;
  botIsTypingMsg.classList.add("opa-hidden");
};

cleanUp("INITIAL_DESCRIPTION", "BOT_NAME");
