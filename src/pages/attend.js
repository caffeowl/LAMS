import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import './attend.css';

// Dummy data for PC dropdown
const pcs = [
  { id: 1, devicename: "CS01" }
];

const steps = ["Student Details", "Select PC", "OTP Verification"];

const Attend = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState({
    regNumber: "112305007",
    name: "Kandacharam Likhitha",
    course: "MCA",
    semester: "III",
    facultyName: "Dr.M.Kannan",
    labNumber: "LAB 1",
  });
  const [selectedPC, setSelectedPC] = useState("");
  const [otp, setOtp] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown); // Clean up timer
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendOtp = () => {
    setTimer(120); // Start a 2-minute timer
    alert("OTP Sent!");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStudentDetails({
      regNumber: "",
      name: "",
      course: "",
      semester: "",
      facultyName: "",
      labNumber: "",
    });
    setSelectedPC("");
    setOtp("");
    setTimer(0);
  };

  const handleSubmit = () => {
    console.log("Attendance Submitted:");
    console.log("Student Details:", studentDetails);
    console.log("Selected PC:", selectedPC);
    console.log("OTP:", otp);
    alert("Attendance Submitted Successfully!");
    setOpenModal(true); // Open modal after submission
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('reg');
    navigate('/', { replace: true });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Register Number"
                value={studentDetails.regNumber}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    regNumber: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={studentDetails.name}
                onChange={(e) =>
                  setStudentDetails({ ...studentDetails, name: e.target.value })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course"
                value={studentDetails.course}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    course: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Semester"
                value={studentDetails.semester}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    semester: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Faculty Name"
                value={studentDetails.facultyName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    facultyName: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lab Number"
                value={studentDetails.labNumber}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    labNumber: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" } }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <TextField
            select
            fullWidth
            label="Select PC"
            value={selectedPC}
            onChange={(e) => setSelectedPC(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
              "& .MuiSelect-icon": { color: "white" },
            }}
          >
            {pcs.map((pc) => (
              <MenuItem
                key={pc.id}
                value={pc.devicename}
                sx={{
                  color: "black",
                  bgcolor: "white",
                  "&.Mui-selected": { bgcolor: "gray", color: "white" },
                  "&:hover": { bgcolor: "lightgray" },
                }}
              >
                {pc.devicename}
              </MenuItem>
            ))}
          </TextField>
        );
      case 2:
        return (
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{ input: { color: "white" }, marginRight: 1 }}
            />
            <Button
            fullWidth="true"
              variant="contained"
              color="primary"
              onClick={handleSendOtp}
              disabled={timer > 0}
            >
              {timer > 0 ? formatTime(timer) : "Send OTP"}
            </Button>
          </Box>
        );
      default:
        return <Typography variant="h6">Unknown Step</Typography>;
    }
  };

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        marginTop: 4,
        bgcolor: "black",
        color: "white",
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Attendance Page
      </Typography>
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "white" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              All steps completed
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ marginBottom: 3 }}>{renderStepContent(activeStep)}</Box>
            <Box display="flex" justifyContent="space-between">
              {activeStep > 0 && (
                <Button variant="outlined" onClick={handleBack}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Logout Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <Typography>Do you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">
            Yes
          </Button>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attend;
