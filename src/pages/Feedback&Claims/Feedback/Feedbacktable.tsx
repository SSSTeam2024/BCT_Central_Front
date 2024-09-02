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
  console.log("reviews", reviews);
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
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/driverFiles/profileImages/${item.driver_id.profile_image}`}
                  alt=""
                  className="avatar-sm rounded"
                />
                <h5 className="mb-2 mt-3">{item.name}</h5>
                <span>Category : </span>
                <span className="mb-0 text-muted fs-15">{item.category}</span>
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
