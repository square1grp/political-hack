import React from 'react'
import { connect } from "react-redux"
import authActions from '../../redux/auth/action'


class UserInfo extends React.Component {
  componentDidMount() {
    this.props.signin({ username: "", password: "" })
  }

  render() {
    const user = this.props.user;
    return (<div>User Info</div>)
  }
}

const mapStateToProps = (state) => ({
  ...state.Auth
});

const mapDispatchToProps = {
  ...authActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);