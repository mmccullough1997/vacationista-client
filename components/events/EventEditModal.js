/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateEvent } from '../../utils/data/eventData';

const initialState = {
  title: '',
  date: '',
  image: '',
  eventType: null,
  description: '',
};

export default function EventEditModal({
  id, title, date, image, eventType, description, eventTypes,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formObj = {
    title, date, image, eventType, description,
  };

  useEffect(() => {
    setFormInput(formObj);
  }, [id, title, date, image, eventType, description, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.title) {
      const event = {
        eventType: 'true',
        trip: 'true',
        leg: 'true',
        description: 'true',
        location: 'true',
        date: 'true',
        image: 'true',
        title: formInput.title,
      };
      updateEvent(event, id).then(() => {
        router.push(`/events/${id}`);
        handleClose();
      });
    } else if (formInput.date) {
      const event = {
        eventType: 'true',
        trip: 'true',
        leg: 'true',
        description: 'true',
        location: 'true',
        date: formInput.date,
        image: 'true',
        title: 'true',
      };
      updateEvent(event, id).then(() => {
        router.push(`/events/${id}`);
        handleClose();
      });
    } else if (formInput.image) {
      const event = {
        eventType: 'true',
        trip: 'true',
        leg: 'true',
        description: 'true',
        location: 'true',
        date: 'true',
        image: formInput.image,
        title: 'true',
      };
      updateEvent(event, id).then(() => {
        router.push(`/events/${id}`);
        handleClose();
      });
    } else if (formInput.eventType) {
      const event = {
        eventType: Number(formInput.eventType),
        trip: 'true',
        leg: 'true',
        description: 'true',
        location: 'true',
        date: 'true',
        image: 'true',
        title: 'true',
      };
      updateEvent(event, id).then(() => {
        router.push(`/events/${id}`);
        handleClose();
      });
    } else if (formInput.description) {
      const event = {
        eventType: 'true',
        trip: 'true',
        leg: 'true',
        description: formInput.description,
        location: 'true',
        date: 'true',
        image: 'true',
        title: 'true',
      };
      updateEvent(event, id).then(() => {
        router.push(`/events/${id}`);
        handleClose();
      });
    }
  };

  return (
    <>
      { title ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Add a title..."
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </>

      ) : date ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Date</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
                  <Form.Control type="date" placeholder="Date" name="date" value={formInput.date} onChange={handleChange} required />
                </FloatingLabel>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </>
      ) : image ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Image</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Add an image..."
                  name="image"
                  value={formInput.image}
                  onChange={handleChange}
                  required
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </>
      ) : eventType ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Event Type</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <FloatingLabel controlId="floatingInput2" label="Event Type:" className="mb-3">
                  <Form.Select
                    placeholder="Event Type: "
                    name="eventType"
                    value={Number(formInput.eventType)}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {eventTypes?.map((theEventType) => (
                      <option key={theEventType.id} value={Number(theEventType.id)}>{theEventType.label}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Description</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Edit description..."
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                  required
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </>
      )}
    </>
  );
}

EventEditModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  eventType: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  eventTypes: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};
