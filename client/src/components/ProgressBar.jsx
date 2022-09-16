import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import style from "./ProgressBar.module.css";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
  return (
    <div className={style.loadingDiv}>
      {props.loading && (
        <Box sx={{ width: "100%" }} className={style.box}>
          <LinearProgress color="inherit" className={style.bar} />
        </Box>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  loading: PropTypes.bool,
};

export default ProgressBar;
