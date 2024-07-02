import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useGetAttachmentByIDQuery } from "features/Attachments/attachmentSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/Account/authSlice";
import { RootState } from "app/store";
import {
  useGetAllVisitorsQuery,
  useGetVisitorByEmailQuery,
} from "features/Visitor/visitorSlice";
import { useAddNewEmailQueueMutation } from "features/EmailQueue/emailQueueSlice";
import {
  useGetAllQuotesByCompanyEmailQuery,
  useGetAllQuotesBySchoolEmailQuery,
  useGetAllQuotesByVisitorEmailQuery,
} from "features/Quotes/quoteSlice";
import { useGetAllCompanyQuery } from "features/Company/companySlice";
import { useGetAllSchoolsQuery } from "features/Schools/schools";

interface ChildProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  checkedCheckbox: string;
  category: string;
}
const SingleEmail: React.FC<ChildProps> = ({
  data,
  setData,
  checkedCheckbox,
  category,
}) => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const { data: AllVisitors = [] } = useGetAllVisitorsQuery();
  const { data: AllCompanies = [] } = useGetAllCompanyQuery();
  const { data: AllSchools = [] } = useGetAllSchoolsQuery();
  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email is sent successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue === selectedEmail) {
      setFilteredEmails([]);
    } else {
      const uniqueEmails = new Set();
      if (category === "School") {
        const filtered = AllSchools.filter((school) => {
          const emailMatches = school.email
            .toLowerCase()
            .includes(inputValue.toLowerCase());
          if (emailMatches && !uniqueEmails.has(school.email)) {
            uniqueEmails.add(school.email);
            return true;
          }
          return false;
        });
        setFilteredEmails(filtered);
      } else if (category === "Company") {
        const filtered = AllCompanies.filter((company) => {
          const emailMatches = company.email
            .toLowerCase()
            .includes(inputValue.toLowerCase());
          if (emailMatches && !uniqueEmails.has(company.email)) {
            uniqueEmails.add(company.email);
            return true;
          }
          return false;
        });
        setFilteredEmails(filtered);
      } else {
        const filtered = AllVisitors.filter((visitor) => {
          const emailMatches = visitor.email
            .toLowerCase()
            .includes(inputValue.toLowerCase());
          if (emailMatches && !uniqueEmails.has(visitor.email)) {
            uniqueEmails.add(visitor.email);
            return true;
          }
          return false;
        });
        setFilteredEmails(filtered);
      }
    }
  }, [inputValue, AllVisitors, AllSchools, AllCompanies, selectedEmail]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    setSelectedEmail(null); // Clear selected email when typing
  };
  const [selectedVisitor, setSelectedVisitor] = useState("");

  const [selectedQuote, setSelectedQuote] = useState("");

  const handleSelectedQuoteByVisitorId = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuote(event?.target.value);
  };

  const handleEmailAutocompleteClick = (visitor: any) => {
    setInputValue(visitor.email);
    setSelectedEmail(visitor.email);
    setSelectedVisitor(visitor._id);

    setFilteredEmails([]); // Hide the list
  };

  const { data: allQuoteByVisitorEmail = [] } =
    useGetAllQuotesByVisitorEmailQuery(selectedEmail!);

  const { data: allQuoteBySchoolEmail = [] } =
    useGetAllQuotesBySchoolEmailQuery(selectedEmail!);

  const { data: allQuoteByCompanyEmail = [] } =
    useGetAllQuotesByCompanyEmailQuery(selectedEmail!);

  const oneWayQuoteByVisitorEmail = allQuoteByVisitorEmail.filter(
    (quote) => quote.type === "One way"
  );

  const oneWayQuoteBySchoolEmail = allQuoteBySchoolEmail.filter(
    (quote) => quote.type === "One way"
  );

  const currentDate = new Date();

  const { data: oneVisitor } = useGetVisitorByEmailQuery(selectedEmail!);
  const { data: OneAttachment } = useGetAttachmentByIDQuery(checkedCheckbox!);
  const [subjectNewEmail, setSubject] = useState<string>("");
  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };
  const [newEmailQueueMutation] = useAddNewEmailQueueMutation();
  const initialNewEmailQueuelData = {
    newEmail: "",
    subject: "",
    body: "",
    file: "",
    sender: "",
    name: "",
    quote_Id: "",
    date_email: "",
  };

  const [emailQueue, setEmailQueue] = useState(initialNewEmailQueuelData);

  const { newEmail, subject, body, file, sender, name } = emailQueue;

  const onSubmitSendNewEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedEmailData = {
        newEmail: selectedEmail!,
        subject: subjectNewEmail,
        body: data,
        file: OneAttachment?.attachment!,
        sender: user?.email,
        name: category,
        quote_Id: selectedQuote,
        date_email: currentDate.toDateString(),
      };
      newEmailQueueMutation(updatedEmailData)
        .then(() => notifySuccess())
        .then(() => setData(""));
    } catch (error) {
      notifyError(error);
    }
  };
  return (
    <React.Fragment>
      <Form onSubmit={onSubmitSendNewEmail}>
        <Row className="mb-2">
          <Col lg={2}>
            <Form.Label htmlFor="email">Email </Form.Label>
          </Col>
          <Col lg={4}>
            <div className="input-wrapper">
              <Form.Control
                placeholder="Search for email..."
                id="autoCompleteFruit"
                type="text"
                dir="ltr"
                spellCheck={false}
                autoComplete="on"
                autoCapitalize="off"
                value={inputValue}
                onChange={handleInputChange}
              />
              <i className="ph ph-caret-down dropdown-icon"></i>
              {inputValue && filteredEmails.length > 0 && (
                <ul className="email-list">
                  {filteredEmails.map((visitor) => (
                    <li
                      key={visitor._id}
                      className="email-item"
                      onClick={() => handleEmailAutocompleteClick(visitor)}
                    >
                      {visitor.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={1}>
            {oneWayQuoteByVisitorEmail.length === 0 ? (
              ""
            ) : (
              <Form.Label htmlFor="quote">
                <span className="text-primary fw-bold">
                  {oneWayQuoteByVisitorEmail.length}
                </span>{" "}
                {oneWayQuoteByVisitorEmail.length === 1 ? (
                  <span>Quote</span>
                ) : (
                  <span>Quotes</span>
                )}
              </Form.Label>
            )}
          </Col>
          <Col lg={4}>
            {category === "Visitor" && (
              <select
                className="form-select text-muted"
                onChange={handleSelectedQuoteByVisitorId}
              >
                <option value="">Select Quote</option>
                {allQuoteByVisitorEmail.map((quote) => {
                  if (quote.type === "One way")
                    return (
                      <option value={quote?._id!}>
                        Ref: {quote.quote_ref} / {quote.date}
                      </option>
                    );
                })}
              </select>
            )}
            {category === "School" && (
              <select
                className="form-select text-muted"
                onChange={handleSelectedQuoteByVisitorId}
              >
                <option value="">Select Quote</option>
                {allQuoteBySchoolEmail.map((quote) => {
                  if (quote.type === "One way")
                    return (
                      <option value={quote?._id!}>
                        Ref: {quote.quote_ref} / {quote.date}
                      </option>
                    );
                })}
              </select>
            )}
            {category === "Company" && (
              <select
                className="form-select text-muted"
                onChange={handleSelectedQuoteByVisitorId}
              >
                <option value="">Select Quote</option>
                {allQuoteByCompanyEmail.map((quote) => {
                  if (quote.type === "One way")
                    return (
                      <option value={quote?._id!}>
                        Ref: {quote.quote_ref} / {quote.date}
                      </option>
                    );
                })}
              </select>
            )}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col lg={2}>
            <Form.Label>Email BBC</Form.Label>
          </Col>
          <Col lg={4}>
            <Form.Control />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col lg={2}>
            <Form.Label htmlFor="subjectNewEmail">Subject</Form.Label>
          </Col>
          <Col lg={10}>
            <Form.Control
              type="text"
              id="subjectNewEmail"
              name="subjectNewEmail"
              value={subjectNewEmail}
              onChange={handleSubject}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="d-flex justify-content-end">
            <Button
              type="button"
              className="btn-soft-danger"
              data-bs-dismiss="modal"
              onClick={() => {
                setData("");
                setSubject("");
                setInputValue("");
              }}
            >
              <i className="ri-delete-back-line align-middle me-1"></i> Clear
            </Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <div className="w-100">
            {editor ? (
              <CKEditor
                editor={ClassicEditor}
                data={data}
                onReady={(editor: any) => {
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setData(data);
                }}
              />
            ) : (
              <p>ckeditor5</p>
            )}
          </div>
        </Row>
        <Row>
          <div className="hstack gap-2 justify-content-center mb-2">
            <Button
              type="submit"
              className="btn-soft-success"
              data-bs-dismiss="modal"
            >
              <i className="ri-send-plane-fill me-1 fs-18 align-middle"></i>
              Send
            </Button>
          </div>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default SingleEmail;
