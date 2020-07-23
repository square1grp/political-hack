import React from "react"
import { Container, Row, Col, Dropdown, Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import "./style.scss"

class Search extends React.Component {
  constructor(props) {
    super(props)

    // states of the search page
    this.state = {
      searchType: "Find Politician",
      lawFormData: {},
      politicianFormData: {
        politicianType: "Democrat"
      }
    }
  }

  // find law form
  renderFindLawForm = () => (
    <Form onSubmit={this.submitForm}>
      <Form.Group controlId="title_or_number">
        <Form.Control type="text" placeholder="Title / Number" required />
      </Form.Group>

      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Started in:</Form.Label>
          </Col>

          <Col>
            <Form.Check custom type="checkbox" name="started_in" id="check_senate" label="Senate" />
          </Col>

          <Col>
            <Form.Check custom type="checkbox" name="started_in" id="check_house" label="House" />
          </Col>
        </Form.Row>
      </Form.Group>

      <Form.Group controlId="year_passed">
        <Form.Control type="text" placeholder="Year Passed" required />
      </Form.Group>

      <Form.Group controlId="committe">
        <Form.Control type="text" placeholder="Committe" required />
      </Form.Group>

      <Button id="submit" type="submit" className="w-100">Submit</Button>
    </Form>
  )

  // find politician form
  renderFindPoliticianForm = () => {
    const radios = ["Democrat", "Other", "Republician"]
    const { politicianFormData } = this.state

    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group controlId="name">
          <Form.Control type="text" placeholder="Name" required />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Control type="text" placeholder="State" required />
        </Form.Group>

        <Form.Group controlId="house-or-senate">
          <Form.Control type="text" placeholder="House / Senate" required />
        </Form.Group>

        <Form.Group>
          <ButtonGroup toggle id="politican-type">
            {radios.map((radio, idx) => (
              <ToggleButton key={idx} type="radio" name="radio"
                value={radio} checked={politicianFormData.politicianType === radio}
                onChange={e => {
                  politicianFormData.politicianType = e.target.value
                  this.setState({ politicianFormData })
                }}
              >
                {radio}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group controlId="federal_or_state">
          <Form.Control type="text" placeholder="Federal / State" required />
        </Form.Group>

        <Form.Group controlId="currently_in_office">
          <Form.Check custom type="checkbox" name="currently_in_office" label="Currently in office" />
        </Form.Group>

        <Button id="submit" type="submit" className="w-100">Submit</Button>
      </Form>
    )
  }

  // find donor form
  renderFindDonorForm = () => (
    <Form onSubmit={this.submitForm}>
      <Form.Group controlId="name">
        <Form.Control type="text" placeholder="Name" required />
      </Form.Group>

      <Form.Group controlId="industry">
        <Form.Control type="text" placeholder="Industry" required />
      </Form.Group>

      <Form.Group controlId="organization_type">
        <Form.Control type="text" placeholder="Organization Type" required />
      </Form.Group>

      <Form.Group controlId="state_of_hq">
        <Form.Control type="text" placeholder="State of HeadQuaters" required />
      </Form.Group>

      <Button id="submit" type="submit" className="w-100">Submit</Button>
    </Form>
  )

  // triggered when the form is submitted
  submitForm = (e) => {
    e.preventDefault()

    const { searchType } = this.state

    switch (searchType) {
      case "Find Donor":
        alert("This feature has been implemented yet.")
    }
  }

  // render a correct form based on the search type
  renderSearchForm = searchType => {
    switch (searchType) {
      case "Find Law":
      default:
        return this.renderFindLawForm()

      case "Find Politician":
        return this.renderFindPoliticianForm()

      case "Find Donor":
        return this.renderFindDonorForm()
    }
  }

  // render page
  render() {
    const { searchType } = this.state

    return (
      <Container className="search-page">
        <Row className="py-3 justify-content-md-center">
          <Col xs={12} md={8}>
            <Dropdown className="select-search-type">
              <Dropdown.Toggle className="w-100 p-3" id="search-type-btn">
                {searchType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="text-center" onClick={() => this.setState({ searchType: "Find Law" })}>Find Law</Dropdown.Item>
                <Dropdown.Item className="text-center" onClick={() => this.setState({ searchType: "Find Politician" })}>Find Politician</Dropdown.Item>
                <Dropdown.Item className="text-center" onClick={() => this.setState({ searchType: "Find Donor" })}>Find Donor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="py-3 justify-content-md-center">
          <Col xs={12} md={6} xl={4}>
            {this.renderSearchForm(searchType)}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Search