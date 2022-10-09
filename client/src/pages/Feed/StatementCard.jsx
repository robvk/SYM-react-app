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
    upButton ? setUpButton("") : setUpButton(style.red);
    setDownButton("");
  };

  const downHandler = () => {
    downButton ? setDownButton("") : setDownButton(style.red);
    setUpButton("");
  };

  function splitString(str, length) {
    var words = str.split(" ");
    for (let j = 0; j < words.length; j++) {
      let l = words[j].length;
      if (l > length) {
        let result = [],
          i = 0;
        while (i < l) {
          result.push(words[j].substr(i, length));
          i += length;
        }
        words[j] = result.join(" ");
      }
    }
    return words.join(" ");
  }

  return (
    <div className={style.StatementCard}>
      <div className={style.cardContainer}>
        <div className={style.row}>
          <div className={style.column}>
            <p className={`${appStyle.boldBody} ${style.statement}`}>
              {splitString(fullStatement, 50)}
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
