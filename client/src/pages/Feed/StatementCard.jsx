import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import style from "./StatementCard.module.css";
import appStyle from "../../App.module.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import useFetch from "../../hooks/useFetch";
import { getCookie } from "../../hooks/useCookie";
import { useRef } from "react";

function StatementCard({ statement }) {
  const [upButton, setUpButton] = useState("");
  const [downButton, setDownButton] = useState("");
  // const [votes, setVotes] = useState();
  const votes = useRef();

  const [statementData, setStatementData] = useState({
    dateCreated: "",
    fullStatement: "",
    statementEnd: "",
    statementStart: "",
    taggersID: "",
    userID: "",
    upVotes: [],
    downVotes: [],
    _id: "",
  });

  const {
    dateCreated,
    fullStatement,
    statementEnd,
    statementStart,
    taggersID,
    userID,
    upVotes,
    downVotes,
    _id,
  } = statement;

  // Split long single words into max length
  function splitString(str, length) {
    let words = str.split(" ");
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

  useEffect(() => {
    setStatementData({
      dateCreated: dateCreated,
      fullStatement: splitString(fullStatement, 50),
      statementEnd: statementEnd,
      statementStart: statementStart,
      taggersID: taggersID,
      userID: userID,
      upVotes: upVotes,
      downVotes: downVotes,
      _id: _id,
    });

    return cancelFetch;
  }, []);

  useEffect(() => {
    votes.current =
      statementData?.upVotes?.length - statementData?.downVotes?.length;

    // setVotes(statementData.upVotes.length - statementData.downVotes.length);

    if (statementData.upVotes.includes(getCookie("userID"))) {
      setUpButton(style.red);
    } else {
      setUpButton("");

      if (statementData.downVotes.includes(getCookie("userID"))) {
        setDownButton(style.red);
      } else {
        setDownButton("");
      }
    }
  }, [statementData]);

  const onSuccess = (onReceived) => {
    setStatementData({ onReceived });
    console.log("successfully updated", onReceived);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/statements/${_id}`,
    onSuccess
  );

  // const navigate = useNavigate();

  // function toDetail(e) {
  //   e.preventDefault();
  //   navigate(`/statement/view/${statement._id}`);
  // }
  const upHandler = () => {
    if (statementData.upVotes.includes(getCookie("userID"))) {
      let newUpVotes = statementData.upVotes.filter(
        (user) => user !== getCookie("userID")
      );
      setStatementData({ ...statementData, upVotes: newUpVotes });
      // setUpButton("");
    } else {
      setStatementData({
        ...statementData,
        upVotes: [...statementData.upVotes, getCookie("userID")],
      });
    }

    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ statement: statementData }),
    });
  };

  const downHandler = () => {
    if (statementData.downVotes.includes(getCookie("userID"))) {
      let newDownVotes = statementData.downVotes.filter(
        (user) => user !== getCookie("userID")
      );
      setStatementData({ ...statementData, downVotes: newDownVotes });
      // setDownButton("");
    } else {
      setStatementData({
        ...statementData,
        downVotes: [...statementData.downVotes, getCookie("userID")],
      });
    }

    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ statement: statementData }),
    });
  };

  return (
    <div className={style.statementCard}>
      <div className={style.cardContainer}>
        <div className={style.row}>
          <div className={style.column}>
            <p className={`${appStyle.boldBody} ${style.statement}`}>
              {statementData.fullStatement}
            </p>
            <p className={`${appStyle.body} ${style.taggers}`}>
              {statementData.taggersID.length} taggers
            </p>
          </div>
          <div className={style.voteContainer}>
            <button className={appStyle.body} onClick={upHandler}>
              <ImArrowUp className={upButton} />
            </button>
            <p className={appStyle.body}>{votes.current}</p>
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
