import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

/**
 * ImageCard component displays an image with title, description, and action buttons.
 * @param {Object} props - The component props.
 * @param {Object} props.image - The image object containing details.
 * @param {Function} props.onDelete - Callback to delete the image.
 * @param {Function} props.saveImage - Callback to save the image.
 * @returns {JSX.Element} The rendered ImageCard component.
 */
const ImageCard = ({ image, onDelete, saveImage }) => {
  /**
   * Converts a string to title case, capitalizing the first letter of each word.
   * @param {string} str - The string to convert.
   * @returns {string} The converted title case string.
   */
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  /**
   * Capitalizes the first letter of a sentence and makes the rest lowercase.
   * @param {string} str - The string to capitalize.
   * @returns {string} The capitalized sentence.
   */
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
      <Card.Footer className="text-muted">
        {image.user && image.user.name ? (
          <>
            Photo by{" "}
            {image.user.portfolio_url ? (
              <Card.Link
                href={image.user.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.user.name}
              </Card.Link>
            ) : (
              <span>{image.user.name}</span>
            )}
          </>
        ) : (
          <span>No author name</span>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
