import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

function Counter() {
  const [count, setCount] = useState(0);

  const backgroundColor = `rgba(0, 150, 255, ${Math.min(count / 100, 1)})`;

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => Math.max(prev - 1, 0));
  const handleReset = () => setCount(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "41vh",
        background: backgroundColor,
        transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Count: {count}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDecrement}
        >
          -
        </Button>
        
        <Button variant="contained" color="error" onClick={handleReset}>
          Reset
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleIncrement}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}

export default Counter;
