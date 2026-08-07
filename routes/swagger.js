const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
router.use("/api-docs", swaggerUi.serve, (req, res, next) => {
  swaggerDocument.host = req.get("host");
  swaggerDocument.schemes =
    req.secure || req.headers["x-forwarded-proto"] === "https"
      ? ["https"]
      : ["http"];

  swaggerUi.setup(swaggerDocument)(req, res, next);
});

module.exports = router;
