import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Theme
import { themeSettings } from "theme";

// Scenes
import {
  Layout,
  Dashboard,
  Products,
  Customers,
  Reports,
  Geography,
  Overview,
  Schedule,
  Charger,
  Vehicle,
  Admin,
  Driver,
} from "scenes";
// import { Schedule } from "@mui/icons-material";

// App
const App = () => {
  // Dark/Light mode
  const mode = useSelector((state) => state.global.mode);
  // theme setting
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        {/* Theme Provider */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/charger" element={<Charger />} />
              <Route path="/vehicles" element={<Vehicle />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/drivers" element={<Driver />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
