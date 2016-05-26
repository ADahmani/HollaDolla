import mongoose from 'mongoose';

export default function(authedUser, data) {
  const Projet = mongoose.model('Projet');

  var {
    name,
  } = data;

  var projet = new Projet({
    name
  });

  console.log(projet);

  return projet.save()
    .then((savedProject) => {
      console.log('SAVED', savedProject);
    });
}
