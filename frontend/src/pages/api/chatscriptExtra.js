import { firestore } from "../../services/firebase";
import path from "path";
import fs from "fs";

async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const replaceInString = (initialString, searchTerm, replacer) => {
  return initialString.replace(new RegExp(searchTerm, "g"), replacer);
};

export default async function getchatscript(req, res) {
  console.log(req.query);
  const userId = req.query.id;
  if (!userId) {
    return res.send("Token not passed");
  }

  const userRef = firestore.doc(`users/${userId}`);
  const botsRef = firestore.collection("bots");
  const querySnapshot = await botsRef.where("createdUser", "==", userRef).get();

  if (querySnapshot.empty) {
    console.log("empty bro");

    return res.send("Invalid token passed");
  }
  const botDoc = querySnapshot.docs[0];
  console.log(botDoc.data());

  const {
    botName: usersBotname,
    botInitialDescription: usersBotDescription,
    personality,
  } = botDoc.data();
  console.log(usersBotname, usersBotDescription);

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "chattemplate",
      "chattemplateExtraScript.js"
    );

    const templateString = await readFile(filePath);
    const newTemplateString = replaceInString(templateString, "CHAT_ID", userId)
      .replace("BOT_NAME", usersBotname)
      .replace("INITIAL_DESCRIPTION", usersBotDescription);

    return res.send(newTemplateString);
  } catch (error) {
    console.error("Error:", error);
    return res.send("Error:", error);
  }
}
