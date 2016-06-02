import Relay from 'react-relay';

export default class CreateProjet extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {CreateProjet}`;
  }

  getVariables() {
    return {
      name: this.props.name,
      city: this.props.city,
      type: this.props.type,
      participants: this.props.participants,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateProjetPayload {
        viewer {
          id
          me {
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
