import Relay from 'react-relay';

export default class AddFriend extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {AddFriend}`;
  }

  getVariables() {
    return {
      email: this.props.email,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddFriendPayload {
        user {
          id
          friends
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id
      }
    }];
  }

  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        friends
      }
    `,
  };
}
