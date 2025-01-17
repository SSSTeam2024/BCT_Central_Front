import { useGetAboutUsComponentsQuery } from "features/AboutUsComponent/aboutUsSlice";
import { useGetFooterListsQuery } from "features/FooterList/footerListSlice";
import { useGetFooterSocialsQuery } from "features/FooterSocial/footerSocialSlice";
import { useGetAllHeadersQuery } from "features/header/headerSlice";
import {
  useCreateMutation,
  useLazyGenerateQuery,
} from "features/htmlPage/htmlPageSlice";
import { useGetMenusQuery } from "features/menu/menuSlice";
import { useGetOfferServiceQuery } from "features/OffreServicesComponent/offreServicesSlice";
import { useGetOurValueQuery } from "features/OurValuesComponent/ourValuesSlice";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Card,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

const HtmlPage = () => {
  const { data: AllFooterLists = [] } = useGetFooterListsQuery();
  const { data: AllFooterSocial = [] } = useGetFooterSocialsQuery();
  const { data: AllMenu = [] } = useGetMenusQuery();
  const { data: AllHeader = [] } = useGetAllHeadersQuery();
  const { data: AllOfferServices = [] } = useGetOfferServiceQuery();
  const { data: AllOurValues = [] } = useGetOurValueQuery();
  const { data: AllAboutUs = [] } = useGetAboutUsComponentsQuery();
  const [listFooter, setListFooter] = useState<any[]>([]);

  type CheckboxKey = "aboutUs" | "ourValues" | "servicesOffer";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<CheckboxKey[]>(
    []
  );
  const [createHtmlPage] = useCreateMutation();
  useEffect(() => {
    const footerArr = AllFooterLists.map((footer) => footer?._id!);
    setListFooter(footerArr);
  }, [AllFooterLists]);

  const handleCheckboxChange = (value: CheckboxKey) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const selectedIds: Record<CheckboxKey, string | undefined> = {
    aboutUs: AllAboutUs[0]?._id,
    ourValues: AllOurValues[0]?._id,
    servicesOffer: AllOfferServices[0]?._id,
  };
  const initialHtmlPage = {
    name: "",
    link: "",
    quoteForm: "",
    header: "",
    menu: "",
    aboutUs: "",
    ourValues: "",
    offerServices: "",
    footerList: [""],
    socialMedia: "",
  };
  const [htmlPage, setHtmlPage] = useState(initialHtmlPage);
  const {
    name,
    link,
    quoteForm,
    header,
    menu,
    aboutUs,
    ourValues,
    offerServices,
    footerList,
    socialMedia,
  } = htmlPage;

  const handleQuoteFromCheckboxChange = (e: any) => {
    const { checked } = e.target;
    setHtmlPage((prevState) => ({
      ...prevState,
      quoteForm: checked ? "1" : "0", // Update the quoteForm based on the checkbox state
    }));
  };

  const onChangeHtmlPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHtmlPage((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [triggerGenerateHtmlPage] = useLazyGenerateQuery();

  const onSubmitHtmlPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const htmlPageForm = {
        ...htmlPage,
        header: AllHeader[0]?._id!,
        menu: AllMenu[0]?._id!,
        socialMedia: AllFooterSocial[0]?._id!,
        footerList: listFooter,
        // Update fields based on selected checkboxes
        aboutUs: selectedCheckboxes.includes("aboutUs")
          ? selectedIds?.aboutUs!
          : "",
        ourValues: selectedCheckboxes.includes("ourValues")
          ? selectedIds?.ourValues!
          : "",
        offerServices: selectedCheckboxes.includes("servicesOffer")
          ? selectedIds?.servicesOffer!
          : "",
      };
      const createdHtmlPage = await createHtmlPage(htmlPageForm).unwrap();

      if (createdHtmlPage?._id) {
        await triggerGenerateHtmlPage(createdHtmlPage._id).unwrap();
        alert("HTML Page created and generated successfully!");
      } else {
        throw new Error("Failed to retrieve the created HTML page ID.");
      }
      setHtmlPage(initialHtmlPage);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Body>
                <form onSubmit={onSubmitHtmlPage}>
                  <Row>
                    <Col>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={htmlPage.name}
                        onChange={onChangeHtmlPage}
                        placeholder="Page Name"
                        className="form-control"
                      />
                    </Col>
                    <Col>
                      <input
                        type="text"
                        id="link"
                        name="link"
                        value={htmlPage.link}
                        onChange={onChangeHtmlPage}
                        placeholder="Page Link"
                        className="form-control"
                      />
                    </Col>
                    <Col>
                      {/* Quote Form */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="quoteForm"
                          checked={htmlPage.quoteForm === "1"} // Set the checkbox state based on quoteForm
                          onChange={handleQuoteFromCheckboxChange} // Update state on change
                        />
                        <label className="form-check-label" htmlFor="quoteForm">
                          Quote Form
                        </label>
                      </div>
                      {/* About Us */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="aboutUs"
                          checked={selectedCheckboxes.includes("aboutUs")}
                          onChange={() => handleCheckboxChange("aboutUs")}
                        />
                        <label className="form-check-label" htmlFor="aboutUs">
                          About Us
                        </label>
                      </div>

                      {/* Our Values */}
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="ourValues"
                          checked={selectedCheckboxes.includes("ourValues")}
                          onChange={() => handleCheckboxChange("ourValues")}
                        />
                        <label className="form-check-label" htmlFor="ourValues">
                          Our Values
                        </label>
                      </div>
                      <div className="form-check form-check-info mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="servicesOffer"
                          checked={selectedCheckboxes.includes("servicesOffer")}
                          onChange={() => handleCheckboxChange("servicesOffer")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="servicesOffer"
                        >
                          Services Offer
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-end mt-3">
                      <button type="submit" className="btn btn-info">
                        <span className="icon-on">Create</span>
                      </button>
                    </div>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default HtmlPage;
