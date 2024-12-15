const router = require("express").Router();

const { login } = require("../controller/usercontroller");

router.post("/", login);

module.exports = router;
