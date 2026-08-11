const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

router.use("/", require("./swagger"));

// Starts the Google OAuth login flow. Passport redirects to Google,
// Google redirects back to /google/callback (handled in server.js).
router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => { },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.user = undefined;
    res.redirect("/");
  });
});

router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/categories", require("./categories"));
router.use("/comments", require("./comments"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

module.exports = router;