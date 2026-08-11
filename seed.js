/**
 * seed.js
 *
 * Populates the database with sample documents for all four collections:
 * users, categories, posts, and comments.
 *
 * Usage:
 *   node seed.js
 *
 * WARNING: This clears the four collections before inserting fresh data.
 * Only run against a dev/test database.
 */

const mongodb = require("./data/database");
const { ObjectId } = require("mongodb");

const seed = async () => {
    try {
        const db = await mongodb.initDb();

        const usersCollection = db.collection("users");
        const categoriesCollection = db.collection("categories");
        const postsCollection = db.collection("posts");
        const commentsCollection = db.collection("comments");

        // Clear existing data so this script can be re-run safely
        await usersCollection.deleteMany({});
        await categoriesCollection.deleteMany({});
        await postsCollection.deleteMany({});
        await commentsCollection.deleteMany({});
        console.log("Cleared existing users, categories, posts, and comments.");

        // ----- Users -----
        const users = [
            {
                username: "alex_dev",
                email: "alex.dev@example.com",
                displayName: "Alex Morgan",
                bio: "Full-stack developer passionate about Node.js and REST APIs.",
                avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
                createdAt: new Date(),
            },
            {
                username: "jamie_codes",
                email: "jamie.codes@example.com",
                displayName: "Jamie Rivera",
                bio: "Frontend engineer who loves clean UI and accessible design.",
                avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                createdAt: new Date(),
            },
            {
                username: "sam_builds",
                email: "sam.builds@example.com",
                displayName: "Sam Okafor",
                bio: "DevOps enthusiast, coffee addict, occasional blogger.",
                avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                createdAt: new Date(),
            },
        ];
        const usersResult = await usersCollection.insertMany(users);
        const userIds = Object.values(usersResult.insertedIds);
        console.log(`Inserted ${userIds.length} users.`);

        // ----- Categories -----
        const categories = [
            {
                name: "Web Development",
                description: "Articles related to backend and frontend web technologies.",
                slug: "web-development",
            },
            {
                name: "DevOps",
                description: "Deployment, CI/CD, containers, and infrastructure topics.",
                slug: "devops",
            },
            {
                name: "Career",
                description: "Advice and stories about growing a software career.",
                slug: "career",
            },
        ];
        const categoriesResult = await categoriesCollection.insertMany(categories);
        const categoryIds = Object.values(categoriesResult.insertedIds);
        console.log(`Inserted ${categoryIds.length} categories.`);

        // ----- Posts -----
        const posts = [
            {
                title: "Building Scalable RESTful APIs with Node.js and Express",
                content:
                    "Creating scalable backends with Node.js is simple once you master middleware architecture, error handling, and clean route organization.",
                authorId: userIds[0].toString(),
                categoryId: categoryIds[0].toString(),
                tags: ["nodejs", "express", "backend"],
                likesCount: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "A Practical Guide to CI/CD with GitHub Actions",
                content:
                    "Automating your test and deploy pipeline saves hours every week. Here is a practical walkthrough of setting up GitHub Actions.",
                authorId: userIds[2].toString(),
                categoryId: categoryIds[1].toString(),
                tags: ["devops", "ci-cd", "github-actions"],
                likesCount: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Five Lessons From My First Year as a Junior Developer",
                content:
                    "Looking back on my first year in the industry, these are the lessons that mattered most for growth and confidence.",
                authorId: userIds[1].toString(),
                categoryId: categoryIds[2].toString(),
                tags: ["career", "junior-dev", "advice"],
                likesCount: 21,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const postsResult = await postsCollection.insertMany(posts);
        const postIds = Object.values(postsResult.insertedIds);
        console.log(`Inserted ${postIds.length} posts.`);

        // ----- Comments -----
        const comments = [
            {
                postId: new ObjectId(postIds[0]),
                authorId: userIds[1].toString(),
                content: "Great article on REST API standards!",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                postId: new ObjectId(postIds[0]),
                authorId: userIds[2].toString(),
                content: "The middleware section really helped me understand error handling.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                postId: new ObjectId(postIds[1]),
                authorId: userIds[0].toString(),
                content: "I switched from Jenkins to GitHub Actions after reading this.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                postId: new ObjectId(postIds[2]),
                authorId: userIds[2].toString(),
                content: "Number 3 hit close to home. Thanks for sharing!",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const commentsResult = await commentsCollection.insertMany(comments);
        console.log(`Inserted ${Object.keys(commentsResult.insertedIds).length} comments.`);

        console.log("Seeding complete.");
    } catch (err) {
        console.error("Error while seeding database:", err);
    } finally {
        process.exit();
    }
};

seed();