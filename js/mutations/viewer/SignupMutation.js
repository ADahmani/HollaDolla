import Relay from 'react-relay';

export default class SignUp extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {SignUp}`;
  }

  getVariables() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      userName: this.props.userName,
      email: this.props.email,
      password: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignUpPayload {
        viewer {
          id
          me {
            _id
            email
            first_name
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
            friends
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
