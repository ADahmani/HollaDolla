import mongoose from 'mongoose';

export default (me, email) => {
  const User = mongoose.model('User');
  return User.findOne({email}).exec().then(friend => {
    return User
      .findOneAndUpdate(
        {_id: me._id},
        {$addToSet: {friends: friend._id + ';' + friend.userName}},
        {new: true})
      .exec()
      .then(user => {
        User
          .findOneAndUpdate(
            {_id: friend._id},
            {$addToSet: {friends: user._id + ';' + user.userName}},
            {new: true})
          .exec();
      });
  });
};
