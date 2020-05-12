import React from 'react'
import { connect } from 'react-redux'
import visualizationActions from '../../redux/visualization/action'
import './style.scss'

import { Spinner } from 'react-bootstrap'

/*
  This is a Sample Visualization Component which shows data with d3
 */
class SampleVisualization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchData()
  }

  componentDidMount() {
  }

  render() {
    const {
      height,
      bgColor,
      apiProcessing
    } = this.props

    console.log(apiProcessing)

    return (
      <div className="mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: height, backgroundColor: bgColor }}>
        {
          apiProcessing ?
            <React.Fragment>
              <Spinner
                as="span"
                animation="grow"
                size="xl"
                role="status"
                aria-hidden="true"
              /> &nbsp; Loading . . .
            </React.Fragment> : <React.Fragment />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.Visualization,
  ...state.App
});

const mapDispatchToProps = {
  ...visualizationActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleVisualization);