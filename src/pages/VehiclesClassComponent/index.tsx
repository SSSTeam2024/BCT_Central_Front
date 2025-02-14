import React, { useState } from "react";
import { Row, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useGetVehicleClassQuery,
  useUpdateVehicleClassMutation,
} from "features/VehicleClassComponent/vehicleClassSlice";

interface VehicleClasseProps {
  selectedPage: string;
}

const VehiclesClassComponent: React.FC<VehicleClasseProps> = ({
  selectedPage,
}) => {
  const { data = [] } = useGetVehicleClassQuery();
  const [updateVehicleClasse] = useUpdateVehicleClassMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingParagraphId, setEditingParargraphId] = useState<string | null>(
    null
  );
  const [updatedParagraph, setUpdatedParagraph] = useState<string>("");
  const [updatedBigTitle, setUpdatedBigTitle] = useState<string>("");
  const [vehicleTypes, setVehicleTypes] = useState<any>(null);

  const filtredVehicleClassesData = data.filter(
    (vehicleClasse) => vehicleClasse.page === selectedPage
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].display = checked ? "1" : "0";
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleEditClick = (id: string, paragraph: string) => {
    setEditingParargraphId(id);
    setUpdatedParagraph(paragraph);
  };

  const handleEditBigTitle = (id: string, big_title: string) => {
    setEditingId(id);
    setUpdatedBigTitle(big_title);
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedParagraph(event.target.value);
  };

  const handleBigTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBigTitle(event.target.value);
  };

  const handleBlur = (id: string, big_title: string) => {
    const vehicleClass = data.find((vc) => vc._id === id);
    updateVehicleClasse({
      _id: id,
      paragraph: updatedParagraph,
      bigTitle: big_title,
      page: selectedPage,
      vehicleTypes: vehicleClass?.vehicleTypes || [],
    });
    setEditingId(null);
    setEditingParargraphId(null);
  };

  const handleBigTitleBlur = (id: string, paragraph: string) => {
    const vehicleClass = data.find((vc) => vc._id === id);
    updateVehicleClasse({
      _id: id,
      paragraph: paragraph,
      bigTitle: updatedBigTitle,
      page: selectedPage,
      vehicleTypes: vehicleClass?.vehicleTypes || [],
    });
    setEditingId(null);
    setEditingParargraphId(null);
  };

  const handleEditTitleClick = (index: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].editing = true;
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].title = newTitle;
    setVehicleTypes(updatedVehicleTypes);
  };

  const handleTitleBlur = (index: number) => {
    const updatedVehicleTypes = [...vehicleTypes];
    updatedVehicleTypes[index].editing = false;
    setVehicleTypes(updatedVehicleTypes);
  };

  return (
    <React.Fragment>
      <Col lg={12} className="p-3">
        {filtredVehicleClassesData.map((vehicleClasse) => (
          <>
            <Row>
              <div className="d-flex justify-content-center hstack gap-3">
                {editingId === vehicleClasse._id ? (
                  <input
                    type="text"
                    value={updatedBigTitle}
                    onChange={handleBigTitleChange}
                    onBlur={() =>
                      handleBigTitleBlur(
                        vehicleClasse._id!,
                        vehicleClasse.paragraph
                      )
                    }
                    autoFocus
                    className="form-control w-50"
                  />
                ) : (
                  <>
                    <h2>{vehicleClasse.bigTitle}</h2>
                    <i
                      style={{
                        cursor: "pointer",
                      }}
                      className="ri-pencil-line fs-18"
                      onClick={() =>
                        handleEditBigTitle(
                          vehicleClasse._id!,
                          vehicleClasse.bigTitle
                        )
                      }
                    ></i>
                  </>
                )}
              </div>

              <div className="hstack gap-3 mb-3">
                {editingParagraphId === vehicleClasse._id ? (
                  <textarea
                    value={updatedParagraph}
                    onChange={handleParagraphChange}
                    onBlur={() =>
                      handleBlur(vehicleClasse._id!, vehicleClasse.bigTitle)
                    }
                    autoFocus
                    className="form-control"
                  />
                ) : (
                  <>
                    <p>{vehicleClasse.paragraph}</p>
                    <i
                      style={{
                        cursor: "pointer",
                      }}
                      className="ri-pencil-line fs-18"
                      onClick={() =>
                        handleEditClick(
                          vehicleClasse._id!,
                          vehicleClasse.paragraph
                        )
                      }
                    ></i>
                  </>
                )}
              </div>
            </Row>
            <Row>
              {vehicleClasse.vehicleTypes.map((vt, index) => (
                <Col lg={3} key={index}>
                  <Card className="border-danger">
                    <Form.Check
                      type="checkbox"
                      className="m-2"
                      checked={vt.display === "1"}
                      onChange={(e) =>
                        handleCheckboxChange(index, e.target.checked)
                      }
                    />
                    <div className="d-flex justify-content-center p-2 text-danger">
                      <div className="hstack gap-2 align-middle">
                        <i className={`${vt.icon} fs-18`}></i>
                        {vehicleTypes?.editing! ? (
                          <input
                            type="text"
                            value={vt.title}
                            onChange={(e) =>
                              handleTitleChange(index, e.target.value)
                            }
                            onBlur={() => handleTitleBlur(index)}
                            className="form-control"
                            style={{ width: "auto" }}
                          />
                        ) : (
                          <>
                            <span>{vt.title}</span>
                            <i
                              className="bi bi-pencil-fill ms-2 text-dark"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditTitleClick(index)}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ))}
      </Col>
    </React.Fragment>
  );
};
export default VehiclesClassComponent;
