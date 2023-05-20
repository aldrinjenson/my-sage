const generateChatInHtml = () => {
  const head = document.head;
  head.innerHTML += `
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <link
      href="http://localhost:3000/chattemplate.css"
      rel="stylesheet"
    />`;

  const myFab = document.querySelector("#my-fab");
  myFab.innerHTML = `
<div id="chat-bot">
  <div class="bg-gray-100">
    <div id="fab" class="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer">
      <i class="fas fa-comment-alt"></i>
    </div>

    <div class="conversation hidden fixed bottom-14 right-4 bg-gray-100 w-80 h-96 rounded-lg shadow-md">
      <div class="conversation-header bg-blue-500 text-white px-4 py-2 rounded-t-lg">
        <span id="botName"></span>
        <span class="close-button text-xl cursor-pointer">&times;</span>
      </div>
      <div class="conversation-body px-4 py-2 overflow-y-scroll h-64">
        <div id="initialBotMsg" class="message bot-message bg-white py-1 px-2 rounded mb-2">
          Hello, my name is infobot. How can I help you?
        </div>
      </div>
      <div class="conversation-footer px-4 py-2 flex items-center justify-between">
        <input type="text" placeholder="Type a message" class="w-3/4 py-2 px-3 rounded border border-gray-300" />
        <i class="fas fa-paper-plane text-blue-500 text-xl cursor-pointer" id="send-button"></i>
      </div>
    </div>
  </div>
</div>

      `;
  // var script = document.createElement("script");
  // script.src = "http://localhost:3000/api/chatscriptExtra?id=1234"; // Replace 'script.js' with your script URL
  // script.async = true;

  // document.body.appendChild(script);
};
generateChatInHtml();
