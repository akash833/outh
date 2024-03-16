const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.UserLogin = async (req, res) => {
  res.send("Welcome to login Page");
};

exports.UserSignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existed = await User.findOne({email});

    if (existed) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password,10);

      const user = await User.create({
        name, email, password: hashPassword, role
      })
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        status : false,
        message : 'password is not hashed please try with different password'
      })
    }

    return res.status(200).json({
      success: true,
      message: "User is created successfully"
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success : false,
      message : 'User cannot be regsitered Please try again later'
    })
  }
};
