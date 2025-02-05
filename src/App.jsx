import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Counter from "./Components/Counter";
import DataForm from "./Components/DataForm";
import RichTextEditor from "./Components/RichTextEditor";

const userProfileData = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 45 },
  { name: "Mar", users: 50 },
  { name: "Apr", users: 70 },
  { name: "May", users: 90 },
  { name: "Jun", users: 120 },
];

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Counter
          </Typography>
          <Counter />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            User Profile Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userProfileData}>
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

function App() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/data-form">
            Data Form
          </Button>
          <Button color="inherit" component={Link} to="/rich-text-editor">
            Rich Text Editor
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <animated.div style={fadeIn}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-form" element={<DataForm />} />
            <Route path="/rich-text-editor" element={<RichTextEditor />} />
            <Route
              path="/"
              element={
                <Typography variant="h4">
                  Welcome to the App!
                </Typography>
              }
            />
          </Routes>
        </animated.div>
      </Container>
    </Router>
  );
}

export default App;
