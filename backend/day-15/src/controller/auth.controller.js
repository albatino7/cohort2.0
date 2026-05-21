async function registerController(req, res) {
  console.log("Register Controller");
  res.send("This is Register Routes ");
}

async function loginController(req, res) {
  console.log("Login Controller");
  res.send("This is  Login Routes");
}

module.exports = { registerController, loginController };
