import Relay from 'react-relay';

export default class EmailLogin extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {EmailLogin}`;
  }

  getVariables() {
    return {
      email: this.props.email,
      password: this.props.password,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EmailLoginPayload {
        viewer {
          id
          me {
            _id
            email
            first_name
            friends
            projets(first: 10) {
              edges{
                node {
                  _id
                  id
                  name
                  type
                  city
                  totalSpendings
                  participants {
                    id
                    _id
                    first_name
                  }
                  spendings(first: 100) {
                    edges {
                      node {
                        _id
                        projet
                        from {
                          _id
                          first_name
                        }
                        to {
                          _id
                          first_name
                        }
                        amount
                      }
                    }
                  }
                }
              }
              totalCount
              rangeBegin
              rangeEnd
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id
      }
    }];
  }

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        me {
          id
          _id
          email
          first_name
          friends
          projets(first: 100) {
            edges{
              node {
                _id
                id
                name
                type
                city
                totalSpendings
                participants {
                  id
                  _id
                  first_name
                }
                spendings(first: 100) {
                  edges {
                    node {
                      _id
                      projet
                      from {
                        _id
                        first_name
                      }
                      to {
                        _id
                        first_name
                      }
                      amount
                    }
                  }
                }
              }
            }
            totalCount
            rangeBegin
            rangeEnd
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `,
  };
}
