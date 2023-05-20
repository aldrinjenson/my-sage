import firebase from "./firebase";

const db = firebase.firestore();

export const getBotsByUserId = async (userId) => {
  const snapshot = await db
    .collection("bots")
    .where("userId", "==", userId)
    .get();

  const bots = snapshot.docs.map((doc) => doc.data());
  return bots;
};
