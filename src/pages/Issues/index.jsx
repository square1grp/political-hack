import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { UserInfo } from '../../components'


class Issues extends React.Component {
  render() {
    return (
      <Container fluid className="issues-page">
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12} lg={3}>
                    <UserInfo type="laws" />
                  </Col>

                  <Col xs={12} lg={9}>
                    <div className="rounded feature-mockup-four" />
                  </Col>
                </Row>
              </Col>

              <Col xs={12}>
                <Row>
                  <Col xs={12} lg={4}>
                    <div className="rounded feature-mockup-five bg-gray mb-4" />
                    <div className="rounded feature-mockup-six" />
                  </Col>

                  <Col xs={12} lg={8}>
                    <Row>
                      <Col xs={12} lg={6} className="mb-4">
                        <div className="rounded feature-mockup-three bg-gray" />
                      </Col>

                      <Col xs={12} lg={6} className="mb-4">
                        <div className="rounded feature-mockup-four" />
                      </Col>

                      <Col xs={12}>
                        <div className="rounded feature-mockup-five bg-gray" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Issues;