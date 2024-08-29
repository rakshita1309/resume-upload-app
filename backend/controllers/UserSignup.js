const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;
    const user = await UserModel.findOne({ email });

    console.log(user);
    if (user) {
      return res.status(409)
      .json({
         message: "user already exists", 
         success: false 
        });
    }
    const userModel = new UserModel({
      firstname,
      lastname,
      email,
      phonenumber,
      password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    return res.status(201)
    .json({
        message: 'user creted successfully',
        success: true
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

module.exports = signup;
