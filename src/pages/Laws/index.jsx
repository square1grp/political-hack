import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { UserInfo, SampleVisualization } from '../../components'


class Laws extends React.Component {
  render() {
    return (
      <Container fluid className="laws-page">
        <Row>
          <Col className="my-5">
            <h1 className="text-center">Laws</h1>
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12} lg={3}>
                    <UserInfo type="laws" />
                  </Col>

                  <Col xs={12} lg={9}>
                    <SampleVisualization height={400} bgColor="#270262" blank={true} />
                  </Col>
                </Row>
              </Col>

              <Col xs={12}>
                <Row>
                  <Col xs={12} lg={4}>
                    <SampleVisualization height={450} bgColor="#303030" blank={true} />
                    <SampleVisualization height={350} bgColor="#270262" blank={true} />
                  </Col>

                  <Col xs={12} lg={8}>
                    <Row>
                      <Col xs={12} lg={6} className="mb-4">
                        <SampleVisualization height={350} bgColor="#303030" blank={true} />
                      </Col>

                      <Col xs={12} lg={6} className="mb-4">
                        <SampleVisualization height={350} bgColor="#270262" blank={true} />
                      </Col>

                      <Col xs={12}>
                        <SampleVisualization height={450} bgColor="#303030" blank={true} />
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

export default Laws;