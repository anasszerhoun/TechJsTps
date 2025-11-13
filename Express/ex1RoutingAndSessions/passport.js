const express = require("express");
const router = express.Router();
const { checkUser, addUser } = require("./user");

router.post("/login", async (req, res) => {
  
    const user = req.body;
    console.log(user.username);
    if (await checkUser(user.username, user.password)) {
      req.session.username = user.username;
      return res.redirect("/books");
    }
    return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");

});

router.post("/register", async (req, res) => {
  const user = req.body;
  console.log(user);
  console.log("Inside register");
  if(await addUser(user.username, user.password)){
    return res.redirect("/login")
  }
  return res.redirect("/register")
});
module.exports = router;
