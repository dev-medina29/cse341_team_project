const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization",
    ],
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "devpulse_secret_key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Google calls this route back after the user approves/denies access.
// passport.authenticate (without session: false) calls req.login() for us,
// which runs serializeUser and writes req.session.passport.user. That's
// what req.isAuthenticated() checks on every later request.
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api-docs" }),
  (req, res) => {
    res.redirect("/");
  },
);

app.use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
  process.exit(1);
});

mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database initialized and server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });