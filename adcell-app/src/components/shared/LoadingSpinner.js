import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    background: 'white',
    zIndex: '1000',
    opacity: '.5'
  },
  downArrow: {
    display: 'block',
    margin: '0 auto'
  },
});

class LoadingSpinner extends React.Component {
  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress className={classes.downArrow} />
      </div>
    )
  }
}

export default withStyles(styles)(LoadingSpinner);