/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Image from 'next/image';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import newtriplogo from '../../public/newtriplogo.png';
import { createTrip, getAllTripsByUser } from '../../utils/data/tripData';
import { createLeg, getAllLegsByUser } from '../../utils/data/legData';
import { createTripLeg } from '../../utils/data/tripLegData';

const initialState = {
  start: '',
  end: '',
  travelFrom: '',
  travelTo: '',
  location: '',
  budget: 0,
};

export default function NewTripModal({ user, isTrip, tripId }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTrip) {
      delete formInput.location;
      createTrip(formInput, user).then(() => {
        getAllTripsByUser(user.id).then((resp) => {
          router.push(`/trips/${resp.slice(-1)[0].id}`);
        });
      });
    } else if (!isTrip) {
      delete formInput.travelFrom;
      delete formInput.travelTo;
      createLeg(formInput, user).then(() => {
        getAllLegsByUser(user.id).then((resp) => {
          createTripLeg(tripId, resp.slice(-1)[0].id);
          router.push(`/legs/${resp.slice(-1)[0].id}`);
        });
      });
    }
  };

  return (
    <>
      <>
        <Form>
          <div className="homePageTripsHeader">
            <Typography variant="p"> { isTrip ? 'Plan a new trip' : 'Plan a new leg'}</Typography>
            { isTrip ? (
              <Image src={newtriplogo} onClick={handleShow} height="20" width="40" />
            ) : (
              <AddCircleOutlineIcon onClick={handleShow} />
            )}
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Going Somewhere?</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              { isTrip ? (
                <>
                  <FloatingLabel controlId="floatingInput2" label="Travel from:" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="From: "
                      name="travelFrom"
                      value={formInput.travelFrom}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput2" label="Travel to:" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="To: "
                      name="travelTo"
                      value={formInput.travelTo}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </>

              ) : (
                <FloatingLabel controlId="floatingInput2" label="Travel to:" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="To: "
                    name="location"
                    value={formInput.location}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              )}

              <div>
                <FloatingLabel controlId="floatingInput2" label="Start Date" className="mb-3">
                  <Form.Control type="date" placeholder="Start Date" name="start" value={formInput.start} onChange={handleChange} required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput2" label="End Date" className="mb-3">
                  <Form.Control type="date" placeholder="End Date" name="end" value={formInput.end} onChange={handleChange} required />
                </FloatingLabel>
              </div>

              <FloatingLabel controlId="floatingInput2" label="Total budget ($)" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Budget: "
                  name="budget"
                  value={formInput.budget}
                  onChange={handleChange}
                />
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

NewTripModal.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  isTrip: PropTypes.bool.isRequired,
  tripId: PropTypes.number.isRequired,
};
