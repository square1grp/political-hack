import React from 'react'
import { Container, Row, Col, Image, InputGroup, FormControl, Button } from 'react-bootstrap'
import pepleImgSrc from '../../assets/images/people.jpg'
import bankImgSrc from '../../assets/images/bank.jpg'
import lawImgSrc from '../../assets/images/law.jpg'

import './style.scss'

class HomePage extends React.Component {
  render() {
    return (
      <Container className="browse-page">
        <Row>
          <Col className="my-5">
            <h2 className="text-center">A few things you can expect to get out of "Political Hack"</h2>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Find out how your money is being used by campaigns and non-profits</h3>
            <br />
            <p>See top level items and services used by campaigns and even PACs</p>
          </Col>

          <Col md={6}>
            <Image src={pepleImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider" />

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Investigate financial ties to powerful groups</h3>
            <br />
            <p>You will be able to research financial ties between your representatives, PACs and corporations. And you can use AI to create alerts and automated searches for patterns.</p>
          </Col>

          <Col md={6}>
            <Image src={bankImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider" />

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Learn more about how money impacts laws and politics</h3>
            <br />
            <p>See what financial factors influence passage of ballots into laws and candidate races for offices</p>
          </Col>

          <Col md={6}>
            <Image src={lawImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider bg-transparent" />

        <Row>
          <Col className="mb-3">
            <h3>Search for politicians, laws, PACs, issues, etc:</h3>
          </Col>

          <Col lg={{ span: 4, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl placeholder="Enter text here..." />
              <InputGroup.Append>
                <Button className="btn-search">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <hr className="divider bg-transparent" />
      </Container>
    )
  }
}

export default HomePage;