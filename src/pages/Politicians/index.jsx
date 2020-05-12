import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { UserInfo, SampleVisualization } from '../../components'
import './style.scss'

class Politicians extends React.Component {
  render() {
    return (
      <Container fluid className="politicians-page">
        <Row>
          <Col className="my-5">
            <h1 className="text-center">Politicians</h1>
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12} lg={{ span: 3, offset: 1 }}>
                <UserInfo type="politicians" />
                <SampleVisualization height={350} bgColor="#303030" />
                <SampleVisualization height={350} bgColor="#270262" />
              </Col>

              <Col xs={12} lg={7}>
                <Row>
                  <Col xs={12} lg={8} className="xl-four-sevenths">
                    <SampleVisualization height={750} bgColor="#270262" blank={true} />
                  </Col>

                  <Col xs={12} lg={4} className="xl-three-sevenths">
                    <SampleVisualization height={350} bgColor="#303030" blank={true} />
                    <SampleVisualization height={350} bgColor="#270262" blank={true} />
                  </Col>

                  <Col xs={12}>
                    <SampleVisualization height={600} bgColor="#303030" blank={true} />
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