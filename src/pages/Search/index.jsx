import React from "react"
import { Container, Row, Col, Dropdown, Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import "./style.scss"
import { PoliticiansVisualization } from '../../components'

// default form data for state
const defaultFormData = {
  lawFormData: {
    titleOrNumber: "",
    startedIn: "",
    yearPassed: "",
    committe: ""
  },
  politicianFormData: {
    name: "",
    state: "",
    houseSenate: "",
    party: "DEM",
    federalState: "",
    currentlyInOffice: false
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props)

    // states of the search page
    this.state = {
      loading: false,
      searchType: "Find Law",
      searchResults: [],
      ...defaultFormData
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
    const parties = {
      "DEM": "Democratic",
      "OTH": "Other",
      "REP": "Republician"
    }
    const { politicianFormData } = this.state

    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group controlId="name">
          <Form.Control type="text" placeholder="Name" required value={politicianFormData.name}
            onChange={e => {
              politicianFormData.name = e.target.value
              this.setState({ politicianFormData })
            }}
          />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Control type="text" placeholder="State" required value={politicianFormData.state}
            onChange={e => {
              politicianFormData.state = e.target.value
              this.setState({ politicianFormData })
            }}
          />
        </Form.Group>

        <Form.Group controlId="house-or-senate">
          <Form.Control type="text" placeholder="House / Senate" required value={politicianFormData.houseSenate}
            onChange={e => {
              politicianFormData.houseSenate = e.target.value
              this.setState({ politicianFormData })
            }}
          />
        </Form.Group>

        <Form.Group>
          <ButtonGroup toggle id="politican-type">
            {Object.keys(parties).map((party, idx) => (
              <ToggleButton key={idx} type="radio" name="radio"
                value={party} checked={politicianFormData.party === party}
                onChange={e => {
                  politicianFormData.party = e.target.value
                  this.setState({ politicianFormData })
                }}
              >
                {parties[party]}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group controlId="federal_or_state">
          <Form.Control type="text" placeholder="Federal / State" required value={politicianFormData.federalState}
            onChange={e => {
              politicianFormData.federalState = e.target.value
              this.setState({ politicianFormData })
            }} />
        </Form.Group>

        <Form.Group controlId="currently_in_office">
          <Form.Check custom type="checkbox" name="currently_in_office" label="Currently in office" checked={politicianFormData.currentlyInOffice}
            onChange={e => {
              politicianFormData.currentlyInOffice = !politicianFormData.currentlyInOffice
              this.setState({ politicianFormData })
            }} />
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

    const { searchType, politicianFormData } = this.state
    let res_status = null

    switch (searchType) {
      case "Find Donor":
        alert("This feature has been implemented yet.")
        break

      case "Find Politician":
        const isActiveCandidate = politicianFormData.currentlyInOffice ? { is_active_candidate: true } : {}

        const params = {
          name: politicianFormData.name,
          state: politicianFormData.state,
          party: politicianFormData.party,
          ...isActiveCandidate
        }

        this.setState({ loading: true })

        new Promise(
          (resolve) => fetch(process.env.REACT_APP_API_ENDPOINT + '/candidates/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
          }).then(res => {
            res_status = res.status
            if (res.status !== 200)
              resolve(res.text())
            else
              resolve(res.json())
          })
        ).then(response => {
          this.setState({ searchResults: [] })

          if (res_status === 200) {
            this.setState({ searchResults: response })
          } else {
            alert("Unknown issue")
          }

          this.setState({ loading: false })
        })

        break

      default:
        break
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
    const { searchType, searchResults, loading } = this.state

    return (
      <Container className="search-page">
        <Row className="py-3 justify-content-md-center">
          <Col xs={12} md={8}>
            <Dropdown className="select-search-type">
              <Dropdown.Toggle className="w-100 p-3" id="search-type-btn">
                {searchType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="text-center"
                  onClick={() => this.setState({ searchType: "Find Law", ...defaultFormData })}
                >Find Law</Dropdown.Item>

                <Dropdown.Item className="text-center"
                  onClick={() => this.setState({ searchType: "Find Politician", ...defaultFormData })}
                >Find Politician</Dropdown.Item>

                <Dropdown.Item className="text-center"
                  onClick={() => this.setState({ searchType: "Find Donor", ...defaultFormData })}
                >Find Donor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="py-3 justify-content-md-center">
          <Col xs={12} md={6} xl={4}>
            {this.renderSearchForm(searchType)}
          </Col>
        </Row>

        {searchResults.length ? (
          <Row>
            <Col>
              <PoliticiansVisualization loading={loading} visData={searchResults} height={500} bgColor="#270262" title="Politican Search Results" />
            </Col>
          </Row>
        ) : null}

      </Container>
    )
  }
}

export default Search