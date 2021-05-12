const User = require("../models/UserModel");

//GET REQUESTS

exports.getAllUSers = async (req, res) => {
  try {
    const response = await User.find();
    res.json({
      message: "Request to get all users successful",
      data: response,
    });
  } catch (error) {
    res.json({ message: "Try again, request failed" });
  }
};

exports.getUserByName = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await User.findOne({ name });
    if (!!response) {
      return res.json({
        message: `Hello ${name},Here is your information.`,
        data: response,
      });
    }
    res.json({ message: "Sorry, we couldn't find that name" });
  } catch (error) {
    res.json({ message: "Sorry,please try again" });
  }
};

//GET REQUESTS ENDS

// POST REQUESTS STARTS HERE
exports.addUser = async (req, res) => {
  const { name, email, country } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //do simple validation and make all fields are present

  // save the user if every thing is present and validated
  try {
    if (!name || name.length < 2) {
      return res.json({
        message:
          "Name should not be empty,and it should be more than 2 letters",
      });
    }
    if (!emailRegex.test(email)) {
      return res.json({ message: "Invalid email" });
    }
    if (!country || country.length < 2) {
      return res.json({
        message: "Country cannot be empty,and it should be more than 2 letters",
      });
    }
    //create new instance of the model
    const newUser = new User({ name, email, country });
    const response = await newUser.save();
    res.json({
      message: `Hello ${name}, Your data has been created successfully.`,
      data: response,
    });
  } catch (error) {
    res.json({ message: "Error,user could not be created, try again" });
  }
};

// POST REQUESTS ENDS HERE

// UPDATE REQUESTS STARTS HERE
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, country } = req.body;

  try {
    //do simple validation and make all fields are present
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name || name.length < 2) {
      return res.json({
        message:
          "Name should not be empty,and it should be more than 2 letters",
      });
    }
    if (!emailRegex.test(email)) {
      return res.json({ message: "Invalid email" });
    }
    if (!country || country.length < 2) {
      return res.json({
        message: "Country cannot be empty,and it should be more than 2 letters",
      });
    }

    const response = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });

    res.json({ message: "User updated successfully", data: response });
  } catch (error) {
    res.json({ message: "Could not update,Try again." });
  }
};

// UPDATE REQUESTS ENDS HERE

//Delete

exports.deleteUser = async (req, res) => {
  const username = req.params.name;
  try {
    const response = await User.findOneAndRemove({ name: username });
    res.json({ message: "User deleted succesfully." });
  } catch (error) {
    res.json({ message: "Error,couldn't delete user, try again later." });
  }
};
