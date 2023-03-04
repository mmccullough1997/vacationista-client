/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import {
  Accordion,
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

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
};

export default function ExpenseTransportationModal({
  title, type, from, to, amount, comment, roundTrip, isTrip, id, isTransportation, expenseTypes, transportationTypes, isExpense,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  console.warn(router);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formObj = {
    title, type, from, to, amount, comment, roundTrip, isTrip, isTransportation, id, isExpense,
  };

  useEffect(() => {
    if (id) {
      setFormInput(formObj);
    }
  }, [id, title, type, from, to, amount, comment, roundTrip, isTransportation, isExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(formInput);
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
                  value={formInput.type?.id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {expenseTypes?.map((expenseType) => (
                    <option key={expenseType.id} value={expenseType.id}>{expenseType.label}</option>
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
  } if (id && isTransportation) {
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
                  value={formInput.type?.id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {transportationTypes?.map((transportationType) => (
                    <option key={transportationType.id} value={transportationType.id}>{transportationType.label}</option>
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
  title: PropTypes.string.isRequired,
  type: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  roundTrip: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  isTrip: PropTypes.bool.isRequired,
  isTransportation: PropTypes.bool.isRequired,
  isExpense: PropTypes.bool.isRequired,
  expenseTypes: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
  transportationTypes: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};
