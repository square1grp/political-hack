import React from 'react'
import { connect } from "react-redux"
import authActions from '../../redux/auth/action'
import headshotImgSrc from '../../assets/images/headshot.jpg'
import { Row, Col, Image } from 'react-bootstrap'
import './style.scss'

/*
  User Info component used in pages (ex: politicians, donors, etc.)
 */
class UserInfo extends React.Component {
  componentWillMount() {
    this.props.signin({ username: "", password: "" })
  }

  renderUserInfo(type) {
    const { user } = this.props

    switch (type) {
      case "politicians":
        return <>
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
          <h5>HeadQuaters: {user.headquarters}</h5>
          <h5>State: {user.state} District: {user.district}</h5>
          <h5>DOB: {user.birthday}</h5>
          <h5>Party Percent: {user.party_percent}</h5>
          <h5>Tenur: {user.tenur}</h5>
          <h5>Industry: {user.industry}</h5>
          <h5>Org Type: {user.org_type}</h5>
        </>

      case "laws":
        return <>
          <h5>Comments: {user.comments}</h5>
        </>

      default:
        return <></>
    }
  }

  render() {
    const { user, type } = this.props

    return (
      <Row className="user-info rounded mx-auto mb-4">
        <Col xs={12} className="px-lg-4">
          {user ? (
            <>
              <Image className="mb-3 headshot" src={headshotImgSrc} fluid />

              <h4 className="text-center">{user.firstname} {user.lastname}</h4>
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