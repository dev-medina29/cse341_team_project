const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DevPulse Social Blogging API",
    description: "API Documentation for DevPulse Platform",
  },
  host: "localhost:3000", 
  schemes: ["http", "https"],
  definitions: {
    User: {
      username: "alex_dev",
      email: "alex.dev@example.com",
      displayName: "Alex Morgan",
      bio: "Full-stack developer passionate about Node.js and REST APIs.",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    Post: {
      title: "Building Scalable RESTful APIs with Node.js and Express",
      content:
        "Creating scalable backends with Node.js is simple once you master middleware architecture...",
      authorId: "66b3a1f1e2b0a1c2d3e4f5a1",
      categoryId: "66b3a1f1e2b0a1c2d3e4f5c1",
      tags: ["nodejs", "express", "backend"],
      likesCount: 12,
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
