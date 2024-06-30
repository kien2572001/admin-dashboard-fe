import React, { useState, useEffect } from "react";
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
  const [validTimeSlots, setValidTimeSlots] = useState<string[]>([]);

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

  useEffect(() => {
    updateValidTimeSlots(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTimeSlot(""); // Reset time slot when date changes
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(`${selectedDate} ${selectedTimeSlot}`);
  };

  const updateValidTimeSlots = (date: string) => {
    if (date === new Date().toISOString().split("T")[0]) {
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      const currentTime = currentHour + currentMinutes / 60;
      const sixHoursAgo = currentTime - 6;
      setValidTimeSlots(
        timeSlots.filter((slot) => {
          const [startHour, endHour] = slot.split("-").map((time) => {
            const [hour, minute] = time.split(":").map(Number);
            return hour + minute / 60;
          });
          return startHour >= sixHoursAgo;
        })
      );
    } else {
      setValidTimeSlots(timeSlots);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Select Time Frame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>
          <Form.Group controlId="formTimeSlot">
            <Form.Label>Select Time Slot</Form.Label>
            <Form.Control
              as="select"
              // @ts-ignore
              onChange={handleTimeSlotChange}
              value={selectedTimeSlot}
            >
              <option value="">Select time slot</option>
              {validTimeSlots.map((slot, index) => (
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
        <Button
          variant="primary"
          onClick={handleSaveClick}
          disabled={!selectedDate || !selectedTimeSlot}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlashSaleTimePickerModal;
