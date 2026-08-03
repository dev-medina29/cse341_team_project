const Joi = require("joi");

// User schema middleware
const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    bio: Joi.string().max(200).optional(),
    role: Joi.string().valid("user", "admin").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Post schema middleware
const validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    authorId: Joi.string().required(), // ObjectId as string
    likes: Joi.number().integer().min(0).default(0),
    comments: Joi.array()
      .items(
        Joi.object({
          userId: Joi.string().required(),
          commentText: Joi.string().min(1).max(200).required(),
        }),
      )
      .default([]),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateUser, validatePost };
