import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class AboutUs extends React.Component {
  render() {
    return (
      <Container className="about-us-page">
        <Row>
          <Col xs={12} lg={6}>
            <iframe title="survey monkey" width="100%" height="100%" frameborder="0" allowtransparency="true" src="https://www.surveymonkey.com/r/K9ZVQG5?embedded=1"></iframe>
          </Col>

          <Col xs={12} lg={6}>
            <h3>Our Vision</h3>
            <p>Political Hack will be a resource that turns every citizen into a well-informed, political watchdog capable of doing their own data-backed investigation. We will be a leader in data manipulation tools and frameworks designed for everyday people. Political Hack will also be known as an organization for holding officials accountable through transparency and citizen-focused oversight.</p>

            <br />

            <h3>Our Mission</h3>
            <p>To promote transparency and accountability in government by empowering citizens to interact with campaign finance and civic data through easy-to-use visual and analytic tools.</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AboutUs;