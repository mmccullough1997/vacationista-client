/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
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
import AsyncSelect from 'react-select/async';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import newtriplogo from '../../public/newtriplogo.png';
import { createTrip, getAllTripsByUser } from '../../utils/data/tripData';
import { createLeg, getAllLegsByUser } from '../../utils/data/legData';
import { createTripLeg } from '../../utils/data/tripLegData';
import { getAutocompleteFromRecommendations, getAutocompleteToRecommendations } from '../../utils/data/autocompleteData';

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

  const handleFromSelect = (selected) => {
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
        autoFromLocation: '',
      }));
    }
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

  const handleAutocompleteFromInput = (target) => new Promise((resolve, reject) => {
    getAutocompleteFromRecommendations(target).then((locationArray) => {
      locationArray.forEach((location) => {
        const cleanedLabel = location.label.replace(/undefined,/g, '');
        location.label = cleanedLabel;
        const cleanedValue = location.value.replace(/undefined,/g, '');
        location.value = cleanedValue;
      });
      resolve(locationArray.filter((location) => location.value.toLowerCase().includes(target.toLowerCase())));
    }).catch(reject);
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!formInput.travelFrom || !formInput.travelTo || !formInput.location) && (formInput.autoFromLocation || formInput.autoToLocation)) {
      if (isTrip) {
        formInput.travelFrom = formInput.autoFromLocation;
        formInput.travelTo = formInput.autoToLocation;
        delete formInput.location;
        delete formInput.autoFromLocation;
        delete formInput.autoToLocation;
        createTrip(formInput, user).then(() => {
          getAllTripsByUser(user.id).then((resp) => {
            router.push(`/trips/${resp.slice(-1)[0].id}`);
          });
        });
      } else if (!isTrip) {
        delete formInput.travelFrom;
        delete formInput.travelTo;
        formInput.location = formInput.autoToLocation;
        delete formInput.autoToLocation;
        createLeg(formInput, user).then(() => {
          getAllLegsByUser(user.id).then((resp) => {
            createTripLeg(tripId, resp.slice(-1)[0].id);
            router.push(`/legs/${resp.slice(-1)[0].id}`);
          });
        });
      }
    }
  };

  return (
    <>
      <>
        <Form>
          <div className="homePageTripsHeader">
            <Typography variant="p"> { isTrip ? 'Plan a new trip' : 'Plan a new leg'}</Typography>
            { isTrip ? (
              <Image src={newtriplogo} onClick={handleShow} height="20" width="30" />
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
                  <FloatingLabel controlId="floatingInput2" className=" sel mb-3">
                    <AsyncSelect
                      classNamePrefix="select"
                      backspaceRemovesValue
                      isClearable
                      onChange={handleFromSelect}
                      value={formInput.autoFromLocation ? { label: formInput.autoFromLocation, value: formInput.autoFromLocation } : null}
                      loadOptions={handleAutocompleteFromInput}
                      placeholder="From"
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput2" className="mb-3">
                    <AsyncSelect
                      classNamePrefix="select"
                      backspaceRemovesValue
                      isClearable
                      onChange={handleToSelect}
                      value={formInput.autoToLocation ? { label: formInput.autoToLocation, value: formInput.autoToLocation } : null}
                      loadOptions={handleAutocompleteToInput}
                      placeholder="To"
                    />
                  </FloatingLabel>
                </>

              ) : (
                <FloatingLabel controlId="floatingInput2" className="mb-3">
                  <AsyncSelect
                    classNamePrefix="select"
                    backspaceRemovesValue
                    isClearable
                    onChange={handleToSelect}
                    value={formInput.autoToLocation ? { label: formInput.autoToLocation, value: formInput.autoToLocation } : null}
                    loadOptions={handleAutocompleteToInput}
                    placeholder="To"
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
  isTrip: PropTypes.bool,
  tripId: PropTypes.number,
};
