export default async function getchatscript(req, res) {
  console.log(req.query);
  const userId = req.query.id;
  if (!userId) {
    return res.send("Token not passed");
  }
  if (userId !== "1234") {
    return res.send("Invalid token passed");
  }
  return res.send("file.js");
}
