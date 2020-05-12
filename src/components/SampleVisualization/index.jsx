import React from 'react'
import { connect } from 'react-redux'
import visualizationActions from '../../redux/visualization/action'
import './style.scss'

/*
  This is a Sample Visualization Component which shows data with d3
 */
class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // this.props.fetchData()
  }

  componentDidMount() {
  }

  render() {

    return (
      <div />
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