import React from 'react'
import { Container, Row, Col, Image, InputGroup, FormControl, Button } from 'react-bootstrap'
import medicationsImgSrc from '../../assets/images/medications.jpg'
import peopleImgSrc from '../../assets/images/people.jpg'
import unitedstatesImgSrc from '../../assets/images/united-states.png'
import lastsShirtImgSrc from '../../assets/images/the-last-shirt.jpg'

class Blogs extends React.Component {
  render() {
    return (
      <Container className="browse-page">
        <Row>
          <Col className="my-5">
            <h1 className="text-center">Recent Blog Entries:</h1>
            <p className="text-center">(These are not real stories, just examples of what will be on the finished site)</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Small pharmaceutical company linked to major donations to several PACs</h3>
            <br />
            <p>November 13th, 2019</p>
            <br />
            <p>A small pharmaceutical company "pseudo-ceuticals" has been shows to be the primary donor to many PACs that give to law makers who write laws on insurance policy.  On the politicalhack site you can lookup the donor "pseudo-ceuticals" and see who they donated to. And of the people and organizations they gave to, their larger donations went to...........Read More</p>
          </Col>

          <Col md={6}>
            <Image src={medicationsImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider" />

        <Row>
          <Col md={6}>
            <h3 className="text-underline">See which political races have a candidate with high approval rates but low budget</h3>
            <br />
            <p></p>
            <br />
            <p>These candidates sponsor bills in areas of the law that are out-dated, consistent with their campaign promises, BUT they total budget and number of donors are low. What do you consider before donating to a campaign? These campaigns are still  fighting the good fight while....... Read More</p>
          </Col>

          <Col md={6}>
            <Image src={peopleImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider" />

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Campaign "refunds" sent to many high ranking, non-elected government officials</h3>
            <br />
            <p>August 23rd, 2019</p>
            <br />
            <p>After reviewing "negative donations" in the data it came to the attention of one our citizen investigators that some of the recipients of those large "negative donations" are actually high ranking government officials who also have no record of giving money to any campaign. These officials were shown to be in.....Read More</p>
          </Col>

          <Col md={6}>
            <Image src={unitedstatesImgSrc} fluid />
          </Col>
        </Row>

        <hr className="divider" />

        <Row>
          <Col md={6}>
            <h3 className="text-underline">Campaign's clothing budget tied to foreign interests</h3>
            <br />
            <p>June 8th, 2019</p>
            <br />
            <p>A regular user of political hack alerted us to a local campaign's spending habits. The visualization of the campaigns expenses and donations show clothing usually being bought by the campaign after receiving donations from a previously unheard of PAC. After making some calls and reviewing they donations made to the PAC, it was........... Read More</p>
          </Col>

          <Col md={6}>
            <Image src={lastsShirtImgSrc} fluid />
          </Col>
        </Row>

      </Container>
    )
  }
}

export default Blogs;