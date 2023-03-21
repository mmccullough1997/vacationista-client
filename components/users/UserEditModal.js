/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  username: '',
  image: '',
  bio: '',
};

export default function UserEditModal({
  id, username, image, bio,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
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
    username, image, bio,
  };

  useEffect(() => {
    setFormInput(formObj);
  }, [id, username, bio, image, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.username) {
      const userObj = {
        firstName: 'true',
        lastName: 'true',
        dateRegistered: 'true',
        username: formInput.username,
        bio: 'true',
        image: 'true',
      };
      updateUser(userObj, user).then(() => {
        router.push(`/users/${user.id}`);
        handleClose();
      });
    } else if (formInput.image) {
      const userObj = {
        firstName: 'true',
        lastName: 'true',
        dateRegistered: 'true',
        username: 'true',
        bio: 'true',
        image: formInput.image,
      };
      updateUser(userObj, user).then(() => {
        router.push(`/users/${user.id}`);
        handleClose();
      });
    } else if (formInput.bio) {
      const userObj = {
        firstName: 'true',
        lastName: 'true',
        dateRegistered: 'true',
        username: 'true',
        bio: formInput.bio,
        image: 'true',
      };
      updateUser(userObj, user).then(() => {
        router.push(`/users/${user.id}`);
        handleClose();
      });
    }
  };

  return (
    <>
      { username ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Username</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Add a username..."
                  name="username"
                  value={formInput.username}
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

      ) : image ? (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Profile Image</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  as="textarea"
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
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <EditIcon onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bio</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  as="textarea"
                  placeholder="Add a bio..."
                  name="bio"
                  value={formInput.bio}
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

UserEditModal.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  image: PropTypes.string,
  bio: PropTypes.string,
};
