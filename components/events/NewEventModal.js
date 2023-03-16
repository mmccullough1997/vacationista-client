/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AsyncSelect from 'react-select/async';
import { getAllTripLegsByTrip } from '../../utils/data/tripLegData';
import getAllEventTypes from '../../utils/data/eventTypeData';
import { createEvent, getAllEvents } from '../../utils/data/eventData';
import { getAutocompleteToRecommendations } from '../../utils/data/autocompleteData';

const initialState = {
  eventType: null,
  trip: null,
  leg: null,
  description: '',
  location: '',
  date: '',
  image: '',
  title: '',
};

export default function NewEventModal({ user, tripId, tripLocation }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [tripLegs, setTripLegs] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
    setFormInput(initialState);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToSelect = (selected) => {
    if (selected) {
      const {
        name, value,
      } = selected;
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        autoToLocation: '',
      }));
    }
  };

  const handleAutocompleteToInput = (target) => new Promise((resolve, reject) => {
    getAutocompleteToRecommendations(target).then((locationArray) => {
      locationArray.forEach((location) => {
        const cleanedLabel = location.label.replace(/undefined,/g, '');
        location.label = cleanedLabel;
        const cleanedValue = location.value.replace(/undefined,/g, '');
        location.value = cleanedValue;
      });
      resolve(locationArray.filter((location) => location.value.toLowerCase().includes(target.toLowerCase())));
    }).catch(reject);
  });

  const getAllTripLegs = () => {
    if (tripId) {
      getAllTripLegsByTrip(tripId).then(setTripLegs);
      getAllEventTypes().then(setEventTypes);
      formInput.trip = tripId;
    }
  };

  useEffect(() => {
    getAllTripLegs();
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formInput.location = formInput.autoToLocation;
    delete formInput.autoToLocation;
    createEvent(formInput).then(() => {
      getAllEvents().then((resp) => {
        router.push(`/events/${resp.slice(-1)[0].id}`);
      });
    });
  };

  return (
    <>
      <>
        <Form>
          <div className="homePageTripsHeader">
            <AddCircleOutlineIcon onClick={handleShow} />
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new event</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <>
                <FloatingLabel controlId="floatingInput2" label="Title:" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Title: "
                    name="title"
                    value={formInput.title}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput2" className="mb-3">
                  <AsyncSelect
                    classNamePrefix="select"
                    backspaceRemovesValue
                    isClearable
                    onChange={handleToSelect}
                    value={{ label: formInput.autoToLocation, value: formInput.autoToLocation }}
                    loadOptions={handleAutocompleteToInput}
                  />
                </FloatingLabel>
              </>

              <div>
                <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
                  <Form.Control type="date" placeholder="Date" name="date" value={formInput.date} onChange={handleChange} required />
                </FloatingLabel>
              </div>

              <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Image: "
                  name="image"
                  value={formInput.image}
                  onChange={handleChange}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Description" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Description: "
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Event Type:" className="mb-3">
                <Form.Select
                  placeholder="Event Type: "
                  name="eventType"
                  value={Number(formInput.eventType)}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {eventTypes?.map((eventType) => (
                    <option key={eventType.id} value={Number(eventType.id)}>{eventType.label}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip:" className="mb-3">
                <Form.Select
                  disabled
                  required
                >
                  <option value="">{tripLocation}</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip Leg:" className="mb-3">
                <Form.Select
                  placeholder="Trip Leg: "
                  name="leg"
                  value={formInput.leg ? Number(formInput.leg) : null}
                  onChange={handleChange}
                  required
                >
                  <option value={null}>Select Leg</option>
                  {tripLegs?.map((tripLeg) => (
                    <option key={tripLeg.id} value={Number(tripLeg.leg.id)}>{tripLeg.leg.location}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </>
    </>
  );
}

NewEventModal.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  tripId: PropTypes.number.isRequired,
  tripLocation: PropTypes.string.isRequired,
};
