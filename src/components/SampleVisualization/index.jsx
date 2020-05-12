import React from 'react'
import { connect } from 'react-redux'
import visualizationActions from '../../redux/visualization/action'
import { Spinner } from 'react-bootstrap'
import './style.scss'


/*
  This is a Sample Visualization Component which shows data with d3
 */
class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)
    this.visRef = React.createRef()
    this.state = {
      visUpdated: false
    }
  }

  componentWillMount() {
    // this.props.fetchData()
  }

  updateVisualization() {
    const { visUpdated } = this.state
    const { candidates, bgColor } = this.props
    const { nodes, links } = candidates
    const { width, height } = {
      width: this.visRef.current.offsetWidth,
      height: this.visRef.current.offsetHeight,
    }

    if (!visUpdated && nodes.length) {
      const d3 = window.d3

      let svg = d3.select(this.visRef.current).append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", bgColor)

      let force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .start()

      let color = d3.scale.category20()
      let colors = d3.scale.category10()

      let link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        // .attr("class", "link")
        .style("stroke", function (d) { return colors(d.party) })
        .style("stroke-width", function (d) { return 4 })

      let node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        // .attr("class", "node")
        .call(force.drag)
      node.append("circle")
        .attr("r", "10")
        .style("stroke", "yellow")
        .style("fill", function (d) { return color(d.party) })
      node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d) { return d.name })
        .style("stroke", "white")

      force.on("tick", function () {
        link.attr("x1", function (d) { return d.source.x })
          .attr("y1", function (d) { return d.source.y })
          .attr("x2", function (d) { return d.target.x })
          .attr("y2", function (d) { return d.target.y })

        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" })
      })

      this.setState({ visUpdated: true })
    }
  }

  componentDidMount() {
    const { blank } = this.props

    if (!blank)
      this.updateVisualization()
  }

  componentDidUpdate() {
    const { blank } = this.props

    if (!blank)
      this.updateVisualization()
  }

  render() {
    const {
      height,
      bgColor,
      apiProcessing,
      blank
    } = this.props

    return (
      <div ref={this.visRef} className="vis-container mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: height, backgroundColor: bgColor }}>
        {
          apiProcessing && !blank ?
            <React.Fragment>
              <Spinner
                as="span"
                animation="grow"
                size="xl"
                role="status"
                aria-hidden="true"
              /> &nbsp; Loading . . .
            </React.Fragment>
            :
            <React.Fragment />
        }
        <span className="settings"><i class="fa fa-cog" aria-hidden="true"></i></span>
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