import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H3, H1, Button } from 'native-base';
import {StyleSheet} from 'react-native'
class ReasonPanel extends Component {

    render() {
        const style = StyleSheet.create({
            default: {
                height: 90,
                width: 90,
                margin: 5
            },
            selected: {
                height: 90,
                width: 90,
                backgroundColor: this.props.backgroundColor,
                borderWidth: 0.5,
                borderColor: '#fff', 
                margin: 5
            }
        });
        const renderButtons = this.props.buttonNames.map((name, key) => (
            <Button full light key={ key } style={ this.props.reason === name ? style.selected : style.default } onPress={ () =>{this.props.handleSelect(name)} }>
              <H3 style={{color: this.props.reason === name ? '#fff': '#000'}}>{ name }</H3>
            </Button>));
        return (
            <Grid>
              <Col style={{backgroundColor: this.props.backgroundColor, margin:10}}>
              <Row>
                <H1 style={{color:'#fff'}}>{ this.props.header }</H1>
              </Row>
              <Row style={{width:'100%'}}>
                { renderButtons }
              </Row>
              </Col>
            </Grid>


            );
    }
}

export default ReasonPanel;