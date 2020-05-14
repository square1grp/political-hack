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
      isUpdated: false
    }
  }

  componentWillMount() {
    const { blank } = this.props

    if (!blank)
      this.props.fetchData(this.getUUID())
  }

  getUUID() {
    const { uuid } = this.state

    return uuid
  }

  parseDataToGraphData(rawData) {
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
    const rawData = visData[this.getUUID()]

    switch (visType) {
      case 'bar':
        break

      case 'line':
        break

      case 'scatter':
        break

      case 'graph':
      default:
        return this.parseDataToGraphData(rawData)
    }
  }

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
        .force('charge', d3.forceManyBody().strength(-2000))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(width / 2).strength(1))
        .force('y', d3.forceY(height / 2).strength(1))
        .force('link', d3.forceLink(links)
          .id((d) => { return d.id })
          .distance(50)
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

  componentDidUpdate() {
    const { blank } = this.props

    if (!blank)
      this.drawGraph()
  }

  render() {
    const {
      height,
      bgColor,
      apiProcessing,
      blank
    } = this.props

    return (
      <div ref={this.visRef} className='vis-container mb-4' style={{ minHeight: height, backgroundColor: bgColor }}>
        <svg width='100%' height={height} />
        {
          apiProcessing[this.getUUID()] && !blank ?
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
            <Dropdown.Item>Bar Chart</Dropdown.Item>
            <Dropdown.Item>Line Plot</Dropdown.Item>
            <Dropdown.Item>Scatter Plot</Dropdown.Item>
            <Dropdown.Item active>Graph</Dropdown.Item>
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