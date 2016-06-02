var mongoose = require('mongoose');

export default function(userName, password, rootVal) {

  var User = mongoose.model('User');
  if (!userName) throw 'username_required';
  if (!password) throw 'password_required';
  var req = rootVal.req;

  return User.findOne({userName}).exec()
    .then((user) => {
      if (!user) {
        throw 'user_not_found'
      }
      console.log('found', user);
      if (user.password === password) {
        req.logIn(user, function() {
          console.log('LOGGED IN !!!');
        })
        return user;
      } else {
        return 'wrong_password';
      }

    });
}
