// function to serve the script file
const getChatBotScript = async (req, res) => {
  res.status(200).json({ name: "John Doe" });
};

export default getChatBotScript;
