import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import './addpc.css';
export default function AddPCPage() {
  const [showModal, setShowModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false); // For adding a lab
  const [devicename, setDevicename] = useState('');
  const [ram, setRam] = useState('');
  const [processor, setProcessor] = useState('');
  const [pcData, setPcData] = useState([]);
  const [labData, setLabData] = useState([]); // Lab data
  const [selectedLab, setSelectedLab] = useState(null); // Lab selection for PC
  const [labNumber, setLabNumber] = useState('');
  const [floor, setFloor] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleOpenLabModal = () => setShowLabModal(true);
  const handleCloseLabModal = () => {
    setShowLabModal(false);
    setLabNumber('');
    setFloor('');
  };

  const handleFetchDetails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/system-details');
      const { ram, processor } = response.data;
      setRam(ram);
      setProcessor(processor);
    } catch (error) {
      console.error('Error fetching system details:', error);
      alert('Failed to fetch system details.');
    }
  };

  const resetForm = () => {
    setDevicename('');
    setRam('');
    setProcessor('');
  };

  const handleAddPC = async () => {
    if (!devicename || !ram || !processor || !selectedLab) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/addpc', {
        devicename,
        ram,
        processor,
        labId: selectedLab, // Include lab ID when adding PC
      });

      if (response.data.success) {
        alert(response.data.message);
        fetchPcDetails();
        handleCloseModal();
      } else {
        alert('Failed to add PC details: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error while adding PC details:', error);
      alert('An error occurred while adding PC details.');
    }
  };

  const handleAddLab = async () => {
    if (!labNumber || !floor) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/addlab', {
        labNumber,
        floor,
      });

      console.log('Response:', response.data); // Debugging log

      if (response.data.success) {
        alert('Lab added successfully!');
        fetchLabDetails();
        handleCloseLabModal();
      } else {
        alert('Failed to add lab: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error while adding lab:', error);
      alert('An error occurred while adding the lab.');
    }
  };


  const fetchLabDetails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/labs');
      setLabData(response.data);
    } catch (error) {
      console.error('Error fetching lab details:', error);
    }
  };

  const fetchPcDetails = async () => {
    try {
      const response = await axios.get('http://localhost:1337/pcs');
      setPcData(response.data);
    } catch (error) {
      console.error('Error fetching PC details:', error);
    }
  };

  useEffect(() => {
    fetchLabDetails();
    fetchPcDetails();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'devicename', headerName: 'Device Name', width: 200 },
    { field: 'ram', headerName: 'RAM', width: 150 },
    { field: 'processor', headerName: 'Processor', width: 250 },
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleOpenModal}>
          Add PC
        </Button>
        <Button variant="secondary" onClick={handleOpenLabModal} className="ml-3">
          Add Lab
        </Button>
      </div>

      {/* Lab Cards */}
      <div className="d-flex flex-wrap">
        {labData.map((lab) => (
          <div key={lab.id} className="card m-2" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Lab {lab.labNumber}</h5>
              <p className="card-text">Floor: {lab.floor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PC DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pcData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
        />
      </div>

      {/* Add Lab Modal */}
      <Modal show={showLabModal} onHide={handleCloseLabModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Lab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="labNumber">
              <Form.Label>Lab Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lab Number"
                value={labNumber}
                onChange={(e) => setLabNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="floor">
              <Form.Label>Floor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLabModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddLab}>
            Add Lab
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add PC Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add PC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="deviceName">
              <Form.Label>Device Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter device name"
                value={devicename}
                onChange={(e) => setDevicename(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ram">
              <Form.Label>RAM</Form.Label>
              <Form.Control
                type="text"
                value={ram}
                placeholder="Click fetch to get RAM details"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="processor">
              <Form.Label>Processor</Form.Label>
              <Form.Control
                type="text"
                value={processor}
                placeholder="Click fetch to get processor details"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lab">
              <Form.Label>Select Lab</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedLab(e.target.value)}
                value={selectedLab}
              >
                <option value="">Select Lab</option>
                {labData.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    Lab {lab.labnumber} - Floor {lab.floor}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" onClick={handleFetchDetails}>
              Fetch
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPC}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
