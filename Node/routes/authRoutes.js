const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body; 
    const user = new User({ username, email, password }); 
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ username: user.username, token });
  } catch (error) {
    next(error);
  }
});


router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);
    await req.user.save();
    res.send('Logout successful');
  } catch (error) {
    next(error);
  }
});

module.exports = router;