import mongoose from 'mongoose';

export default function(authedUser, data) {
  const Projet = mongoose.model('Projet');

  var {
    name,
    city,
    type,
    participants
  } = data;

  var projet = new Projet({
    name,
    city,
    type,
    participants,
    owner: authedUser._id
  });

  console.log(projet);

  return projet.save()
    .then((savedProject) => {
      console.log('SAVED', savedProject);
    });
}
