const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DevPulse Social Blogging API",
    description: "API Documentation for DevPulse Platform",
  },
  host: process.env.NODE_ENV === "production"
  ? "cse341-team-project-m1rm.onrender.com"
  : "localhost:3000",
schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
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
    Category: {
      name: "Web Development",
      description: "Articles related to backend and frontend web technologies.",
      slug: "web-development",
    },
    Comment: {
      postId: "66b3a1f1e2b0a1c2d3e4f5b1",
      authorId: "66b3a1f1e2b0a1c2d3e4f5a1",
      content: "Great article on REST API standards!",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
