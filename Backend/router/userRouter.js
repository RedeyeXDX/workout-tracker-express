const router = require("express").Router();

const { login, signup } = require("../controller/usercontroller");

router.post("/", login);

router.post("/signup", signup);

module.exports = router;
