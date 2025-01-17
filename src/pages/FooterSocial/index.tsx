import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useGetFooterSocialsQuery } from "features/FooterSocial/footerSocialSlice";
import { Link } from "react-router-dom";

const FooterSocial = () => {
  document.title = "Web Site Social Media | Coach Hire Network";
  const { data = [] } = useGetFooterSocialsQuery();
  const currentDate = new Date();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Social Media" pageTitle="Web Site Settings" />
          <Card>
            <Card.Header className="bg-dark">
              {data.map((social) => (
                <Row>
                  <Col lg={4}>
                    <div className="hstack gap-2">
                      <h6 className="text-white">
                        {social.termsAndConditions.name}
                      </h6>
                      <span className="text-danger">
                        <i className="mdi mdi-circle-small fs-24"></i>
                      </span>
                      <h6 className="text-white">
                        {social.privacyPolicy.name}
                      </h6>
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div>
                      <span className="text-white fs-18">
                        <i className="mdi mdi-copyright "></i>{" "}
                        {currentDate.getFullYear()}
                      </span>
                      <span className="text-white fs-18">
                        {social.siteName}.
                      </span>{" "}
                      <span className="text-white fs-18">
                        Designed By{" "}
                        <Link
                          to="https://https//sss.com.tn/"
                          className="text-danger"
                        >
                          3S
                        </Link>
                      </span>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="hstack gap-2 text-white">
                      <Link
                        to={`${social.socialLinks.x.link}`}
                        className="text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0,0,256,256"
                        >
                          <g
                            fill="#ffffff"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style={{ mixBlendMode: "normal" }}
                          >
                            <g transform="scale(5.12,5.12)">
                              <path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path>
                            </g>
                          </g>
                        </svg>
                      </Link>
                      <Link
                        to={`${social.socialLinks.facebook.link}`}
                        className="text-white"
                      >
                        <i className="ri-facebook-fill"></i>
                      </Link>
                      <Link
                        to={`${social.socialLinks.googlePlus.link}`}
                        className="text-white"
                      >
                        <i className="bi bi-google"></i>
                      </Link>
                      <Link
                        to={`${social.socialLinks.tiktok.link}`}
                        className="text-white"
                      >
                        <i className="bi bi-tiktok"></i>
                      </Link>
                      <Link
                        to={`${social.socialLinks.youtube.link}`}
                        className="text-white"
                      >
                        <i className="ri-youtube-fill"></i>
                      </Link>
                    </div>
                  </Col>
                </Row>
              ))}
            </Card.Header>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default FooterSocial;
