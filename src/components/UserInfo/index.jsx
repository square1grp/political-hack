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

  renderUserInfo(type) {
    const { user } = this.props

    switch (type) {
      case "politicians":
        return <>
          <h4 className="text-center">{user.firstname} {user.lastname}</h4>
          <h5>Hometown: {user.hometown}</h5>
          <h5>State: {user.state} District: {user.district}</h5>
          <h5>DOB: {user.birthday}</h5>
          <h5>Party: {user.party}</h5>
          <h5>Tenur: {user.tenur}</h5>
          <h5>Gender: {user.gender}</h5>
          <h5>Prior Occupation: {user.occupation}</h5>
        </>

      case "donors":
        return <>
          <h4 className="text-center">{user.firstname} {user.lastname}</h4>
          <h5>HeadQuaters: {user.headquarters}</h5>
          <h5>State: {user.state} District: {user.district}</h5>
          <h5>DOB: {user.birthday}</h5>
          <h5>Party Percent: {user.party_percent}</h5>
          <h5>Tenur: {user.tenur}</h5>
          <h5>Industry: {user.industry}</h5>
          <h5>Org Type: {user.org_type}</h5>
        </>
    }
  }

  render() {
    const { user, type } = this.props

    return (
      <Row className="user-info rounded mx-auto">
        <Col xs={12} className="px-lg-4">
          {user ? (
            <>
              <Image className="mb-3 headshot" src={headshotImgSrc} fluid />

              {this.renderUserInfo(type)}
            </>
          ) : <React.Fragment />}
        </Col>
      </Row >
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