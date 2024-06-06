import React from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//import images
import img2 from "assets/images/brands/img-2.png";
import img3 from "assets/images/brands/img-3.png";
import img13 from "assets/images/brands/img-13.png";
import img5 from "assets/images/brands/img-5.png";
import img6 from "assets/images/brands/img-6.png";
import img4 from "assets/images/brands/img-4.png";

const NotesDropdown = () => {
    return (
        <React.Fragment>
            <Dropdown className="topbar-head-dropdown ms-1 header-item dropdown-hover-end">
                <Dropdown.Toggle className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle arrow-none">
                    <i className='ri ri-file-edit-line fs-20'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-lg p-0 dropdown-menu-end">
                    <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0 fw-semibold fs-15">Notes</h6>
                            </Col>
                            <Col className="col-auto">
                                <Link to="/notes" className="btn btn-sm btn-soft-primary"> View All Notes
                                    <i className="ri-arrow-right-s-line align-middle"></i></Link>
                            </Col>
                        </Row>
                    </div>
                    <div className="p-2">
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default NotesDropdown;