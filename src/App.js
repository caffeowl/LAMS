import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useState } from "react";
import Login from "./pages/login";
import Attend from "./pages/attend";
import Admin from "./pages/Admin/admin";
import Adlogin from "./pages/Admin/Adminlogin";
import ProtectedRoute from "./pages/protectroute";
import ProtectedAdmin from "./pages/Admin/protectedadmin";
import NotAllowed from "./notallowed";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: "white !important",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
        text: {
          fill: "black",
        },
      },
    },
  },
});
function App() {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const updateMobileStatus = () => {
  //     const userAgent = navigator.userAgent;
  //     const isMobileDevice = /webOS|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);
  //     setIsMobile(isMobileDevice);
  //   };

  //   updateMobileStatus();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login />
            }
          />
          <Route
            path="/attend"
            element={
              <ProtectedRoute>
                <ThemeProvider theme={theme}>
                  <Attend />
                </ThemeProvider>

              </ProtectedRoute>
            }
          />
          <Route path="/adminlogin" element={<Adlogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />
          <Route path="/not-allowed" element={<NotAllowed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;