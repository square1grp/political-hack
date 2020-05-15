import React from 'react'
import { connect } from 'react-redux'
import visualizationActions from '../../redux/visualization/action'
import { Spinner, Dropdown } from 'react-bootstrap'
import './style.scss'
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'
import rawData from '../../assets/json/sample.json'


/**
  This is a Sample Visualization Component which shows data with d3
 */
class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)
    this.visRef = React.createRef()
    this.state = {
      uuid: uuidv4(), // create uuid for component. this is unique component id
      isUpdated: false, // flag to update the component
      visType: 'graph' // default visualization type: bar, line, scatter, graph
    }
  }

  componentWillMount() {
    // if (!this.isEmpty())
    //   this.props.fetchData(this.getUUID()) // fetch visualization data via api
  }

  componentDidMount() {
    if (!this.isEmpty())
      this.startDraw()
  }

  componentDidUpdate() {
    if (!this.isEmpty())
      this.startDraw() // draw the component after api call is finished
  }

  // check if component is a mockup
  isEmpty() {
    return this.props.empty
  }

  // get componet uuid
  getUUID() {
    return this.state.uuid
  }

  // get component type
  getVisType() {
    return this.state.visType
  }

  // set component type
  setVisType(type) {
    this.setState({ visType: type })
    this.resetSVG()
    this.startDraw()
  }

  // start drawing visualization
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

  // clear svg for updating visualization
  resetSVG() {
    d3.select(this.visRef.current).selectAll('svg > *').remove()
    this.setState({ isUpdated: false })
  }

  // parse fetched data for bar chart
  parseRawDataToBarData(rawData) {
    if (!rawData)
      return []

    let parsedData = {}

    // main part for a conversion
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

  // parse fetched data for line chart
  parseRawDataToLineData(rawData) {
    if (!rawData)
      return []

    let parsedData = {}

    // main part for a conversion
    rawData.forEach(candidate => {
      candidate.election_years.forEach(election_year => {
        if (election_year in parsedData) {
          parsedData[election_year]['count'] += 1
        } else {
          parsedData[election_year] = {
            election_year: election_year,
            count: 1
          }
        }
      })
    })

    return Object.values(parsedData)
  }

  // parse fetched data for scatter plot
  parseRawDataToScatterData() {
    if (!rawData)
      return []

    let parsedData = {}

    // main part for a conversion
    rawData.forEach(candidate => {
      candidate.election_years.forEach(election_year => {
        if (election_year in parsedData) {
          parsedData[election_year]['count'] += 1
        } else {
          parsedData[election_year] = {
            election_year: election_year,
            count: 1
          }
        }
      })
    })

    return Object.values(parsedData)
  }

  // parse fetched data for graph
  parseRawDataToGraphData(rawData) {
    if (!rawData)
      return { nodes: [], links: [] }

    // create nodes
    const nodes = rawData.map((candidate, idx) => {
      return {
        id: this.getUUID() + '_' + idx,
        c_id: candidate['candidate_id'],
        name: candidate['name'],
        party: candidate['party'],
      }
    })

    // create links
    let links = []
    let node_id_history = []
    for (let node_idx = 0; node_idx < nodes.length; node_idx++) {
      const c_node = nodes[node_idx]
      node_id_history.push(c_node['id'])

      const o_nodes = nodes.filter(node => {
        if (node_id_history.includes(node['id']))
          return false

        return node['party'] === c_node['party']
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

  // get visualization data (return parsed data)
  getVisData(visType) {
    const { visData } = this.props
    const rawData = visData[this.getUUID()]

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

  // draw bar chart
  drawBarChart() {
    const { isUpdated } = this.state
    const data = this.getVisData('bar')
    const margin = { top: 50, right: 50, bottom: 80, left: 50 }
    const { width, height } = {
      width: this.visRef.current.offsetWidth,
      height: this.visRef.current.offsetHeight,
    }

    if (!isUpdated && data.length) {
      // init svg for bar chart
      let svg = d3.select(this.visRef.current).select('svg')
        .attr('viewBox', [0, 0, width, height]);

      // x values for ticks
      let x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

      // y values for ticks
      let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([height - margin.bottom, margin.top])

      // x-axis
      let xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
          .tickFormat(i => data[i].party)
          .tickSizeOuter(0))

      // y-axis
      let yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y)
          .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
          .tickFormat(d3.format('d')))
        .call(g => g.append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(data.y))

      // add bars
      svg.append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d.count))
        .attr('height', d => y(0) - y(d.count))
        .attr('width', x.bandwidth());

      // add x-axis
      svg.append('g')
        .call(xAxis);

      // add y-axis
      svg.append('g')
        .call(yAxis);

      this.setState({ isUpdated: true })
    }
  }

  // draw line plot
  drawLinePlot() {
    const { isUpdated } = this.state
    const data = this.getVisData('line')
    const margin = { top: 50, right: 50, bottom: 80, left: 50 }
    const { width, height } = {
      width: this.visRef.current.offsetWidth - 100,
      height: this.visRef.current.offsetHeight - 130,
    }

    if (!isUpdated && data.length) {
      // init svg for line plot
      let svg = d3.select(this.visRef.current).select('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      // Add X axis --> it is a date format
      let x = d3.scaleLinear()
        .domain(d3.extent(data, (d) => { return d.election_year; }))
        .range([0, width]);

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).tickFormat(d3.format('')));

      // Add Y axis
      let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => { return +d.count; })])
        .range([height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y)
          .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
          .tickFormat(d3.format('d')));

      // Add the line
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
          .x((d) => { return x(d.election_year) })
          .y((d) => { return y(d.count) })
        )

      this.setState({ isUpdated: true })
    }
  }

  // draw scatter plot
  drawScatterPlot() {
    const { isUpdated } = this.state
    const data = this.getVisData('line')
    const margin = { top: 50, right: 50, bottom: 80, left: 50 }
    const { width, height } = {
      width: this.visRef.current.offsetWidth - 100,
      height: this.visRef.current.offsetHeight - 130,
    }

    if (!isUpdated && data.length) {
      // init svg container for scatter
      let svg = d3.select(this.visRef.current).select('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      // Add X axis --> it is a date format
      let x = d3.scaleLinear()
        .domain(d3.extent(data, (d) => { return d.election_year; }))
        .range([0, width]);

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).tickFormat(d3.format('')));

      // Add Y axis
      let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => { return +d.count; })])
        .range([height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y)
          .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
          .tickFormat(d3.format('d')));

      // Add the line
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
          .x((d) => { return x(d.election_year) })
          .y((d) => { return y(d.count) })
        )

      // Add the points
      svg
        .append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => { return x(d.election_year) })
        .attr('cy', (d) => { return y(d.count) })
        .attr('r', 5)
        .attr('fill', '#69b3a2')

      this.setState({ isUpdated: true })
    }
  }

  // draw graph (force layout)
  drawGraph() {
    const { isUpdated } = this.state
    const { nodes, links } = this.getVisData('graph')
    const { width, height } = {
      width: this.visRef.current.offsetWidth,
      height: this.visRef.current.offsetHeight,
    }

    if (!isUpdated && nodes.length) {
      // svg container
      let svg = d3.select(this.visRef.current).select('svg')
      // colors for nodes & links
      let colors = d3.scaleOrdinal(d3.schemeCategory10)

      // create force-simulation
      let graphLayout = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-3000))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(width / 2).strength(1))
        .force('y', d3.forceY(height / 2).strength(1))
        .force('link', d3.forceLink(links)
          .id((d) => { return d.id })
          .distance(100)
          .strength(1))

      // link elements
      let link = svg.selectAll('link')
        .data(links)
        .enter().append('line')
        .style('stroke', (d) => { return colors(d.weight) })
        .style('stroke-width', 2)

      // node elements
      let node = svg.selectAll('node')
        .data(nodes)
        .enter().append('g')
        .call(d3.drag)

      node.append('circle')
        .attr('r', 8)
        .style('fill', (d) => { return colors(d.party) })

      // add node labels
      node.append('text')
        .attr('dx', 10)
        .attr('dy', '.35em')
        .text((d) => { return d.party + ':   ' + d.name })
        .style('fill', 'white')

      // add action for drag and drop
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
            <Dropdown.Item active={visType === 'bar'} onClick={() => this.setVisType('bar')}>Bar Chart</Dropdown.Item>
            <Dropdown.Item active={visType === 'line'} onClick={() => this.setVisType('line')}>Line Plot</Dropdown.Item>
            <Dropdown.Item active={visType === 'scatter'} onClick={() => this.setVisType('scatter')}>Scatter Plot</Dropdown.Item>
            <Dropdown.Item active={visType === 'graph'} onClick={() => this.setVisType('graph')}>Graph</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

// integrate redux-state to props
const mapStateToProps = (state) => ({
  ...state.Visualization,
  ...state.App
})

// integrate redux-actions to props
const mapDispatchToProps = {
  ...visualizationActions
}

// create visualization component integrated with redux-saga
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleVisualization)