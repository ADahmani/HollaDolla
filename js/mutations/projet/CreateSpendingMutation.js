import Relay from 'react-relay';

export default class CreateSpending extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {CreateSpending}`;
  }

  getVariables() {
    return {
      to: this.props.to,
      projet: this.props.projet._id,
      amount: this.props.amount,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateSpendingPayload {
        projet {
          _id
          id
          name
          type
          city
          totalSpendings
          spendings (first: 100) {
            edges {
              node {
                amount
                from {
                  _id
                  first_name
                }
                to {
                  _id
                  first_name
                }
              }
            }
          }
    			totalSpendings
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        projet: this.props.projet.id
      }
    }];
  }

  static fragments = {
    projet: () => Relay.QL`
      fragment on Projet {
        _id
        id
        name
        type
        city
        totalSpendings
        spendings (first: 100) {
          edges {
            node {
              amount
              from {
                _id
                first_name
              }
              to {
                _id
                first_name
              }
            }
          }
        }
      }
    `,
  };
}
