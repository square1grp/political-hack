import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { UserInfo, SampleVisualization } from '../../components'
import politiciansImgSrc from '../../assets/images/politicians-img.png'
import './style.scss'

class Politicians extends React.Component {
  render() {
    return (
      <Container fluid className="politicians-page">
        <Row>
          <Col className="text-center my-5" lg={{ span: 6, offset: 3 }}>
            <Image src={politiciansImgSrc} fluid />
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12} lg={{ span: 3, offset: 1 }}>
                <UserInfo type="politicians" />
                <div className="rounded feature-mockup-two bg-gray mb-4" />
                <div className="rounded feature-mockup-six mb-4" />
                {/* <SampleVisualization height={350} />
                <SampleVisualization height={350} /> */}
              </Col>

              <Col xs={12} lg={7}>
                <Row>
                  <Col xs={12} lg={8} className="xl-four-sevenths">
                    <div className="rounded feature-mockup-one mb-4" />
                    {/* <SampleVisualization height={750} /> */}
                  </Col>

                  <Col xs={12} lg={4} className="xl-three-sevenths">
                    <div className="rounded feature-mockup-three bg-gray mb-4" />
                    <div className="rounded feature-mockup-four mb-4" />
                    {/* <SampleVisualization height={350} />
                    <SampleVisualization height={350} /> */}
                  </Col>

                  <Col xs={12}>
                    <div className="rounded feature-mockup-five bg-gray mb-4" />
                    {/* <SampleVisualization height={500} /> */}
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

export default Politicians;