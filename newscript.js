const fab = document.getElementById("fab");
const conversation = document.querySelector(".conversation");
const closeButton = document.querySelector(".close-button");
const sendButton = document.getElementById("send-button");
const conversationBody = document.querySelector(".conversation-body");

fab.addEventListener("click", () => {
  conversation.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  conversation.classList.add("hidden");
});

sendButton.addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  const input = document.querySelector(".conversation-footer input");
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
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to get the bot's response
  const apiUrl = "http://localhost:8000/chat";

  // Make a request to the API endpoint with the user's message
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      id: 1234,
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
