import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Map from 'pages/Map/pages';

const Revenue = () => {
    return (
        <React.Fragment>
            <Col xxl={12} className="order-last">
                <Card>
                    <Card.Body>
                        <Map />
                    </Card.Body>
                </Card>
            </Col >
        </React.Fragment >
    );
}

export default Revenue;