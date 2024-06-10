import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface TimePickerModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (selectedTimeFrame: string) => void;
}

const FlashSaleTimePickerModal: React.FC<TimePickerModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const timeSlots = [
    "00:00-02:00",
    "02:00-09:00",
    "09:00-12:00",
    "12:00-15:00",
    "15:00-17:00",
    "17:00-19:00",
    "19:00-21:00",
    "21:00-00:00",
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSlotChange = (e: any) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(`${selectedDate} ${selectedTimeSlot}`);
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true} static={true}>
      <Modal.Header closeButton>
        <Modal.Title>Select Time Frame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" onChange={handleDateChange} />
          </Form.Group>
          <Form.Group controlId="formTimeSlot">
            <Form.Label>Select Time Slot</Form.Label>
            <Form.Control as="select" onChange={handleTimeSlotChange}>
              <option value="">Select time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlashSaleTimePickerModal;
