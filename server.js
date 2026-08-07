const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");

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
