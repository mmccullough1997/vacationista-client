/* eslint-disable react/require-default-props */
/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import {
  Accordion,
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { getAllTripLegsByTrip } from '../../utils/data/tripLegData';
import { createExpense, deleteExpense, updateExpense } from '../../utils/data/expenseData';
import { createTransportation, deleteTransportation, updateTransportation } from '../../utils/data/transportationData';

const initialState = {
  title: '',
  type: null,
  from: '',
  to: '',
  amount: 0,
  comment: '',
  roundTrip: false,
  isTrip: false,
  isTransportation: false,
  isExpense: false,
  tripId: null,
  legId: null,
};

export default function ExpenseTransportationModal({
  title, type, from, to, amount, comment, roundTrip, isTrip, id, isTransportation, expenseTypes, transportationTypes, isExpense, tripId, legId, tripTravelTo,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [tripLegs, setTripLegs] = useState([]);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formObj = {
    title, type, from, to, amount, comment, roundTrip, isTrip, isTransportation, id, isExpense, tripId, legId,
  };

  const getAllTripLegs = () => {
    if (tripId) {
      getAllTripLegsByTrip(tripId).then(setTripLegs);
    }
  };

  useEffect(() => {
    getAllTripLegs();
    if (id) {
      setFormInput(formObj);
    }
    setFormInput((prevState) => ({
      ...prevState,
      tripId,
      legId,
      isExpense,
      isTransportation,
      isTrip,
    }));
  }, [id, title, type, from, to, amount, comment, roundTrip, isTransportation, tripId, legId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // update expense
    if (formInput.isExpense) {
      const expenseObj = {
        expenseType: Number(formInput.type),
        trip: Number(formInput.tripId),
        amount: parseFloat(formInput.amount).toFixed(2),
        comment: formInput.comment,
        title: formInput.title,
      };
      if (formInput.legId) {
        expenseObj.leg = Number(formInput.legId);
      } else {
        expenseObj.leg = null;
      }
      if (formInput.id) {
        if (formInput.isTrip) {
          updateExpense(expenseObj, formInput.id).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        } else {
          updateExpense(expenseObj, formInput.id).then(() => {
            router.push(`/legs/expensesAndtransportations/${legId}`);
            handleClose();
          });
        }
      // create expense
      } else {
        if (formInput.isTrip) {
          createExpense(expenseObj).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        }
        createExpense(expenseObj).then(() => {
          router.push(`/legs/expensesAndtransportations/${legId}`);
          handleClose();
        });
      }
    // update transportation
    } else if (formInput.isTransportation) {
      const transportationObj = {
        transportationType: Number(formInput.type),
        trip: Number(formInput.tripId),
        travelFrom: formInput.from,
        travelTo: formInput.to,
        amount: parseFloat(formInput.amount).toFixed(2),
        comment: formInput.comment,
        roundTrip: formInput.roundTrip,
      };
      if (formInput.legId) {
        transportationObj.leg = Number(formInput.legId);
      } else {
        transportationObj.leg = null;
      }
      if (formInput.id) {
        if (formInput.isTrip) {
          updateTransportation(transportationObj, formInput.id).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        } else {
          updateTransportation(transportationObj, formInput.id).then(() => {
            router.push(`/legs/expensesAndtransportations/${legId}`);
            handleClose();
          });
        }
      // create transportation
      } else {
        if (formInput.isTrip) {
          createTransportation(transportationObj).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        }
        createTransportation(transportationObj).then(() => {
          router.push(`/legs/expensesAndtransportations/${legId}`);
          handleClose();
        });
      }
    }
  };

  const deleteExpenseOrTransportation = () => {
    if (isExpense) {
      if (isTrip) {
        if (window.confirm('DANGER ZONE: Are you sure you want to delete this expense?')) {
          deleteExpense(id).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        }
      } else {
        if (window.confirm('DANGER ZONE: Are you sure you want to delete this expense?')) {
          deleteExpense(id).then(() => {
            router.push(`/legs/expensesAndtransportations/${legId}`);
            handleClose();
          });
        }
      }
    } else {
      if (isTrip) {
        if (window.confirm('DANGER ZONE: Are you sure you want to delete this transportation?')) {
          deleteTransportation(id).then(() => {
            router.push(`/trips/expensesAndtransportations/${tripId}`);
            handleClose();
          });
        }
      } else {
        if (window.confirm('DANGER ZONE: Are you sure you want to delete this transportation?')) {
          deleteTransportation(id).then(() => {
            router.push(`/legs/expensesAndtransportations/${legId}`);
            handleClose();
          });
        }
      }
    }
  };

  // edit expense
  if (id && isExpense) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Accordion.Body onClick={handleShow}>{title} - {amount}</Accordion.Body>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <FloatingLabel controlId="floatingInput2" label="Title:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Expense title: "
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Expense Type:" className="mb-3">
                <Form.Select
                  placeholder="Expense Type: "
                  name="type"
                  value={Number(formInput.type)}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {expenseTypes?.map((expenseType) => (
                    <option key={expenseType.id} value={Number(expenseType.id)}>{expenseType.label}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Expense amount:" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Expense amount: "
                  name="amount"
                  value={formInput.amount}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Comment:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Comment: "
                  name="comment"
                  value={formInput.comment}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip:" className="mb-3">
                <Form.Select
                  disabled
                  required
                >
                  <option value="">{tripTravelTo}</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip Leg:" className="mb-3">
                <Form.Select
                  placeholder="Trip Leg: "
                  name="legId"
                  value={formInput.legId ? Number(formInput.legId) : null}
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
              <DeleteIcon onClick={deleteExpenseOrTransportation} />
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
    );
  }
  // create expense
  if (isExpense) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <AddCircleOutlineIcon onClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Expense</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <FloatingLabel controlId="floatingInput2" label="Title:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Expense title: "
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Expense Type:" className="mb-3">
                <Form.Select
                  placeholder="Expense Type: "
                  name="type"
                  value={Number(formInput.type)}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {expenseTypes?.map((expenseType) => (
                    <option key={expenseType.id} value={Number(expenseType.id)}>{expenseType.label}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Expense amount:" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Expense amount: "
                  name="amount"
                  value={formInput.amount}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Comment:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Comment: "
                  name="comment"
                  value={formInput.comment}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip:" className="mb-3">
                <Form.Select
                  disabled
                  required
                >
                  <option value="">{tripTravelTo}</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip Leg:" className="mb-3">
                <Form.Select
                  placeholder="Trip Leg: "
                  name="legId"
                  value={formInput.legId ? Number(formInput.legId) : null}
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
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </>
    );
  }
  // edit transportation
  if (id && isTransportation) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Accordion.Body onClick={handleShow}>{comment} - {amount}</Accordion.Body>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Transportation</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <FloatingLabel controlId="floatingInput2" label="Transportation Type:" className="mb-3">
                <Form.Select
                  placeholder="Transportation Type: "
                  name="type"
                  value={Number(formInput.type)}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {transportationTypes?.map((transportationType) => (
                    <option key={transportationType.id} value={Number(transportationType.id)}>{transportationType.label}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="From:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="From: "
                  name="from"
                  value={formInput.from}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="To:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="To: "
                  name="to"
                  value={formInput.to}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Transportation amount:" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Transportation amount: "
                  name="amount"
                  value={formInput.amount}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Comment:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Comment: "
                  name="comment"
                  value={formInput.comment}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip:" className="mb-3">
                <Form.Select
                  disabled
                  required
                >
                  <option value="">{tripTravelTo}</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip Leg:" className="mb-3">
                <Form.Select
                  placeholder="Trip Leg: "
                  name="legId"
                  value={formInput.legId ? Number(formInput.legId) : null}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Leg</option>
                  {tripLegs?.map((tripLeg) => (
                    <option key={tripLeg.id} value={Number(tripLeg.leg.id)}>{tripLeg.leg.location}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Round trip?"
                  name="roundTrip"
                  checked={formInput.roundTrip}
                  value={formInput.roundTrip}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      roundTrip: e.target.checked,
                    }));
                  }}
                  required
                />
              </FloatingLabel>

            </Modal.Body>

            <Modal.Footer>
              <DeleteIcon onClick={deleteExpenseOrTransportation} />
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
    );
  }
  // create transportation
  if (isTransportation) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <AddCircleOutlineIcon onClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Transportation</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <FloatingLabel controlId="floatingInput2" label="Transportation Type:" className="mb-3">
                <Form.Select
                  placeholder="Transportation Type: "
                  name="type"
                  value={Number(formInput.type)}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {transportationTypes?.map((transportationType) => (
                    <option key={transportationType.id} value={Number(transportationType.id)}>{transportationType.label}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="From:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="From: "
                  name="from"
                  value={formInput.from}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="To:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="To: "
                  name="to"
                  value={formInput.to}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Transportation amount:" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Transportation amount: "
                  name="amount"
                  value={formInput.amount}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Comment:" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Comment: "
                  name="comment"
                  value={formInput.comment}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip:" className="mb-3">
                <Form.Select
                  disabled
                  required
                >
                  <option value="">{tripTravelTo}</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="Trip Leg:" className="mb-3">
                <Form.Select
                  placeholder="Trip Leg: "
                  name="legId"
                  value={formInput.legId ? Number(formInput.legId) : null}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Leg</option>
                  {tripLegs?.map((tripLeg) => (
                    <option key={tripLeg.id} value={Number(tripLeg.leg.id)}>{tripLeg.leg.location}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Round trip?"
                  name="roundTrip"
                  checked={formInput.roundTrip}
                  value={formInput.roundTrip}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      roundTrip: e.target.checked,
                    }));
                  }}
                  required
                />
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
    );
  }
}

ExpenseTransportationModal.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  from: PropTypes.string,
  to: PropTypes.string,
  amount: PropTypes.string,
  comment: PropTypes.string,
  roundTrip: PropTypes.bool,
  id: PropTypes.number,
  isTrip: PropTypes.bool,
  isTransportation: PropTypes.bool,
  isExpense: PropTypes.bool,
  expenseTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  })),
  transportationTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  })),
  tripId: PropTypes.number,
  legId: PropTypes.number,
  tripTravelTo: PropTypes.string,
};
