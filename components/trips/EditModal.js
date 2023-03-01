/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateTrip } from '../../utils/data/tripData';
import { updateLeg } from '../../utils/data/legData';

const initialState = {
  travelDestination: '',
  start: '',
  end: '',
  budget: 0,
  isTrip: false,
};

export default function EditModal({
  travelDestination, start, end, budget, id, isTrip,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // const [startDate, setStartDate] = useState('');
  // const [destination, setDestination] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formObj = {
    travelDestination, start, end, budget, isTrip,
  };

  useEffect(() => {
    setFormInput(formObj);
    // setDestination(travelDestination);
  }, [travelDestination, start, end, budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.travelDestination && formInput.isTrip) {
      const trip = {
        user: 'true',
        start: 'true',
        end: 'true',
        travelFrom: 'true',
        travelTo: formInput.travelDestination,
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
    } else if (formInput.travelDestination) {
      const leg = {
        user: 'true',
        start: 'true',
        end: 'true',
        location: formInput.travelDestination,
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
    }
  };

  return (
    <>
      { travelDestination ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Trip Destination</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  name="travelDestination"
                  value={formInput.travelDestination}
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
      ) : (
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
      )}
    </>
  );
}

EditModal.propTypes = {
  travelDestination: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isTrip: PropTypes.bool.isRequired,
};
