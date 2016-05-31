var mongoose = require('mongoose');

export default function(email, password, rootVal) {

  var User = mongoose.model('User');
  if (!email) throw 'email_required';
  if (!password) throw 'password_required';
  var req = rootVal.req;
  // console.log('PASSPORT', req.session);
  // var user = new User({
  //   email,
  //   password,
  //   first_name: 'achraf'
  // });

  return User.findOne({email}).exec()
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


  // .then(loggeduser => {
  //   console.log('loggeduser', loggeduser);
  //   console.log('user', user);
  //   req.logIn(user, function() {
  //   })})
}
