const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    displayName: Joi.string().min(2).max(50).allow("", null).optional(),
    bio: Joi.string().max(250).allow("", null).optional(),
    avatarUrl: Joi.string().uri().allow("", null).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    content: Joi.string().min(10).required(),
    authorId: Joi.string().allow("", null).optional(),
    categoryId: Joi.string().allow("", null).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    likesCount: Joi.number().integer().min(0).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateUser, validatePost };
