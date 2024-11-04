const User = require("../model/user");

async function createAdminUser() {
  await User.create({ email: "admin@admin.com", password: "password" });
}

createAdminUser().then(() => console.log("Admin user created"));
