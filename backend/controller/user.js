const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();
//first running only to createAdmin
// require('../seeder/createAdmin')

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid Username or Password" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ token});
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
}