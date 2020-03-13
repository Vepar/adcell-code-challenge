import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../shared/LoadingSpinner';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import {Line as LineChart} from 'react-chartjs-2';
import moment from 'moment';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    padding: '40px'
  },
  chartPaper: {
    padding: '20px'
  },
  formControl: {
    width: '200px'
  },
  historicalSelectionsContainer: {
    marginBottom: '30px',
    marginTop: '30px'
  },
  growthContainer: {
    marginTop: '30px'
  },
  dayOverDayTitle: {
    fontSize: '8px'
  },
  greenColor: {
    color: 'green'
  }
});

class HistoricCampaignDetail extends React.Component {
  constructor() {
    super();

    const initialState = {
      histChartdata: [],
      loadComplete: true,
      productSelection: 'A',
      adSourceSelection: 'Amazon',
      dayOverDayGrowth: 0
    };

    this.state = {
      ...initialState
    };
  }

  componentDidMount() {
    this.loadHistoricalChartData();
  }

  async loadHistoricalChartData() {
    const historicalChartData = await axios.get(
      `${process.env.REACT_APP_API_BASE}/engagements/historical?product=${this.state.productSelection}&adSource=${this.state.adSourceSelection}`
    );

    const labels = [];
    const data = [];
    const length = historicalChartData.data.length;
    const dayOverDayGrowth = parseInt(historicalChartData.data[length-1].clicks)
    if(historicalChartData.data && historicalChartData.data.length) {
      historicalChartData.data.forEach(chartData => {
        labels.push(moment(chartData.date).format('MM-DD-YYYY') )
        data.push(chartData.total_clicks);
      })

      const hcdata = {
        labels,
        datasets: [{
          label: 'Total Clicks',
          data,
          borderColor: '#FF6E00',
          backgroundColor: '#ffa45e',
        }]
      }

      this.setState({
        histChartdata: hcdata,
        dayOverDayGrowth
      })
    }
  } 

  handleProductChange = e => {
    this.setState({
      productSelection: e.target.value,
    }, () => this.loadHistoricalChartData());
  };

  handleAdSourceChange = e => {
    this.setState({
      adSourceSelection: e.target.value,
    }, () => this.loadHistoricalChartData());
  };

  render() {
    const { 
      loadComplete,
      productSelection,
      adSourceSelection,
      histChartdata,
      dayOverDayGrowth
     } = this.state;
    const {
      classes,
      products,
      adSources
    } = this.props;

    return (
      <Paper className={classes.chartPaper}>
      <Typography variant='body1'>
        Historic Campaign Engagement
      </Typography>
      {!loadComplete && (
        <LoadingSpinner/>
      )}
      {loadComplete && (
        <div className={classes.historicalSelectionsContainer}>
          <Grid container direction='row' spacing={4}>
            <Grid item>
            <Typography>
              Product
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                value={productSelection}
                onChange={this.handleProductChange.bind(this)}
                labelWidth={'200px'}
              >
                {products.map(product => {
                  return (
                    <option value={product.name}>{product.name}</option>
                  )
                })}
              </Select>
            </FormControl>
            </Grid>
            <Grid item>
            <Typography>
              Ad Source
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                value={adSourceSelection}
                onChange={this.handleAdSourceChange.bind(this)}
                labelWidth={'200px'}
              >
                {adSources.map(adSource => {
                  return (
                    <option value={adSource.name}>{adSource.name}</option>
                  )
                })}
              </Select>
            </FormControl>
            </Grid>
            <Grid item align='center' justify='center'>
            <div className={classes.growthContainer}>
                <ArrowDropUpIcon className={classes.greenColor}/>
                <Typography display='inline' variant='h5' className={classes.greenColor}>
                  {dayOverDayGrowth}
                </Typography>
                <div>
                <Typography className={classes.dayOverDayTitle} align='right'>
                  day over day
                </Typography>
              </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      <LineChart data={histChartdata}
        options={
          {
          //   responsive: true,
          // aspectRatio: 3
        }
        }
        width="600" height="150"
        />
      </Paper>
    )
  }
}

HistoricCampaignDetail.propTypes = {
  products: PropTypes.array,
  adSources: PropTypes.array,
};

export default withStyles(styles)(HistoricCampaignDetail);