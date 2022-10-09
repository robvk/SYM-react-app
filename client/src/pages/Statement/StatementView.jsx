import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import styles from "./StatementView.module.css";
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
      dateCreated: dateNow,
    };

    e.preventDefault();
    statementHandler(statement);
  };

  return (
    <div className={styles.createStatementPage}>
      <form className={styles.formClass} name="newStatement">
        <h2 className={appStyles.headerOne}>Share with the world!</h2>
        <div className={styles.statementInputs}>
          <Input
            name="statementStart"
            label="Subject (50 char max)"
            placeholder="In the morning i like to"
            type="text"
            required
            id="statementStart"
            reference={statementStartInputRef}
            ariaLabel="statementStart"
            length="50"
          />

          <Input
            name="statementEnd"
            label="Statement (100 char max)"
            placeholder="start by having breakfast"
            type="text"
            required
            id="statementEnd"
            reference={statementEndInputRef}
            ariaLabel="statementEnd"
            length="100"
            textArea={true}
          />
        </div>
        <div className={styles.buttonsDiv}>
          <div className={styles.singleButton}>
            <Button type="button" path="/feed" class="buttonBorder">
              Cancel
            </Button>
          </div>
          <div className={styles.singleButton}>
            <Button type="submit" buttonHandler={submitHandler}>
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

StatementView.propTypes = {
  statementHandler: PropTypes.func.isRequired,
};

export default StatementView;
