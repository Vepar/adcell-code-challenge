import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = theme => ({
  chartPaper: {
    padding: '20px',
    width: '100%'
  }
});

class ProductInsights extends React.Component {
  constructor() {
    super();

    const initialState = {
      loadComplete: true
    };

    this.state = {
      ...initialState
    };
  }
  
  render() {
    const { loadComplete } = this.state;
    const {
      classes,
      chartData
    } = this.props;

    const options = {
      scales: {
           xAxes: [{
               stacked: true
           }],
           yAxes: [{
               stacked: true
           }]
       }
   }

    return (
      <Paper className={classes.chartPaper}>
        <Typography variant='body1'>
          Product Campaign Insights
        </Typography>
        {!loadComplete && (
          <LoadingSpinner/>
        )}
        {loadComplete && (
          <Bar  data={chartData} options={options} width="600" height="200"/>
        )}
      </Paper>
    )
  }
}

ProductInsights.propTypes = {
  chartData: PropTypes.object,
};

export default withStyles(styles)(ProductInsights);