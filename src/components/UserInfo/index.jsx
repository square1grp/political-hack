import React from 'react'
import { connect } from "react-redux"
import authActions from '../../redux/auth/action'
import headshotImgSrc from '../../assets/images/headshot.jpg'
import { Row, Col, Image } from 'react-bootstrap'
import './style.scss'


class UserInfo extends React.Component {
  componentWillMount() {
    this.props.signin({ username: "", password: "" })
  }

  render() {
    const user = this.props.user;
    console.log(user)
    return (
      <Row className="user-info rounded mx-auto">
        <Col xs={12} lg={{ span: 10, offset: 1 }}>
          {user ? (
            <>
              <Image className="mb-3 headshot" src={headshotImgSrc} fluid />

              <h4 className="text-center">{user.firstname} {user.lastname}</h4>
              <h5>Hometown: {user.hometown}</h5>
              <h5>State: {user.state} District: {user.district}</h5>
              <h5>DOB: {user.birthday}</h5>
              <h5>Party: {user.party}</h5>
              <h5>Tenur: {user.tenur}</h5>
              <h5>Gender: {user.gender}</h5>
              <h5>Prior Occupation: {user.occupation}</h5>
            </>
          ) : <React.Fragment />}
        </Col>
      </Row>
    )
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