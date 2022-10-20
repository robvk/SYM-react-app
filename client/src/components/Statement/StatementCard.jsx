// React
import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Style
import style from "./StatementCard.module.css";
import appStyle from "../../App.module.css";
// Icons
import { ImArrowUp, ImArrowDown, ImLoop2 } from "react-icons/im";
import { VscChromeClose } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
// Hooks
import useFetch from "../../hooks/useFetch";
import { getCookie } from "../../hooks/useCookie";
// Components
import Avatar from "../Avatar";
import Button from "../../components/Button";
import Error from "../Error/Error";
import splitString from "../../util/stringSplitting";
import NotifierContext from "../../context/NotifierContext";

function StatementCard(props) {
  // Ref
  const votes = useRef();
  const upVotes = useRef();
  const downVotes = useRef();
  const taggersID = useRef([]);
  const netTags = useRef();
  const statementEndInputRef = useRef("");
  const enteredInputRef = useRef("");
  const timer = useRef();
  const authorIDRef = useRef();
  const statementIDRef = useRef();
  const statementStartRef = useRef();
  // State
  const [tag, setTag] = useState(false);
  const [upButton, setUpButton] = useState("");
  const [downButton, setDownButton] = useState("");
  const [tagged, setTagged] = useState("");
  const [voteDecision, setVoteDecision] = useState("");
  const [author, setAuthor] = useState({
    username: "",
    symScore: "",
  });
  // Context
  const { notifier } = useContext(NotifierContext);

  useEffect(() => {
    authorIDRef.current = props.statement.userID;
    statementIDRef.current = props.statement._id;
    statementStartRef.current = props.statement.statementStart;
    netTags.current = props.statement.netTags ? props.statement.netTags : 0;
    taggersID.current = props.statement.taggersID;
    votes.current = props.statement.netVotes;
    upVotes.current = props.statement.upVotes;
    downVotes.current = props.statement.downVotes;

    performFetchUser({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    props.statement.upVotes.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");
    props.statement.downVotes.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");
    props.statement.taggersID.includes(getCookie("userID"))
      ? setTagged(style.red)
      : setTagged("");

    return cancelFetchUser, cancelComment;
  }, []);

  // Dealing with the server response
  const onSuccess = (onReceived) => {
    upVotes.current = onReceived.result.upVotes;
    downVotes.current = onReceived.result.downVotes;
    taggersID.current = onReceived.result.taggersID;
    votes.current = onReceived.result.netVotes;

    upVotes.current.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");

    downVotes.current.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");

    taggersID.current.includes(getCookie("userID"))
      ? setTagged(style.red)
      : setTagged("");
  };

  useEffect(() => {
    if (voteDecision) {
      performFetch({
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          statement: {
            userID: getCookie("userID"),
            vote: voteDecision,
          },
        }),
      });
    }
    return cancelFetch;
  }, [voteDecision]);

  const { performFetch, cancelFetch, error } = useFetch(
    `/statements/${props.statement._id}`,
    onSuccess
  );
  // user response
  const onSuccessUser = (onReceived) => {
    setAuthor(onReceived.result);
  };

  const {
    performFetch: performFetchUser,
    cancelFetch: cancelFetchUser,
    error: userError,
  } = useFetch(`/user/public/${props.statement.userID}`, onSuccessUser);

  // upVote Handler
  const upHandler = () => {
    upVotes.current.includes(getCookie("userID"))
      ? setVoteDecision("neutral")
      : setVoteDecision("up");
  };

  // downVote Handler
  const downHandler = () => {
    downVotes.current.includes(getCookie("userID"))
      ? setVoteDecision("neutral")
      : setVoteDecision("down");
  };

  // Tagging helpers & logic
  const tagThis = () => {
    if (tag) {
      setTag(false);
      clearTimeout(timer.current);
    } else {
      setTag(true);
    }
  };

  const tagThisTimer = () => {
    timer.current = setTimeout(() => {
      setTag(false);
    }, 5000);
  };

  const onCommentSuccess = (onReceived) => {
    setTag(false);
    setTagged(style.red);
    taggersID.current = onReceived.result.taggersID;
    netTags.current = onReceived.result.netTags;
    notifier("Successfully tagged this statement!");
  };

  const {
    error: commentError,
    performFetch: performCommentFetch,
    cancelFetch: cancelComment,
  } = useFetch("/comments/create", onCommentSuccess);

  const addTag = () => {
    const statementEnd = enteredInputRef.current;
    const userID = getCookie("userID");
    const authorID = authorIDRef.current;
    const statementID = statementIDRef.current;
    const statementStart = statementStartRef.current;

    const comment = {
      userID: userID,
      authorID: authorID,
      statementID: statementID,
      statementStart: statementStart,
      statementEnd: statementEnd,
    };

    performCommentFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
      }),
    });
  };

  const onChange = (e) => {
    enteredInputRef.current = e.target.value;
  };

  return (
    <div className={style.statementCard}>
      <div className={style.cardContainer}>
        <div className={style.row}>
          {commentError || error || userError ? (
            <Error
              error={commentError || error || userError}
              transparent={true}
            />
          ) : (
            <div className={style.column}>
              <div className={style.userData}>
                <p className={appStyle.body}>u/</p>
                <div className={style.avatar}>
                  <Avatar symScore={author.symScore} />
                </div>
                <Link
                  className={appStyle.body}
                  to={
                    getCookie("userID") === props.statement.userID
                      ? `/profile/${props.statement.userID}`
                      : `/profile/public/${props.statement.userID}`
                  }
                >
                  {author.username}
                </Link>
              </div>
              <div className={style.statement}>
                <Link to={`/statements/view/${props.statement._id}`}>
                  <p className={`${appStyle.boldBody} ${style.statementStart}`}>
                    {splitString(props.statement.statementStart, 50)}
                  </p>
                </Link>
                {!tag ? (
                  <Link to={`/statements/view/${props.statement._id}`}>
                    <p className={`${appStyle.body} ${style.statementEnd}`}>
                      ...{splitString(props.statement.statementEnd, 50)}
                    </p>
                  </Link>
                ) : (
                  <div
                    className={`${appStyle.body} ${style.statementEndInput}`}
                  >
                    {"..."}
                    <input
                      className={appStyle.body}
                      type="text"
                      maxLength="50"
                      placeholder="how would you have finished this statement?"
                      ref={statementEndInputRef}
                      defaultValue={enteredInputRef.current}
                      onBlur={tagThisTimer}
                      onChange={onChange}
                      required
                    />
                  </div>
                )}
              </div>
              <div className={style.statsContainer}>
                <div className={style.voteContainer}>
                  <button className={appStyle.body} onClick={upHandler}>
                    <ImArrowUp className={upButton} title="Up Vote" />
                  </button>
                  <p className={appStyle.body}>{votes.current}</p>
                  <button className={appStyle.body} onClick={downHandler}>
                    <ImArrowDown className={downButton} title="Down Vote" />
                  </button>
                </div>
                <div className={style.taggers}>
                  <p className={appStyle.body}>{netTags.current}</p>
                  {tag ? (
                    <VscChromeClose
                      onClick={tagThis}
                      style={{
                        minWidth: "22px",
                        marginLeft: "-3px",
                      }}
                    />
                  ) : (
                    <ImLoop2
                      className={tagged}
                      onClick={tagThis}
                      title="This shows how many tags this statement currently has"
                    />
                  )}
                </div>
                <div className={style.totalUsers}>
                  <p className={appStyle.body}>{taggersID.current.length}</p>
                  <FiUsers title="This shows how many people have tagged on this statement" />
                </div>
                {tag && (
                  <div className={style.tagButton}>
                    <Button buttonHandler={addTag}>Post</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatementCard;

StatementCard.propTypes = {
  statement: PropTypes.object.isRequired,
  commentLoading: PropTypes.bool.isRequired,
};
