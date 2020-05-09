import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { UserInfo } from '../../components'
import politiciansImgSrc from '../../assets/images/politicians-img.png'
import './style.scss'

class Politicians extends React.Component {
  render() {
    return (
      <Container fluid className="politicians-page">
        <Row>
          <Col className="text-center my-5" lg={{ span: 6, offset: 3 }}>
            <Image className="w-100" src={politiciansImgSrc} />
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12} lg={3}>
                <UserInfo />
              </Col>
              <Col xs={12} lg={4}></Col>
              <Col xs={12} lg={3}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Politicians;