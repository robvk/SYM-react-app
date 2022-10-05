import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import styles from "./JobView.module.css";
import appStyles from "../../App.module.css";
import Input from "../../components/Input";
import { getCookie } from "../../hooks/useCookie";

const StatementView = ({ statementHandler }) => {
  const statementStartInputRef = useRef();
  const statementEndInputRef = useRef();

  const submitHandler = (e) => {
    const enteredStatementStart = statementStartInputRef.current.value;
    const enteredStatementEnd = statementEndInputRef.current.value;
    const dateNow = new Date();

    const statement = {
      userID: getCookie("userID"),
      statementStart: enteredStatementStart,
      statementEnd: enteredStatementEnd,
      fullStatement: enteredStatementStart + " " + enteredStatementEnd,
      votes: 1,
      dateCreated: dateNow,
    };

    e.preventDefault();
    statementHandler(statement);
  };

  return (
    <form className={styles.formClass} name="newStatement">
      <h2 className={appStyles.headerOne}>Share with the world!</h2>

      <Input
        name="statementStart"
        label="Subject"
        placeholder="In the morning i like to"
        type="text"
        required
        id="statementStart"
        // onChange={changeHandler}
        reference={statementStartInputRef}
        ariaLabel="statementStart"
      />

      <Input
        name="statementEnd"
        label="Statement"
        placeholder="start by having breakfast"
        type="text"
        required
        id="statementEnd"
        // onChange={changeHandler}
        reference={statementEndInputRef}
        ariaLabel="statementEnd"
      />

      <div className={styles.singleButton}>
        <Button type="submit" buttonHandler={submitHandler}>
          Submit
        </Button>
      </div>
    </form>
  );
};

StatementView.propTypes = {
  statementHandler: PropTypes.func.isRequired,
};

export default StatementView;
