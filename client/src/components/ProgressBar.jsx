import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import style from "./ProgressBar.module.css";

const ProgressBar = () => {
  return (
    <Box sx={{ width: "100%" }} className={style.box}>
      <LinearProgress color="inherit" className={style.bar} />
    </Box>
  );
};

export default ProgressBar;
