/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialState = {
  travelDestination: '',
};

export default function EditModal({ travelDestination }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  // const [destination, setDestination] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const travelDestinationObj = { travelDestination };

  useEffect(() => {
    setFormInput(travelDestinationObj);
    // setDestination(travelDestination);
  }, [travelDestination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      { travelDestination ? (
        <>
          <EditIcon onClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Trip Destination</Modal.Title>
            </Modal.Header>

            <Form>
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

            </Form>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

      ) : (
        <>
          <EditIcon onClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Trip Dates</Modal.Title>
            </Modal.Header>

            <Form>
              <Modal.Body />

            </Form>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

EditModal.propTypes = {
  travelDestination: PropTypes.string.isRequired,
};
