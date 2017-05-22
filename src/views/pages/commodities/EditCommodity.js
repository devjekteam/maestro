import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Card, CardBlock, Button, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupAddon
} from 'reactstrap';
import {browserHistory} from 'react-router';

import MetaDataInputs from '../../ui/MetaDataInputs'

import '../../../styles/EditCommodity.scss';
import * as commoditiesActions from '../../../reducers/commodities/actions';


const AttributeInput = (props) => {

  function updateAttribute() {
    const input = document.getElementById(props.attributeId);
    const changes = {
      [props.attributeName]: input.value
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  return (
    <Col sm={9}><Input type="text" name={props.attributeName} id={props.attributeId} defaultValue={props.defaultValue} onBlur={updateAttribute}/></Col>
  )
}

const PriceInput = (props) => {

  function updatePrice() {
    const input = document.getElementById(props.attributeId);
    const changes = {
      [props.attributeName]: input.value
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  return (
    <Col sm={2}>
      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <Input type="number" name={props.attributeName} id={props.attributeId} defaultValue={props.defaultValue} onBlur={updatePrice}/>
      </InputGroup>
    </Col>
  )
}


class EditCommodity extends Component {
  componentWillMount() {
    this.props.dispatch(commoditiesActions.loadCommodity(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commodities.formSubmitted) {
      browserHistory.push('/commodities');
    }
  }

  submitEditForm(e) {
    e.preventDefault();
    this.props.dispatch(commoditiesActions.submitCommodityForm());
  }

  render() {
    // something wrong here. why is it loading all commodities?
    if (!this.props.commodities || !this.props.commodities.hasLoaded) return false;

    // FIXME DRY out the onBlur shit. make a component to handle the redux state update for this and metadata inputs
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
                      <AttributeInput dispatch={this.props.dispatch} attributeName="name" attributeId="commodityName" defaultValue={commodity.name} />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="commodityDescription" sm={2}>Description:</Label>
                      <AttributeInput dispatch={this.props.dispatch} attributeName="description" attributeId="commodityDescription" defaultValue={commodity.description} />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="commodityPrice" sm={2}>Price:</Label>
                      <PriceInput dispatch={this.props.dispatch} attributeName="price" attributeId="commodityPrice" defaultValue={commodity.price} />
                    </FormGroup>
                  </div>
                  <div className="edit-commodity-form-block">
                    <h4>Custom Data</h4>
                    <MetaDataInputs metadata={commodity.metadata ? commodity.metadata : []} />
                  </div>
                  <Button>Submit</Button>
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
