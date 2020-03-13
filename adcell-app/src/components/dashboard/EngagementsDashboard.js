import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProductInsights from '../productInsights/ProductInsights';
import HistoricCampaignDetail from '../historicCampaignDetail/HistoricCampaignDetail';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MouseIcon from '@material-ui/icons/Mouse';
import CountUp from 'react-countup';
//d
const styles = theme => ({
  root: {
    padding: '40px'
  },
  chartPaper: {
    padding: '20px'
  },
  dashboardSection: {
    marginTop: '40px'
  },
  parent: {
    display: 'flex'
  },
  leftSection: {
    flex: 'none',
    width: '200px',
    padding: '1em'
  },
  rightSection: {
    padding: '1em'
  },
  statisticItem: {
    width: '100%',
    height: '100px',
    color: 'white',
    textAlign: 'center',
    paddingTop:'10px'
  },
  statisticItemContainerTop: {
    marginRight: '20px',
    marginBottom: '20px',
  },
  adSourcesStatItem: {
    backgroundColor: '#69B6CA'
  },
  adSourcesStatItem2: {
    backgroundColor: '#E79951'
  },
  productsStatItem: {
    backgroundColor: '#D74D45'
  },
  statisticItemContainerMiddle: {
    marginRight: '20px',
    marginBottom: '20px'
  },
  statisticItemContainerBottom: {
    marginRight: '20px',
  }
});

class EngagementsDashboard extends React.Component {
  constructor() {
    super();

    const initialState = {
      products: [],
      adSources: [],
      chartData: {},
      chartDataLoadComplete: false,
      chartColors: [
        '#FF6E00',
        '#F3B700',
        '#FAA300',
        '#F9AB55',
        '#F3B700',
      ]
    };

    this.state = {
      ...initialState
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  async loadInitialData() {
    const products = await axios.get(
      `${process.env.REACT_APP_API_BASE}/products`
    );

    const adSources = await axios.get(
      `${process.env.REACT_APP_API_BASE}/adSources`
    );

    this.loadChartData();

    this.setState({
      products: products.data,
      adSources: adSources.data
    })
  }

  async loadChartData() {
    const chartData = await axios.get(
      `${process.env.REACT_APP_API_BASE}/engagements/current`
    );

    // get total click count
    const totalClicks = this.getTotalClicks(chartData.data);

    this.setState({
      chartData: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        datasets: 
          chartData.data.map((chartData, index) => {
            return {
              label: chartData.sourceName,
              data: chartData.data,
              backgroundColor: this.state.chartColors[(index + 1) % 5]
            }
          })
      },
      chartDataLoadComplete: true,
      totalClicks
    })
  }

  getTotalClicks(clickData) {
    return clickData.reduce((a, b) => {return parseInt(a) +  parseInt(b.data.reduce((c, d) => {return parseInt(c) + parseInt(d)}), 0)}, 0);
  }
  
  render() {
    const { products, adSources, chartData, chartDataLoadComplete, totalClicks } = this.state;
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item container sm={3} xs={12}>
            <Grid item container direction='column'>
            <Grid item className={classes.statisticItemContainerTop}>
              <Paper className={`${classes.statisticItem} ${classes.adSourcesStatItem}`}>
                <Grid container direction='column'>
                  <Grid item>
                    <PeopleOutlineIcon/>
                  </Grid>
                  <Grid item>
                  <Typography variant='h4'>
                    <CountUp
                      end={adSources.length}
                      separator={','}
                      duration={1}
                    />
                  </Typography>
                  </Grid>
                  <Grid item>
                    Click Sources
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item className={classes.statisticItemContainerMiddle}>
              <Paper className={`${classes.statisticItem} ${classes.productsStatItem}`}>
              <Grid container direction='column'>
                  <Grid item>
                    <BusinessCenterIcon/>
                  </Grid>
                  <Grid item>
                  <Typography variant='h4'>
                    <CountUp
                      end={products.length}
                      separator={','}
                      duration={1}
                    />
                  </Typography>
                  </Grid>
                  <Grid item>
                    Product Campaigns
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item className={classes.statisticItemContainerBottom}>
              <Paper className={`${classes.statisticItem} ${classes.adSourcesStatItem2}`}>
              <Grid container direction='column'>
                <Grid item>
                    <MouseIcon/>
                  </Grid>
                  <Grid item>
                  <Typography variant='h4'>
                    <CountUp
                      end={
                        chartDataLoadComplete ? totalClicks : 0
                      }
                      separator={','}
                      duration={1}
                    />
                  </Typography>
                  </Grid>
                  <Grid item>
                    Total Clicks
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            </Grid>
          </Grid>
          <Grid item container sm={9} xs={12}>
            <ProductInsights chartData={chartData}/>
          </Grid>
        </Grid>
        <div className={classes.dashboardSection}>
          <HistoricCampaignDetail products={products} adSources={adSources}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(EngagementsDashboard);