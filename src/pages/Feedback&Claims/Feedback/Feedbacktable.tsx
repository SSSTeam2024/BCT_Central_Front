import React, { useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  display: "-webkit-box",
};

const Feedbacktable = ({ reviews }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, []);

  return (
    <React.Fragment>
      <ResponsiveMasonry
        className="row"
        data-masonry='{"percentPosition": true }'
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
      >
        <Masonry className="col-xxl-3 col-lg-4 col-md-6">
          {(reviews || []).map((item: any, key: number) => (
            <Card className="me-3" key={key}>
              <Card.Body>
                <img src={item.img} alt="" className="avatar-sm rounded" />
                <h5 className="mb-2 mt-3">{item.name}</h5>
                <div className="text-warning mb-3">
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                </div>
                <p
                  className="mb-0 text-muted fs-15"
                  //   style={isOpen ? undefined : paragraphStyles}
                  //   ref={ref}
                >
                  {item.subTitle}
                </p>
                {/* <div className="text-end">
                  {showReadMoreButton && (
                    <Link
                      to="#"
                      className="link-dark fw-medium"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {isOpen ? (
                        <i className="ri-arrow-up-s-line align-middle"></i>
                      ) : (
                        <i className="ri-arrow-down-s-line align-middle"></i>
                      )}
                    </Link>
                  )}
                </div> */}
              </Card.Body>
            </Card>
          ))}
        </Masonry>
        {/* </Masonry> */}
      </ResponsiveMasonry>
    </React.Fragment>
  );
};

export default Feedbacktable;
