/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/router';
import { getAllTripsByUser, updateTrip } from '../../utils/data/tripData';
import { updateLeg } from '../../utils/data/legData';
import { useAuth } from '../../utils/context/authContext';
import { createTripLeg, deleteTripLeg, getAllTripLegsByTripAndLeg } from '../../utils/data/tripLegData';
import { getAllExpensesByTripAndLeg, updateExpense } from '../../utils/data/expenseData';
import { getAllTransportationsByTripAndLeg, updateTransportation } from '../../utils/data/transportationData';
import { getAllEventsByTripAndLeg, updateEvent } from '../../utils/data/eventData';
import { getAutocompleteToRecommendations } from '../../utils/data/autocompleteData';

const initialState = {
  autoToLocation: '',
  start: '',
  end: '',
  budget: 0,
  isTrip: false,
  legId: null,
  tripId: null,
};

export default function EditModal({
  autoToLocation, start, end, budget, id, isTrip, legId, tripId,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleClose = () => {
    setShow(false);
    setFormInput((prevState) => ({
      ...prevState,
    }));
  };

  const handleShow = () => setShow(true);

  const formObj = {
    autoToLocation, start, end, budget, isTrip, legId, tripId,
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

  useEffect(() => {
    setFormInput(formObj);
    getAllTripsByUser(user.id).then(setUserTrips);
  }, [autoToLocation, start, end, budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.autoToLocation && formInput.isTrip) {
      const trip = {
        user: 'true',
        start: 'true',
        end: 'true',
        travelFrom: 'true',
        travelTo: formInput.autoToLocation,
        budget: 'true',
      };
      updateTrip(trip, id).then(() => {
        router.push(`/trips/${id}`);
        handleClose();
      });
    } else if ((formInput.start || formInput.end) && formInput.isTrip) {
      const trip = {
        user: 'true',
        start: formInput.start,
        end: formInput.end,
        travelFrom: 'true',
        travelTo: 'true',
        budget: 'true',
      };
      updateTrip(trip, id).then(() => {
        router.push(`/trips/${id}`);
        handleClose();
      });
    } else if (formInput.budget && formInput.isTrip) {
      const trip = {
        user: 'true',
        start: 'true',
        end: 'true',
        travelFrom: 'true',
        travelTo: 'true',
        budget: formInput.budget,
      };
      updateTrip(trip, id).then(() => {
        router.push(`/trips/${id}`);
        handleClose();
      });

      // for legs
    } else if (formInput.autoToLocation) {
      const leg = {
        user: 'true',
        start: 'true',
        end: 'true',
        location: formInput.autoToLocation,
        budget: 'true',
      };
      updateLeg(leg, id).then(() => {
        router.push(`/legs/${id}`);
        handleClose();
      });
    } else if ((formInput.start || formInput.end)) {
      const leg = {
        user: 'true',
        start: formInput.start,
        end: formInput.end,
        location: 'true',
        budget: 'true',
      };
      updateLeg(leg, id).then(() => {
        router.push(`/legs/${id}`);
        handleClose();
      });
    } else if (formInput.budget) {
      const leg = {
        user: 'true',
        start: 'true',
        end: 'true',
        location: 'true',
        budget: formInput.budget,
      };
      updateLeg(leg, id).then(() => {
        router.push(`/legs/${id}`);
        handleClose();
      });
    } else if (formInput.legId || formInput.tripId) {
      getAllTripLegsByTripAndLeg(tripId, legId).then((resp) => {
        deleteTripLeg(Number(resp[0].id)).then(() => {
          createTripLeg(Number(formInput.tripId), Number(formInput.legId)).then(() => {
            getAllExpensesByTripAndLeg(tripId, legId).then((response) => {
              response.forEach((expense) => {
                const newExpenseObj = expense;
                newExpenseObj.leg = Number(formInput.legId);
                newExpenseObj.trip = Number(formInput.tripId);
                newExpenseObj.expenseType = newExpenseObj.expense_type.id;
                delete newExpenseObj.expense_type;
                updateExpense(newExpenseObj, newExpenseObj.id);
              });
              getAllTransportationsByTripAndLeg(tripId, legId).then((transportationResponse) => {
                transportationResponse.forEach((transportation) => {
                  const newTransportationObj = transportation;
                  newTransportationObj.leg = Number(formInput.legId);
                  newTransportationObj.trip = Number(formInput.tripId);
                  newTransportationObj.transportationType = newTransportationObj.transportation_type.id;
                  delete newTransportationObj.transportation_type;
                  newTransportationObj.travelFrom = newTransportationObj.travel_from;
                  delete newTransportationObj.travel_from;
                  newTransportationObj.travelTo = newTransportationObj.travel_to;
                  delete newTransportationObj.travel_to;
                  newTransportationObj.roundTrip = newTransportationObj.round_trip;
                  delete newTransportationObj.round_trip;
                  updateTransportation(newTransportationObj, newTransportationObj.id);
                });
              });
              getAllEventsByTripAndLeg(tripId, legId).then((eventResponse) => {
                eventResponse.forEach((event) => {
                  const newEventObj = event;
                  newEventObj.leg = Number(formInput.legId);
                  newEventObj.trip = Number(formInput.tripId);
                  newEventObj.eventType = newEventObj.event_type.id;
                  delete newEventObj.event_type;
                  updateEvent(newEventObj, newEventObj.id);
                });
              });
              router.push(`/trips/${formInput.tripId}`);
            });
          });
        });
      });
    }
  };

  return (
    <>
      { autoToLocation ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Trip Destination</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <AsyncSelect
                  classNamePrefix="select"
                  backspaceRemovesValue
                  isClearable
                  onChange={handleToSelect}
                  value={formInput.autoToLocation ? { label: formInput.autoToLocation, value: formInput.autoToLocation } : null}
                  loadOptions={handleAutocompleteToInput}
                  placeholder="Location"
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

      ) : start || end ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Trip Dates</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <FloatingLabel controlId="floatingInput2" label="Start Date" className="mb-3">
                    <Form.Control type="date" placeholder="Start Date" name="start" value={formInput.start} onChange={handleChange} required />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput2" label="End Date" className="mb-3">
                    <Form.Control type="date" placeholder="End Date" name="end" value={formInput.end} onChange={handleChange} required />
                  </FloatingLabel>
                </div>
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
      ) : budget ? (
        <>
          <Form onSubmit={handleSubmit}>
            <AttachMoneyIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Trip Budget</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="number"
                  placeholder="Add a budget..."
                  name="budget"
                  value={formInput.budget}
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
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <AssignmentIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Trip Leg</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <FloatingLabel controlId="floatingInput2" label="Trips:" className="mb-3">
                  <Form.Select
                    placeholder="trips: "
                    name="tripId"
                    value={Number(formInput.tripId)}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select trip</option>
                    {userTrips?.map((userTrip) => (
                      <option key={userTrip.id} value={Number(userTrip.id)}>{userTrip.travel_to}</option>
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
      )}
    </>
  );
}

EditModal.propTypes = {
  autoToLocation: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  budget: PropTypes.string,
  id: PropTypes.number.isRequired,
  isTrip: PropTypes.bool,
  legId: PropTypes.number,
  tripId: PropTypes.number,
};
