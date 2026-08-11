const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/categories", require("./categories"));
router.use("/comments", require("./comments"));

// Top-level login/logout URLs, matching the standalone DevPulse project
// structure. The /google/callback route itself lives in server.js, right
// next to where session/passport middleware is configured.
router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

module.exports = router;