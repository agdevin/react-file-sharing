import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'

import * as api from "../../actions/api.service";
import emailvalid from "../../utils/emailValid";

export default function Upload(props) {
  // const memberId = 2;
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [categories, setCategories] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const onChangeHandler = (event) => {
    setSelectedFiles(event.target.files)
  }

  const onClickHandler = (event) => {
    event.preventDefault();
    if (!email) { alert('Email field should not empty')}
    else {
      if (emailvalid(email)) {
        if (selectedFiles) {
          var formData = new FormData();
          for(var x = 0; x < selectedFiles.length; x++) {
            formData.append(`file${x}`, selectedFiles[x])
          }
          formData.set('fileLength', selectedFiles.length);
          formData.set('email', email);
          formData.set('group', group);
          formData.set('category', categories);
    
          api.uploadFile(formData)
          .then(res => {
            if (res) {
              setAlertVariant(res.status);
              setAlertMessage(res.message);
              setShowAlert(true);
            }
          })
          .catch(error => {
            console.log(error);
          })
        } else {
          alert('Please choose one or more files to upload');  
        }
      } else {
        alert('Email is not valid');
      }
    }
  }

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Alert show={showAlert} variant={alertVariant} onClose={() => setShowAlert(false)} dismissible transition={false}>
          {alertMessage}
        </Alert>
        <Form className="upload-form" encType="multipart/form-data">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicGroup">
            <Form.Label>Group</Form.Label>
            <Form.Control type="text" placeholder="Group name" onChange={(e) => setGroup(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="custom-file"
              // label="Upload file"
              multiple
              onChange={(event) => onChangeHandler(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCategories">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Categories name" onChange={(e) => setCategories(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(event) => onClickHandler(event)}>
            Upload
          </Button>
        </Form>
      </Col>
    </Row>
  )
}