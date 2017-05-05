import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    Card, CardBlock
} from 'reactstrap';
import {Table, Th, Thead} from 'reactable';

import * as commoditiesActions from '../../../reducers/commodities/actions';


class CommoditiesPage extends Component {
  componentWillMount() {
    this.props.loadCommodities();
  }

  render() {
    if (!this.props.commodities || !this.props.commodities.hasLoaded) return false;

    const tableRows = [];
    const commodityList = this.props.commodities.commodityList;

    for (var i=0; i < commodityList.length; i++) {
      tableRows.push(
        {
          "name": commodityList[i].name,
          "description": commodityList[i].description,
          "price": commodityList[i].price,
          "type": commodityList[i].commodity_type.name
        }
      )
    }

    return (
      <Card className="mb-4">
        <CardBlock className="table-responsive">
            <h6 className="mb-4 text-uppercase">Your Commodities</h6>
            <Table id="commodities-table" className="commodities-table" data={tableRows} sortable={true} itemsPerPage={10} pageButtonLimit={5}>
                <Thead>
                    <Th column="name"><span>name</span></Th>
                    <Th column="description"><span>description</span></Th>
                    <Th column="price"><span>price ($)</span></Th>
                    <Th column="type"><span>type</span></Th>
                </Thead>
            </Table>
        </CardBlock>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCommodities: () => {
            dispatch(commoditiesActions.loadCommodities());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        commodities: state.commodities,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommoditiesPage);
