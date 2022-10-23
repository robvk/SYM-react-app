import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import style from "./StatementForm.module.css";
import appStyle from "../../App.module.css";
import Input from "../../components/Input";
import { getCookie } from "../../hooks/useCookie";

const StatementView = ({ statementHandler }) => {
  const statementStartInputRef = useRef();
  const statementEndInputRef = useRef();

  const [charOne, setCharOne] = useState(50);
  const [charTwo, setCharTwo] = useState(50);

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

  const charCountOne = (e) => {
    const remainingChar = 50 - e.target.value.length;
    setCharOne(remainingChar);
  };
  const charCountTwo = (e) => {
    const remainingChar = 50 - e.target.value.length;
    setCharTwo(remainingChar);
  };

  return (
    <div className={style.createStatementPage}>
      <div className={style.glassDiv}>
        <form className={style.formClass} name="newStatement">
          <h2 className={appStyle.headerOne}>Share with the world!</h2>
          <div className={style.statementInputs}>
            <Input
              name="statementStart"
              label={`Subject (${charOne} char max)`}
              placeholder="In the morning i like to"
              type="text"
              required
              id="statementStart"
              reference={statementStartInputRef}
              ariaLabel="statementStart"
              length="50"
              onChange={charCountOne}
            />

            <Input
              name="statementEnd"
              label={`Statement (${charTwo} char max)`}
              placeholder="start by having breakfast"
              type="text"
              required
              id="statementEnd"
              reference={statementEndInputRef}
              ariaLabel="statementEnd"
              length="50"
              textArea={true}
              onChange={charCountTwo}
            />
          </div>
          <div className={style.buttonsDiv}>
            <div className={style.singleButton}>
              <Button type="submit" buttonHandler={submitHandler}>
                Post
              </Button>
            </div>
            <div className={style.singleButton}>
              <Button type="button" path="/feed" class="buttonBorder">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

StatementView.propTypes = {
  statementHandler: PropTypes.func.isRequired,
};

export default StatementView;
