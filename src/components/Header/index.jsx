import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.scss'

/*
  This component is a header component
    - Search, Sign Up/In links
    - Banner image
    - Navigation
 */
class Header extends React.Component {
  render() {
    return (
      <>
        <section className="banner">
          <Container>
            <Row className="py-3">
              <Col xs={6} md={4}>
                <Link to="/search" className="btn link-to-search">Search</Link>
              </Col>
              <Col className="d-none d-md-block" md={4}></Col>
              <Col className="text-right" xs={6} md={4}>
                <Link to="/login" className="btn link-to-login">Sign Up/Log In</Link>
              </Col>
            </Row>
          </Container>

          <Row className="text p-3 mx-auto">
            <Col>
              <h2 className="text-center text-underline">Political Hack</h2>
              <h5 className="text-center">Use AI, Data and Community<br />To Break The Political Machine</h5>
            </Col>
          </Row>
        </section>

        <Container className="my-5">
          <Row>
            <Col><Link to="/" className="my-1 btn link-to-browse w-100">Browse</Link></Col>
            <Col><Link to="/politicians" className="my-1 btn link-to-politicians w-100">Politicians</Link></Col>
            <Col><Link to="/donors" className="my-1 btn link-to-donors w-100">Donors</Link></Col>
            <Col><Link to="/laws" className="my-1 btn link-to-laws w-100">Laws</Link></Col>
            <Col><Link to="/issues" className="my-1 btn link-to-issues w-100">Issues</Link></Col>
            <Col><Link to="/investigate" className="my-1 btn link-to-investigate w-100">Investigate</Link></Col>
            <Col><Link to="/blogs" className="my-1 btn link-to-blog w-100">Blogs</Link></Col>
            <Col><Link to="/about-us" className="my-1 btn link-to-aboutus w-100">About Us</Link></Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Header