import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { UserInfo } from '../../components'
import donorsImgSrc from '../../assets/images/donors-img.png'
import './style.scss'


class Donors extends React.Component {
  render() {
    return (
      <Container fluid className="donors-page">
        <Row>
          <Col className="text-center my-5" lg={{ span: 6, offset: 3 }}>
            <Image src={donorsImgSrc} fluid />
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12} lg={{ span: 3, offset: 1 }}>
                <UserInfo type="donors" />
                <div className="rounded feature-mockup-two bg-gray my-4" />
                <div className="rounded feature-mockup-six" />
              </Col>

              <Col xs={12} lg={7}>
                <Row>
                  <Col xs={12} lg={8} className="xl-four-sevenths">
                    <div className="rounded feature-mockup-one mb-4" />
                  </Col>

                  <Col xs={12} lg={4} className="xl-three-sevenths">
                    <div className="rounded feature-mockup-three bg-gray mb-4" />
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
      </Container>
    )
  }
}

export default Donors;