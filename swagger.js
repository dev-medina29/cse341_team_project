const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  // host: "localhost:2026",
  host: "cse341-week3-personal-project.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
