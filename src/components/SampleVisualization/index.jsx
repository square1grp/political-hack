import React from 'react'
import { connect } from 'react-redux'
import visualizationActions from '../../redux/visualization/action'
import { Spinner, Dropdown } from 'react-bootstrap'
import './style.scss'
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'


/*
  This is a Sample Visualization Component which shows data with d3
 */
class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)
    this.visRef = React.createRef()
    this.state = {
      uuid: uuidv4(),
      isUpdated: false,
      visType: 'bar'
    }
  }

  componentWillMount() {
    // if (!this.isEmpty())
    //   this.props.fetchData(this.getUUID())
  }

  componentDidMount() {
    if (!this.isEmpty())
      this.startDraw()
  }

  componentDidUpdate() {
    if (!this.isEmpty())
      this.startDraw()
  }

  isEmpty() {
    return this.props.empty
  }

  getUUID() {
    return this.state.uuid
  }

  getVisType() {
    return this.state.visType
  }

  startDraw() {
    switch (this.getVisType()) {
      case 'bar':
        this.drawBarChart()
        break

      case 'line':
        this.drawLinePlot()
        break

      case 'scatter':
        this.drawScatterPlot()
        break

      case 'graph':
      default:
        this.drawGraph()
        break
    }
  }

  setVisType(type) {
    this.setState({ visType: type })
    this.resetSVG()
    this.startDraw()
  }

  resetSVG() {
    d3.select(this.visRef.current).selectAll('svg > *').remove()
    this.setState({ isUpdated: false })
  }

  parseRawDataToBarData(rawData) {
    let parsedData = {}

    rawData.forEach(candidate => {
      if (candidate.party in parsedData) {
        parsedData[candidate.party]['count'] += 1
      } else {
        parsedData[candidate.party] = {
          party: candidate.party,
          count: 1
        }
      }
    })

    return Object.values(parsedData)
  }

  parseRawDataToLineData(rawData) { }

  parseRawDataToScatterData() { }

  parseRawDataToGraphData(rawData) {
    if (!rawData)
      return { nodes: [], links: [] }

    const nodes = rawData.map((candidate, idx) => {
      return {
        id: this.getUUID() + '_' + idx,
        c_id: candidate['candidate_id'],
        name: candidate['name'],
        party: candidate['party'],
      }
    })

    let links = []
    let node_id_history = []
    for (let node_idx = 0; node_idx < nodes.length; node_idx++) {
      const c_node = nodes[node_idx]
      node_id_history.push(c_node['id'])

      const o_nodes = nodes.filter(node => {
        if (node_id_history.includes(node['id']))
          return false

        return node['party'] == c_node['party']
      })

      const _links = o_nodes.map(node => {
        return {
          source: c_node['id'],
          target: node['id']
        }
      })

      links = [...links, ..._links]
    }

    return { nodes, links }
  }

  getVisData(visType) {
    const { visData } = this.props
    // const rawData = visData[this.getUUID()]
    const rawData = [{ "name": "753, JO", "load_date": "2019-06-10T21:08:12+00:00", "office_full": "President", "district": "00", "has_raised_funds": false, "inactive_election_years": null, "active_through": 2020, "first_file_date": "2019-04-23", "election_years": [2020], "incumbent_challenge": "C", "candidate_id": "P00011569", "candidate_inactive": false, "party": "NNE", "state": "US", "principal_committees": [{ "name": "753 2020", "organization_type": null, "committee_id": "C00631770", "candidate_ids": ["P00011569"], "filing_frequency": "Q", "designation": "P", "first_file_date": "2017-01-25", "party": "DEM", "committee_type_full": "Presidential", "state": "IL", "last_f1_date": "2017-01-25", "party_full": "DEMOCRATIC PARTY", "cycles": [2018, 2020], "affiliated_committee_name": "NONE", "organization_type_full": null, "last_file_date": "2018-04-17", "committee_type": "P", "treasurer_name": "SEVENFIVETHREE, JO MR.", "designation_full": "Principal campaign committee" }], "party_full": "NONE", "election_districts": ["00"], "last_f2_date": "2019-04-23", "cycles": [2020], "office": "P", "last_file_date": "2019-04-23", "district_number": 0, "candidate_status": "N", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }, { "name": "AABBATTE, MICHAEL THOMAS WITORT", "load_date": "2002-04-12T00:00:00+00:00", "office_full": "President", "district": "00", "has_raised_funds": false, "inactive_election_years": null, "active_through": 2004, "first_file_date": "2002-01-30", "election_years": [2004], "incumbent_challenge": "C", "candidate_id": "P40002172", "candidate_inactive": false, "party": "IND", "state": "US", "principal_committees": [], "party_full": "INDEPENDENT", "election_districts": ["00"], "last_f2_date": "2002-01-30", "cycles": [2002, 2004], "office": "P", "last_file_date": "2002-01-30", "district_number": 0, "candidate_status": "N", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }, { "name": "AADLER, TIM", "load_date": "2020-05-05T21:11:57+00:00", "office_full": "House", "district": "03", "has_raised_funds": true, "inactive_election_years": null, "active_through": 2020, "first_file_date": "2020-03-24", "election_years": [2020], "incumbent_challenge": "C", "candidate_id": "H0UT03227", "candidate_inactive": false, "party": "REP", "state": "UT", "principal_committees": [{ "name": "TIM AALDERS FOR CONGRESS", "organization_type": null, "committee_id": "C00742866", "candidate_ids": ["H0UT03227"], "filing_frequency": "Q", "designation": "P", "first_file_date": "2020-03-24", "party": "REP", "committee_type_full": "House", "state": "UT", "last_f1_date": "2020-03-24", "party_full": "REPUBLICAN PARTY", "cycles": [2020], "affiliated_committee_name": "NONE", "organization_type_full": null, "last_file_date": "2020-04-20", "committee_type": "H", "treasurer_name": "PHILLIPS, CAMERON", "designation_full": "Principal campaign committee" }], "party_full": "REPUBLICAN PARTY", "election_districts": ["03"], "last_f2_date": "2020-03-24", "cycles": [2020], "office": "H", "last_file_date": "2020-03-24", "district_number": 3, "candidate_status": "C", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }, { "name": "AALDERS, TIM", "load_date": "2014-03-22T21:40:34+00:00", "office_full": "House", "district": "04", "has_raised_funds": false, "inactive_election_years": null, "active_through": 2014, "first_file_date": null, "election_years": [2014], "incumbent_challenge": "O", "candidate_id": "H4UT04052", "candidate_inactive": false, "party": "IAP", "state": "UT", "principal_committees": [], "party_full": "INDEPENDENT AMERICAN PARTY", "election_districts": ["04"], "last_f2_date": null, "cycles": [2014], "office": "H", "last_file_date": null, "district_number": 4, "candidate_status": "N", "federal_funds_flag": false, "incumbent_challenge_full": "Open seat" }, { "name": "AALDERS, TIMOTHY NOEL", "load_date": "2019-03-27T16:02:41+00:00", "office_full": "Senate", "district": "00", "has_raised_funds": true, "inactive_election_years": null, "active_through": 2018, "first_file_date": "2012-02-08", "election_years": [2012, 2018], "incumbent_challenge": "O", "candidate_id": "S2UT00229", "candidate_inactive": false, "party": "CON", "state": "UT", "principal_committees": [{ "name": "TIM AALDERS FOR US SENATE", "organization_type": null, "committee_id": "C00678300", "candidate_ids": ["S2UT00229"], "filing_frequency": "Q", "designation": "P", "first_file_date": "2018-05-04", "party": "CON", "committee_type_full": "Senate", "state": "UT", "last_f1_date": "2018-12-04", "party_full": "CONSTITUTION PARTY", "cycles": [2018, 2020], "affiliated_committee_name": "NONE", "organization_type_full": null, "last_file_date": "2020-04-30", "committee_type": "S", "treasurer_name": "AALDERS, TIM", "designation_full": "Principal campaign committee" }, { "name": "TIM AALDERS FOR SENATE", "organization_type": null, "committee_id": "C00512632", "candidate_ids": ["S2UT00229"], "filing_frequency": "A", "designation": "P", "first_file_date": "2012-02-08", "party": "REP", "committee_type_full": "Senate", "state": "UT", "last_f1_date": "2012-02-08", "party_full": "REPUBLICAN PARTY", "cycles": [2012, 2014, 2016], "affiliated_committee_name": null, "organization_type_full": null, "last_file_date": "2015-11-10", "committee_type": "S", "treasurer_name": "DWAYNE A VANCE", "designation_full": "Principal campaign committee" }], "party_full": "CONSTITUTION PARTY", "election_districts": ["00", "00"], "last_f2_date": "2018-04-23", "cycles": [2012, 2014, 2016, 2018, 2020], "office": "S", "last_file_date": "2018-04-23", "district_number": 0, "candidate_status": "P", "federal_funds_flag": false, "incumbent_challenge_full": "Open seat" }, { "name": "AALOORI, BANGAR REDDY", "load_date": "2020-03-18T21:13:37+00:00", "office_full": "House", "district": "22", "has_raised_funds": true, "inactive_election_years": null, "active_through": 2020, "first_file_date": "2019-10-17", "election_years": [2020], "incumbent_challenge": "O", "candidate_id": "H0TX22260", "candidate_inactive": false, "party": "REP", "state": "TX", "principal_committees": [{ "name": "BANGAR REDDY FOR CONGRESS", "organization_type": null, "committee_id": "C00723460", "candidate_ids": ["H0TX22260"], "filing_frequency": "Q", "designation": "P", "first_file_date": "2019-10-17", "party": "REP", "committee_type_full": "House", "state": "TX", "last_f1_date": "2019-10-17", "party_full": "REPUBLICAN PARTY", "cycles": [2020], "affiliated_committee_name": "NONE", "organization_type_full": null, "last_file_date": "2020-05-05", "committee_type": "H", "treasurer_name": "GUENLEY, JUSTIN", "designation_full": "Principal campaign committee" }], "party_full": "REPUBLICAN PARTY", "election_districts": ["22"], "last_f2_date": "2019-10-17", "cycles": [2020], "office": "H", "last_file_date": "2019-10-17", "district_number": 22, "candidate_status": "C", "federal_funds_flag": false, "incumbent_challenge_full": "Open seat" }, { "name": "AAMODT, NORMAN O.", "load_date": "2002-03-30T00:00:00+00:00", "office_full": "House", "district": "16", "has_raised_funds": true, "inactive_election_years": null, "active_through": 1978, "first_file_date": "1976-04-12", "election_years": [1976, 1978], "incumbent_challenge": null, "candidate_id": "H6PA16106", "candidate_inactive": false, "party": "REP", "state": "PA", "principal_committees": [{ "name": "AAMODT FOR CONGRESS", "organization_type": null, "committee_id": "C00090498", "candidate_ids": ["H6PA16106"], "filing_frequency": "T", "designation": "P", "first_file_date": "1978-03-22", "party": "REP", "committee_type_full": "House", "state": "PA", "last_f1_date": "1978-06-13", "party_full": "REPUBLICAN PARTY", "cycles": [1978, 1980], "affiliated_committee_name": null, "organization_type_full": null, "last_file_date": "1979-04-06", "committee_type": "H", "treasurer_name": "CHARLES SHUMARD", "designation_full": "Principal campaign committee" }], "party_full": "REPUBLICAN PARTY", "election_districts": ["16", "16"], "last_f2_date": "1978-07-05", "cycles": [1976, 1978, 1980], "office": "H", "last_file_date": "1978-07-05", "district_number": 16, "candidate_status": "P", "federal_funds_flag": false, "incumbent_challenge_full": null }, { "name": "AANESTAD, SAMUEL", "load_date": "2013-04-26T09:04:30+00:00", "office_full": "House", "district": "01", "has_raised_funds": true, "inactive_election_years": null, "active_through": 2012, "first_file_date": "2012-02-22", "election_years": [2012], "incumbent_challenge": "C", "candidate_id": "H2CA01110", "candidate_inactive": false, "party": "REP", "state": "CA", "principal_committees": [{ "name": "SAM AANESTAD FOR CONGRESS COMMITTEE", "organization_type": null, "committee_id": "C00513580", "candidate_ids": ["H2CA01110"], "filing_frequency": "A", "designation": "P", "first_file_date": "2012-02-22", "party": "REP", "committee_type_full": "House", "state": "CA", "last_f1_date": "2014-07-18", "party_full": "REPUBLICAN PARTY", "cycles": [2012, 2014, 2016], "affiliated_committee_name": null, "organization_type_full": null, "last_file_date": "2015-12-16", "committee_type": "H", "treasurer_name": "SAM AANESTAD", "designation_full": "Principal campaign committee" }], "party_full": "REPUBLICAN PARTY", "election_districts": ["01"], "last_f2_date": "2012-02-22", "cycles": [2012, 2014, 2016], "office": "H", "last_file_date": "2012-02-22", "district_number": 1, "candidate_status": "P", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }, { "name": "AARESTAD, DAVID", "load_date": "2017-08-01T20:57:28+00:00", "office_full": "House", "district": "06", "has_raised_funds": true, "inactive_election_years": null, "active_through": 2018, "first_file_date": "2017-04-26", "election_years": [2018], "incumbent_challenge": "C", "candidate_id": "H8CO06237", "candidate_inactive": false, "party": "DEM", "state": "CO", "principal_committees": [{ "name": "COLORADANS FOR AARESTAD", "organization_type": null, "committee_id": "C00637678", "candidate_ids": ["H8CO06237"], "filing_frequency": "T", "designation": "P", "first_file_date": "2017-04-14", "party": "DEM", "committee_type_full": "House", "state": "CO", "last_f1_date": "2017-09-01", "party_full": "DEMOCRATIC PARTY", "cycles": [2018], "affiliated_committee_name": "NONE", "organization_type_full": null, "last_file_date": "2019-01-30", "committee_type": "H", "treasurer_name": "PHILLIPS, JOHN", "designation_full": "Principal campaign committee" }], "party_full": "DEMOCRATIC PARTY", "election_districts": ["06"], "last_f2_date": "2017-04-26", "cycles": [2018], "office": "H", "last_file_date": "2017-04-26", "district_number": 6, "candidate_status": "C", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }, { "name": "AAROE, KEN", "load_date": "2002-04-03T00:00:00+00:00", "office_full": "House", "district": "18", "has_raised_funds": false, "inactive_election_years": null, "active_through": 1998, "first_file_date": null, "election_years": [1998], "incumbent_challenge": "C", "candidate_id": "H8CA18053", "candidate_inactive": false, "party": "LIB", "state": "CA", "principal_committees": [], "party_full": "LIBERTARIAN PARTY", "election_districts": ["18"], "last_f2_date": null, "cycles": [1998], "office": "H", "last_file_date": null, "district_number": 18, "candidate_status": "N", "federal_funds_flag": false, "incumbent_challenge_full": "Challenger" }]

    switch (visType) {
      case 'bar':
        return this.parseRawDataToBarData(rawData)

      case 'line':
        return this.parseRawDataToLineData(rawData)

      case 'scatter':
        return this.parseRawDataToScatterData(rawData)

      case 'graph':
      default:
        return this.parseRawDataToGraphData(rawData)
    }
  }

  drawBarChart() {
    const { isUpdated } = this.state
    const data = this.getVisData('bar')
    const margin = { top: 50, right: 50, bottom: 80, left: 50 }
    const { width, height } = {
      width: this.visRef.current.offsetWidth,
      height: this.visRef.current.offsetHeight,
    }

    if (!isUpdated && data.length) {
      let svg = d3.select(this.visRef.current).select('svg')
        .attr("viewBox", [0, 0, width, height]);

      let x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

      let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([height - margin.bottom, margin.top])

      let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
          .tickFormat(i => data[i].party)
          .tickSizeOuter(0))

      let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y)
          .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
          .tickFormat(d3.format("d")))
        .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y))

      svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.count))
        .attr("height", d => y(0) - y(d.count))
        .attr("width", x.bandwidth());

      svg.append("g")
        .call(xAxis);

      svg.append("g")
        .call(yAxis);

      this.setState({ isUpdated: true })
    }
  }

  drawLinePlot() { }

  drawScatterPlot() { }

  drawGraph() {
    const { isUpdated } = this.state
    const { nodes, links } = this.getVisData('graph')
    const { width, height } = {
      width: this.visRef.current.offsetWidth,
      height: this.visRef.current.offsetHeight,
    }

    if (!isUpdated && nodes.length) {
      let svg = d3.select(this.visRef.current).select('svg')
      let colors = d3.scaleOrdinal(d3.schemeCategory10)

      let graphLayout = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-3000))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(width / 2).strength(1))
        .force('y', d3.forceY(height / 2).strength(1))
        .force('link', d3.forceLink(links)
          .id((d) => { return d.id })
          .distance(100)
          .strength(1))

      let link = svg.selectAll('link')
        .data(links)
        .enter().append('line')
        .style('stroke', (d) => { return colors(d.weight) })
        .style('stroke-width', 2)

      let node = svg.selectAll('node')
        .data(nodes)
        .enter().append('g')
        .call(d3.drag)

      node.append('circle')
        .attr('r', 8)
        .style('fill', (d) => { return colors(d.party) })

      node.append('text')
        .attr('dx', 10)
        .attr('dy', '.35em')
        .text((d) => { return d.party + ':   ' + d.name })
        .style('fill', 'white')

      node.call(
        d3.drag()
          .on('start', (d) => {
            d3.event.sourceEvent.stopPropagation()
            if (!d3.event.active) graphLayout.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (d) => {
            d.fx = d3.event.x
            d.fy = d3.event.y
          })
          .on('end', (d) => {
            if (!d3.event.active) graphLayout.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

      graphLayout.on('tick', () => {
        link
          .attr('x1', (d) => { return d.source.x })
          .attr('y1', (d) => { return d.source.y })
          .attr('x2', (d) => { return d.target.x })
          .attr('y2', (d) => { return d.target.y })

        node
          .attr('transform', (d) => { return 'translate(' + d.x + ',' + d.y + ')' })
      })

      this.setState({ isUpdated: true })
    }
  }

  render() {
    const { visType } = this.state
    const {
      height,
      bgColor,
      apiProcessing
    } = this.props

    return (
      <div ref={this.visRef} className='vis-container mb-4' style={{ minHeight: height, backgroundColor: bgColor }}>
        <svg width='100%' height={height} />
        {
          apiProcessing[this.getUUID()] && !this.isEmpty() ?
            <div className='loading-container d-flex justify-content-center align-items-center'>
              <Spinner
                as='span'
                animation='grow'
                size='xl'
                role='status'
                aria-hidden='true'
              />
            </div>
            : <React.Fragment />
        }
        <Dropdown className='settings'>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            <i className='fa fa-cog' aria-hidden='true'></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item active={visType == 'bar'} onClick={() => this.setVisType('bar')}>Bar Chart</Dropdown.Item>
            <Dropdown.Item active={visType == 'line'} onClick={() => this.setVisType('line')}>Line Plot</Dropdown.Item>
            <Dropdown.Item active={visType == 'scatter'} onClick={() => this.setVisType('scatter')}>Scatter Plot</Dropdown.Item>
            <Dropdown.Item active={visType == 'graph'} onClick={() => this.setVisType('graph')}>Graph</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.Visualization,
  ...state.App
})

const mapDispatchToProps = {
  ...visualizationActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleVisualization)