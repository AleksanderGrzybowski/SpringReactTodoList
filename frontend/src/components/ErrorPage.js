import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

export default class ErrorPage extends Component {
    refreshBrowser = () => {
        window.location.reload()
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Alert bsStyle="danger" style={{marginTop: '50px'}}>
                            <h4>Server error</h4>
                            <p>Please <a href="#" onClick={this.refreshBrowser}>refresh</a> the page</p>
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
