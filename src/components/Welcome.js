import React from "react";
import { Button, Container } from "react-bootstrap";

function Welcome() {
  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="bg-light p-5 rounded-lg"
        style={{ maxWidth: "60rem", width: "100%" }}
      >
        <Container>
          <h1 className="display-4">Images Gallery</h1>
          <p className="lead">
            This is a simple hero application that retrieves photos using
            Unsplash API.
          </p>
          <Button
            variant="primary"
            href="https://unsplash.com/"
            target="_blank"
          >
            Learn more
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Welcome;
