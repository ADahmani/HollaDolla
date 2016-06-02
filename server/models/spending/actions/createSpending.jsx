import mongoose from 'mongoose';

export default function(authedUser, data) {
  const Spending = mongoose.model('Spending');

  var {
    from,
    to,
    projet,
    amount
  } = data;

  var spending = new Spending({
    from,
    to,
    amount,
    projet
  });

  return spending.save()
    .then((savedSpending) => {
      console.log('SAVED', savedSpending);
      return savedSpending;
    });
}
