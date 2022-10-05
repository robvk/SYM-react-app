import React from "react";
import PropTypes from "prop-types";
import styles from "./Error.module.css";
import appStyle from "../../App.module.css";

const Error = ({ error }) => {
  return (
    <div>
      <section className={styles.container}>
        <div className={appStyle.body}>
          {error && (
            <p>
              <strong>{error.toString()}</strong>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.any,
};
export default Error;
