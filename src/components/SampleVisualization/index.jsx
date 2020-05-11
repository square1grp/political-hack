import React from 'react'
import * as d3 from 'd3';
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import visualizationActions from '../../redux/visualization/action'
import './style.scss'
import jsonData from '../../assets/json/sample.json'

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      className: 'd3-container-' + makeid(5)
    }
  }

  componentWillMount() {
    // this.props.fetchData()
  }

  componentDidMount() {
    let { width, height } = this.props

    if (!width) {
      width = 300
    }

    if (!height) {
      height = 300
    }

    const nodes = jsonData.nodes//.slice(0, 50)
    const links = jsonData.links//.slice(0, 50)

    const { className } = this.state
    console.log(className)
    let svg = d3.select('.' + className).append("svg")
      .attr("class", "w-100")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "black");

    var force = d3.layout.force()
      .gravity(.05)
      .distance(100)
      .charge(-100)
      .size([width, height])
      .nodes(nodes)
      .links(links)
      .start();

    let color = d3.scale.category20();
    let colors = d3.scale.category10();
    let link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke", function (d) { return colors(d.weight); })
      .style("stroke-width", function (d) { return 4; });

    let node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    node.append("circle")
      .attr("r", "10")
      .style("stroke", "yellow")
      .style("fill", function (d) { return color(d.group); });

    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function (d) { return d.group + ":   " + d.name; })
      .style("stroke", "white");

    force.on("tick", function () {
      link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  }

  render() {
    const { className } = this.state

    return (
      <div className={className} />
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.Visualization
});

const mapDispatchToProps = {
  ...visualizationActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleVisualization);