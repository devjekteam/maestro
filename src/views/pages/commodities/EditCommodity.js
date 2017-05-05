import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as commoditiesActions from '../../../reducers/commodities/actions';


class EditCommodity extends Component {
  componentWillMount() {
    this.props.dispatch(commoditiesActions.loadCommodity(this.props.params.id));
  }

  render() {
    console.log(this.props.commodities);
    return (
      <p>{this.props.params.id}</p>
    )
  }
}

function mapStateToProps(state) {
  return {
      commodities: state.commodities,
  };
}

export default connect(mapStateToProps)(EditCommodity);
