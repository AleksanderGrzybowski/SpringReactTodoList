import React from 'react';
import { Grid, Row, Col, Alert} from 'react-bootstrap';

const ErrorPage = () => (
    <Grid>
        <Row>
            <Col md={12}>
                <Alert bsStyle="danger" style={{marginTop: '50px'}}>
                    <h4>Server error</h4>
                    <p>Please refresh the page</p>
                </Alert>
            </Col>
        </Row>
    </Grid>
);

export default ErrorPage;
