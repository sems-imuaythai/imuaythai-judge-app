import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';

class CenterSpinner extends Component {
    render() {
        return (
            <Container>
              <Content>
                <Spinner color='blue' style={ { marginTop: '20%' } } />
              </Content>
            </Container>
            );
    }
}

export default CenterSpinner;