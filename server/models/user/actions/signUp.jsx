var mongoose = require('mongoose');

export default function(data, rootVal) {

  var {
    firstName,
    lastName,
    userName,
    email,
    password
  } = data;
  var User = mongoose.model('User');
  if (!userName) throw 'username_required';
  if (!email) throw 'email_required';
  if (!password) throw 'password_required';
  var req = rootVal.req;

  User.findOne({userName}).exec()
    .then((olduser) => {
      if (olduser) throw 'username_taken';
    });

  var user = new User({
    firstName,
    lastName,
    userName,
    email,
    password
  });

  return user.save().get(0)
    .then((newuser) => {
      req.logIn(newuser, function() {
        console.log('LOGGED IN !!!');
      })
      return user;
    });
}
