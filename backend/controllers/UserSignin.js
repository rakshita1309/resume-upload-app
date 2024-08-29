const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403)
      .json({
         message: 'user not found, Please signup!', 
         success: false 
        });
    }
    
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403)
      .json({
         message: 'incorrect password', 
         success: false 
        });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h'}
    )
    return res.status(200)
    .json({
        message: 'user logged successfully',
        success: true,
        jwtToken,
        email,
        name: user.firstname
    })
  } catch (error) {
    res.status(500)
    .json({
        message: 'Internal server error',
        success: false
    })
    console.log("error", error);
  }
};

module.exports = signin;



