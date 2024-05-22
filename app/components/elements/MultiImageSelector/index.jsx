import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg"; // Helper function to get the cropped image

export default function MultiImageSelector({ setSelectedImagesFromParent }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    //console.log("selectedImages", selectedImages);
    setSelectedImagesFromParent(selectedImages);
  }, [selectedImages]);

  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setCurrentImage(image);
    setShow(true);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => prevImages.concat(imagesArray));
    Array.from(files).map((file) => URL.revokeObjectURL(file));
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(currentImage, croppedAreaPixels);
      setSelectedImages((prevImages) => {
        const newImages = prevImages.map((img) =>
          img === currentImage ? croppedImage : img
        );
        return newImages;
      });
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  }, [currentImage, croppedAreaPixels]);

  const handleDelete = (image) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Images</h4>
      </div>
      <div className="card-body">
        <div className="input-upload">
          {selectedImages.length === 0 ? (
            <img src="/assets/imgs/theme/upload.svg" alt="" />
          ) : (
            <div className="image-preview mt-2 text-start">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-container"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="img-thumbnail mr-5"
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
                    onClick={() => handleShow(image)}
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(image)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px" /* Thay đổi kích thước */,
                      height: "20px" /* Thay đổi kích thước */,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize:
                        "1.2rem" /* Thay đổi kích thước của biểu tượng x */,
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
            onChange={handleImageChange}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Preview and Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentImage && (
            <div
              className="crop-container"
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <Cropper
                image={currentImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
