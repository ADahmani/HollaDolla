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
            projets(first: 10) {
              edges {
                node {
                  id
                  name
                }
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
          projets(first: 10) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `,
  };
}
