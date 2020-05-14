import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { SampleVisualization } from '../../components'
import './style.scss'

class Investigate extends React.Component {
  render() {
    return (
      <Container fluid className="investigate-page">
        <Row>
          <Col className="my-5">
            <h1 className="text-center">Investigate</h1>
          </Col>
        </Row>

        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={3}>
            <SampleVisualization height={350} bgColor="#270262" empty={true} />
          </Col>
          <Col xs={12} lg={4}>
            <SampleVisualization height={350} bgColor="#303030" empty={true} />
          </Col>
          <Col xs={12} lg={3}>
            <SampleVisualization height={350} bgColor="#270262" empty={true} />
          </Col>
        </Row>

        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={10}>
            <div className="filter-options mb-4 py-3 rounded">
              <h3 className="text-center my-0">Filters</h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="d-none d-lg-block" lg={1}></Col>
          <Col xs={12} lg={3}>
            <SampleVisualization height={600} bgColor="#303030" empty={true} />
          </Col>
          <Col xs={12} lg={7}>
            <SampleVisualization height={500} bgColor="#270262" empty={true} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Investigate;