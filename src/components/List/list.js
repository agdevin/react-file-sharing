import React, { useState } from "react";
import { Tabs, Tab, Button, Modal, Form, ListGroup } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { MdRemoveRedEye, MdDelete } from 'react-icons/md';
import { FaShareAlt } from 'react-icons/fa';

import * as api from "../../actions/api.service";
import emailvalid from "../../utils/emailValid";

export default function List(props) {
  const memberId = 1;
  const [selectedFileId, setFileId] = useState(0);
  const [sharingMemberEmail, setSharingMemberEmail] = useState('');
  const [memberFiles, setMemberFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [showFileDetailModal, setShowFileDetailModal] = useState(false);
  const handleCloseFileDetailModal = () => setShowFileDetailModal(false);

  const [showSharedFileDetailModal, setShowSharedFileDetailModal] = useState(false);
  const handleCloseSharedFileDetailModal = () => setShowSharedFileDetailModal(false);

  const [fileDetail, setFileDetail] = useState({});
  const [sharedFileDetail, setSharedFileDetail] = useState({});

  const rankFormatter = (cell, row, rowIndex, formatExtraData) => { 
    return ( 
      <div 
        style={{ textAlign: "center",
        cursor: "pointer",
        lineHeight: "normal" }}>
        <Button className="action-btn" variant="primary" size="sm" onClick={() => viewFileDetail(row.file_id)}>
          <MdRemoveRedEye className="action-btn-icon" />
        </Button>
        <Button className="action-btn" variant="success" size="sm" onClick={() => showShareFileModal(row.file_id)}>
          <FaShareAlt className="action-btn-icon"/>
        </Button>
        <Button className="action-btn" variant="danger" size="sm" onClick={() => deleteFile(row.file_id)}>
          <MdDelete className="action-btn-icon" />
        </Button>
      </div> 
    ); 
  }

  const rankFormatterSharedFile = (cell, row, rowIndex, formatExtraData) => { 
    return ( 
      <div 
        style={{ textAlign: "center",
        cursor: "pointer",
        lineHeight: "normal" }}>
        <Button className="action-btn" variant="primary" size="sm" onClick={() => viewSharedFileDetail(row.shared_key)}>
          <MdRemoveRedEye className="action-btn-icon" />
        </Button>
        <Button className="action-btn" variant="danger" size="sm" onClick={() => deleteSharedFile(row.shared_key)}>
          <MdDelete className="action-btn-icon" />
        </Button>
      </div> 
    ); 
  }

  const { SearchBar } = Search;

  const memberFilesColumns = [{
    dataField: 'file_id',
    text: 'File ID',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    dataField: 'file_name',
    text: 'File Name',
    headerStyle: (colum, colIndex) => {
      return { width: '10%'};
    },
    style: {verticalAlign: 'middle'}
  }, {
    dataField: 'member',
    text: 'Member',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    dataField: 'file_url',
    text: 'File Location',
    headerStyle: (colum, colIndex) => {
      return { width: '35%'};
    },
    style: {verticalAlign: 'middle'}
  }, {
    dataField: 'storage_engine',
    text: 'Storage Engine',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    dataField: 'status',
    text: 'File Status',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    text: 'Actions',
    dataField: 'actions',
    isDummyField: true,
    csvExport: false,
    headerStyle: (colum, colIndex) => {
      return { width: '150px', textAlign: 'center' };
    },
    style: {verticalAlign: 'middle', textAlign: 'center'},
    formatter: rankFormatter,
  }];

  const sharedFilesColumns = [{
    dataField: 'shared_key',
    // text: 'File ID',
    hidden: true
  }, {
    dataField: 'file_name',
    text: 'File Name',
    headerStyle: (colum, colIndex) => {
      return { width: '10%'};
    },
    style: {verticalAlign: 'middle'}
  }, {
    dataField: 'file_url',
    text: 'File Location',
    headerStyle: (colum, colIndex) => {
      return { width: '35%'};
    },
    style: {verticalAlign: 'middle'}
  }, {
    dataField: 'member',
    text: 'Member',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    dataField: 'shared_member',
    text: 'Shared Member',
    style: {verticalAlign: 'middle', textAlign: 'center'}
  }, {
    text: 'Actions',
    dataField: 'actions',
    isDummyField: true,
    csvExport: false,
    headerStyle: (colum, colIndex) => {
      return { width: '120px', textAlign: 'center' };
    },
    style: {verticalAlign: 'middle', textAlign: 'center'},
    formatter: rankFormatterSharedFile,
  }];

  // fetch files for member files
  React.useEffect(() => {
    api.getMemberFiles(memberId).then(res => {
      setMemberFiles(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  // fetch shared files
  React.useEffect(() => {
    getSharedFiles(memberId);
  }, [])

  const getSharedFiles = (memberId) => {
    api.getSharedFiles(memberId).then(res => {
      setSharedFiles(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const viewFileDetail = (fileId) => {
    setShowFileDetailModal(true);
    api.getFileDetails(memberId, fileId).then(res => {
      if (res.data) {
        setFileDetail(res.data);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  const showShareFileModal = (id) => {
    setShowModal(true);
    setFileId(id);
  }

  const deleteFile = (id) => {
    console.log(id);
  }
  
  const viewSharedFileDetail = (sharedKey) => {
    setShowSharedFileDetailModal(true);
    api.getSharedFileDetails(memberId, sharedKey).then(res => {
      if (res.data) {
        setSharedFileDetail(res.data);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  const deleteSharedFile = (id) => {
    console.log(id);
  }

  const shareFilewithMember = (e) => {
    e.preventDefault();
    if (sharingMemberEmail) {
      if (emailvalid(sharingMemberEmail)) {
        api.shareFile(selectedFileId, memberId, sharingMemberEmail).then(res => {
          if (res) {
            alert(res.message);
            setTimeout(() => {
              setShowModal(false);
            }, 500);
            getSharedFiles(memberId);
          }
        })
        .catch(error => {
          alert('Something Went Wrong');
          setShowModal(false);
        })
      } else {
        alert('Email is not valid')
      }
    } else {
      alert('Email field should not empty')
    }
  }

  return (
    <React.Fragment>
      {/* sharing modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>File Sharing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Please enter the email of the member you want to share:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setSharingMemberEmail(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => shareFilewithMember(e)}>Share</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* file detail modal */}
      <Modal
        show={showFileDetailModal}
        onHide={handleCloseFileDetailModal}
        backdrop="static"
        keyboard={false}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>File Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {
              Object.keys(fileDetail).map((key, i) => (
                <div className="detail-info" key={i}>
                  <div className="detail-key">
                    <span>{(key.replace(/[^a-zA-Z ]/g, " ")).charAt(0).toUpperCase() + (key.replace(/[^a-zA-Z ]/g, " ")).slice(1)}:</span>
                  </div>
                  <div className="detail-value">
                    <span>{fileDetail[key]}</span>
                  </div>
                </div>
              ))
            }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFileDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSharedFileDetailModal}
        onHide={handleCloseSharedFileDetailModal}
        backdrop="static"
        keyboard={false}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Shared File Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {
              Object.keys(sharedFileDetail).map((key, i) => (
                <div className="detail-info" key={i}>
                  <div className="detail-key">
                    <span>{(key.replace(/[^a-zA-Z ]/g, " ")).charAt(0).toUpperCase() + (key.replace(/[^a-zA-Z ]/g, " ")).slice(1)}:</span>
                  </div>
                  <div className="detail-value">
                    <span>{sharedFileDetail[key]}</span>
                  </div>
                </div>
              ))
            }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSharedFileDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Tabs transition={false} defaultActiveKey="member_files" id="list-tab">
        <Tab eventKey="member_files" title="Member Files">
          <ToolkitProvider
            keyField="file_id"
            data={ memberFiles }
            columns={ memberFilesColumns }
            search
          >
            {
              props => (
                <div>
                  <SearchBar { ...props.searchProps } />
                  <BootstrapTable
                    { ...props.baseProps }
                    // rowStyle={rowStyle}
                    tdStyle={ {verticalAlign: 'middle' } }
                  />
                </div>
              )
            }
          </ToolkitProvider>
        </Tab>
        <Tab eventKey="shared_file" title="Shared File">
          <ToolkitProvider
            keyField="shared_key"
            data={ sharedFiles }
            columns={ sharedFilesColumns }
            search
          >
            {
              props => (
                <div>
                  <SearchBar { ...props.searchProps } />
                  <BootstrapTable
                    { ...props.baseProps }
                    // rowStyle={rowStyle}
                    tdStyle={ {verticalAlign: 'middle' } }
                  />
                </div>
              )
            }
          </ToolkitProvider>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}