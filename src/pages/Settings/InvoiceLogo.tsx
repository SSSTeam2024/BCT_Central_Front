import React, { useState, useRef } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  GeneralSet,
  useUpdateAppMutation,
} from "features/generalSettings/generalSettingsSlice";

interface InvoiceProps {
  app: GeneralSet;
}

const InvoiceLogo: React.FC<InvoiceProps> = ({ app }) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const [updateApp] = useUpdateAppMutation();

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [logoExtension, setLogoExtension] = useState<string | null>(null);
  const hasChanged = useRef(false);

  const handleAcceptedFiles = async (files: any[]) => {
    const file = files[0];
    if (!file) return;

    file.preview = URL.createObjectURL(file);
    file.formattedSize = formatBytes(file.size);
    setSelectedFiles([file]);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      setLogoBase64(base64String);
      setLogoExtension(file.name.split(".").pop());
      hasChanged.current = true;
    };
    reader.readAsDataURL(file);
  };

  const handleBlur = () => {
    if (hasChanged.current && logoBase64 && logoExtension) {
      updateApp({
        _id: app._id,
        ...app,
        logoBase64Strings: logoBase64,
        logoExtension: logoExtension,
      });
      hasChanged.current = false;
    }
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Row>
          <Col lg={12}>
            <div className="mb-3">
              <Row onBlur={handleBlur}>
                <Dropzone onDrop={handleAcceptedFiles} multiple={false}>
                  {({ getRootProps }) => (
                    <div className="dropzone dz-clickable text-center">
                      <div
                        className="dz-message needsclick"
                        {...getRootProps()}
                      >
                        <div className="mb-3">
                          <i className="display-8 text-muted ri-upload-cloud-2-fill" />
                        </div>
                        <h4>Drop logo here or click to upload.</h4>
                      </div>
                    </div>
                  )}
                </Dropzone>

                <div className="list-unstyled mb-0" id="file-previews">
                  {selectedFiles.length > 0
                    ? selectedFiles.map((f, i) => (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-image-preview"
                          key={i}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  height="100"
                                  className="avatar-lg rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      ))
                    : app.logo && (
                        <Card className="mt-1 mb-0 shadow-none border dz-image-preview">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  height="100"
                                  className="avatar-lg rounded bg-light"
                                  alt="Existing Logo"
                                  src={`${process.env.REACT_APP_BASE_URL}/appFiles/${app.logo}`}
                                />
                              </Col>
                              <Col>
                                <p className="mb-0">
                                  <strong>Current logo</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )}
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};
export default InvoiceLogo;
