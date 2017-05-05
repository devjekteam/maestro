import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    Card, CardBlock
} from 'reactstrap';
import {Table, Th, Thead, Tr, Td} from 'reactable';

import * as commoditiesActions from '../../../reducers/commodities/actions';


class CommoditiesPage extends Component {
  componentWillMount() {
    this.props.loadCommodities();
  }

  componentDidMount() {
    // Slightly hacky
    var table = document.getElementById("commodities-table");
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < table.rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler =
            function(row)
            {
              return function() {
                  console.log("click");
               };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
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
