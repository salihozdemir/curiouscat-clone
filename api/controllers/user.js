const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('-__v')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'User not found.'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1H'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token
          });
        }
        return res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: 'Mail exist'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username
            });
            user
              .save()
              .then(result => {
                const token = jwt.sign(
                  {
                    username: result.username,
                    userId: result._id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: '1H'
                  }
                );
                return res.status(201).json({
                  message: 'User created',
                  token: token
                });
              })
              .catch(err => {
                if (err.code === 11000) {
                  res.status(409).json({
                    message: 'Username exist'
                  });
                }
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.get_user_by_username = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .exec()
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: 'User not found'
        });
      }
      res.status(200).json({
        user: {
          username: user.username
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
