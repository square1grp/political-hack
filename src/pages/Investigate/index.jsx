import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

class Investigate extends React.Component {
  render() {
    return (
      <Container fluid className="investigate-page">
        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={3}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
          <Col xs={12} lg={4}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
          <Col xs={12} lg={3}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
        </Row>

        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={10}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
        </Row>

        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={3}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
          <Col xs={12} lg={7}>
            <div className="rounded feature-mockup-four mb-4" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Investigate;