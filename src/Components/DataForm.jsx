import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

function DataForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 500 },
  });

  
  useEffect(() => {
    const originalValues = { name: "", address: "", phone: "", email: "" };
    const currentValues = { name, address, phone, email };

    const hasChanges = Object.keys(currentValues).some(
      (key) => currentValues[key] !== originalValues[key]
    );
    setIsFormDirty(hasChanges);
  }, [name, address, phone, email]);

  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = ""; 
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, address, phone, email });    
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setIsFormDirty(false);
  };

  return (
    <animated.div style={formAnimation}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          User Data Form
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap="15px"
        >
          <TextField
            label="Name"
            required
            id="outlined-required"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Address"
            required
            id="outlined-required"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Phone"
            required
            id="outlined-required"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Email"
            required
            id="outlined-required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </animated.div>
  );
}

export default DataForm;
