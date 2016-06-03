import mongoose from 'mongoose';
import _ from 'lodash';
export default function(authedUser, data) {
  const Spending = mongoose.model('Spending');
  const Projet = mongoose.model('Projet');


  var {
    from,
    to,
    projet,
    amount
  } = data;
  amount = parseFloat(amount).toString();
  if (amount === 'NaN') throw 'amount_must_be_number';

  return _.map(to, participant => {
    var spending = new Spending({
      from,
      to: participant,
      amount,
      projet
    });

    return spending.save()
      .then((savedSpending) => {
        Projet.findOne({_id: projet})
          .exec()
          .then(TheProject => {
            var sum = parseFloat(TheProject.totalSpendings) + parseFloat(amount);
            Projet.findOneAndUpdate(
              {_id: projet},
              {totalSpendings: sum.toString()}
            ).exec()
        });
        return savedSpending;
      });
  })
}
