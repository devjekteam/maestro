import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Card, CardBlock, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupAddon
} from 'reactstrap';

import MetaDataInputs from '../../ui/MetaDataInputs'

import '../../../styles/EditCommodity.scss';
import * as commoditiesActions from '../../../reducers/commodities/actions';


class EditCommodity extends Component {
  componentWillMount() {
    this.props.dispatch(commoditiesActions.loadCommodity(this.props.params.id));
  }

  submitEditForm(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    // something wrong here. why is it loading all commodities?
    if (!this.props.commodities || !this.props.commodities.hasLoaded) return false;

    const commodity = this.props.commodities;
    return (
      <div className="view">
        <Card className="mb-8">
            <CardBlock>
                <Form onSubmit={e => this.submitEditForm(e)}>
                  <div className="edit-commodity-form-block">
                    <h4>Attributes</h4>
                    <FormGroup row>
                      <Label for="commodityName" sm={2}>Name:</Label>
                      <Col sm={9}><Input type="text" name="commodityName" id="commodityName" defaultValue={commodity.name}/></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="commodityDescription" sm={2}>Description:</Label>
                      <Col sm={9}><Input type="text" name="commodityDescription" id="commodityDescription" defaultValue={commodity.description}/></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="commodityPrice" sm={2}>Price:</Label>
                      <Col sm={2}>
                        <InputGroup>
                          <InputGroupAddon>$</InputGroupAddon>
                          <Input type="number" name="commodityPrice" id="commodityPrice" defaultValue={commodity.price}/>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </div>
                  <div className="edit-commodity-form-block">
                    <h4>Custom Data</h4>
                    <MetaDataInputs metadata={commodity.metadata ? commodity.metadata : []} />
                  </div>
                </Form>
            </CardBlock>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      commodities: state.commodities,
  };
}

export default connect(mapStateToProps)(EditCommodity);
