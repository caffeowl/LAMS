import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Session = () => {
  const [sessions, setSessions] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({
    sessionName: "",
    facultyId: "",
    timeSlot: "",
  });

  // Fetch sessions and faculty
  useEffect(() => {
    fetchSessions();
    fetchFaculty();
  }, []);

  const fetchSessions = async () => {
    const response = await axios.get("http://localhost:1337/sessions");
    setSessions(response.data);
  };

  const fetchFaculty = async () => {
    const response = await axios.get("http://localhost:1337/faculty");
    setFaculty(response.data);
  };

  const handleCreateSession = async () => {
    if (parseInt(newSession.timeSlot) > 30) {
      alert("Timeslot must not exceed 30 minutes.");
      return;
    }

    await axios.post("http://localhost:1337/sessions", newSession);
    fetchSessions();
    setShowModal(false);
    setNewSession({ sessionName: "", facultyId: "", timeSlot: "" });
  };

  const handleDeleteSession = async (id) => {
    await axios.delete(`http://localhost:1337/sessions/${id}`);
    fetchSessions();
  };

  return (
    <div className="container mt-4">
      <h1>Session Management</h1>
      <Button onClick={() => setShowModal(true)} variant="primary">
        Add Session
      </Button>

      <div className="mt-4">
        {sessions.map((session) => (
          <Card key={session.id} className="mb-3">
            <Card.Body>
              <Card.Title>{session.sessionName}</Card.Title>
              <Card.Text>
                Faculty: {session.facultyName} <br />
                Department: {session.department} <br />
                Course: {session.course} <br />
                Timeslot: {session.timeSlot} mins
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => handleDeleteSession(session.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Session Name</Form.Label>
              <Form.Control
                type="text"
                value={newSession.sessionName}
                onChange={(e) =>
                  setNewSession({ ...newSession, sessionName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Faculty</Form.Label>
              <Form.Select
                value={newSession.facultyId}
                onChange={(e) =>
                  setNewSession({ ...newSession, facultyId: e.target.value })
                }
              >
                <option value="">Select Faculty</option>
                {faculty.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} - {fac.department}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Timeslot (in minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newSession.timeSlot}
                onChange={(e) =>
                  setNewSession({ ...newSession, timeSlot: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateSession}>
            Create Session
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Session;
