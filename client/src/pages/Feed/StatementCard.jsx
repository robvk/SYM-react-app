import React, { useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import style from "./StatementCard.module.css";
import appStyle from "../../App.module.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

function StatementCard({ statement }) {
  const [upButton, setUpButton] = useState("");
  const [downButton, setDownButton] = useState("");

  const {
    // dateCreated,
    fullStatement,
    // statementEnd,
    // statementStart,
    taggersID,
    // userID,
    votes,
  } = statement;

  // const navigate = useNavigate();

  // function toDetail(e) {
  //   e.preventDefault();
  //   navigate(`/statement/view/${statement._id}`);
  // }
  const upHandler = () => {
    setUpButton(style.red);
    setDownButton("");
  };

  const downHandler = () => {
    setDownButton(style.red);
    setUpButton("");
  };

  return (
    <div className={style.StatementCard}>
      <div className={style.cardContainer}>
        <div className={style.row}>
          <div className={style.column}>
            <p className={`${appStyle.boldBody} ${style.statement}`}>
              {fullStatement}
            </p>
            <p className={`${appStyle.body} ${style.taggers}`}>
              {taggersID.length} taggers
            </p>
          </div>
          <div className={style.voteContainer}>
            <button className={appStyle.body} onClick={upHandler}>
              <ImArrowUp className={upButton} />
            </button>
            <p className={appStyle.body}>{votes}</p>
            <button className={appStyle.body} onClick={downHandler}>
              <ImArrowDown className={downButton} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatementCard;

StatementCard.propTypes = {
  statement: PropTypes.object.isRequired,
};
