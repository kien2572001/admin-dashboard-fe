import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function MultiVideoSelector({ setSelectedVideosFromParent }) {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    //console.log("selectedVideos", selectedVideos);
    setSelectedVideosFromParent(selectedVideos);
  }, [selectedVideos]);

  const handleClose = () => setShow(false);
  const handleShow = (video) => {
    setCurrentVideo(video);
    setShow(true);
  };

  const handleVideoChange = (event) => {
    const files = event.target.files;
    const videosArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedVideos((prevVideos) => prevVideos.concat(videosArray));
  };

  const handleDelete = (video) => {
    setSelectedVideos((prevVideos) =>
      prevVideos.filter((vid) => vid !== video)
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Videos</h4>
      </div>
      <div className="card-body">
        <div className="input-upload">
          {selectedVideos.length === 0 ? (
            <img src="/assets/imgs/theme/upload.svg" alt="" />
          ) : (
            <div className="video-preview mt-2 text-start">
              {selectedVideos.map((video, index) => (
                <div
                  key={index}
                  className="video-container"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <video
                    src={video}
                    className="video-thumbnail mr-5"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "2px solid #3BB77E",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.2s ease",
                      marginBottom: "10px",
                    }}
                    onClick={() => handleShow(video)}
                    // controls
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(video)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            className="form-control"
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Preview Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVideo && (
            <div
              className="video-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "500px", // Cố định chiều cao
                overflow: "hidden",
              }}
            >
              <video
                src={currentVideo}
                className="video-preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  height: "auto",
                }}
                controls
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
