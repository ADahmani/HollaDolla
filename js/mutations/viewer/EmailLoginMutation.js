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
                  id
                  name
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
                id
                name
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
