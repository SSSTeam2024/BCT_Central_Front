import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';

const SignUp = () => {

    document.title = "Vehicles| Bouden Coach Travel";

    return (
        <React.Fragment>
           <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Vehicles" pageTitle="Administration" />
                    <h1>Vehicles</h1>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SignUp;