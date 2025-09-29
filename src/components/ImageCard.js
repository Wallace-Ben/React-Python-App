import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ImageCard = ({ image, onDelete, saveImage }) => {
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function capitaliseSentence(str) {
    if (!str) return "";
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  const title = toTitleCase(image?.title || "");
  const description = capitaliseSentence(
    image.description || image.alt_description
  );

  const savedStyle = !image.saved
    ? {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "50px",
        marginRight: "50px",
      }
    : undefined;
  return (
    <Card style={{ width: "18rem", textAlign: "center" }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div style={savedStyle}>
          <Button variant="primary" onClick={() => onDelete(image.id)}>
            Delete
          </Button>
          {!image.saved && (
            <Button variant="secondary" onClick={() => saveImage(image.id)}>
              Save
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
