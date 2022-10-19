import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { getCookie } from "../../hooks/useCookie";
import appStyle from "../../App.module.css";
import style from "./Comments.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../Error/Error";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import splitString from "../../util/stringSplitting";

const Comments = (props) => {
  const [upButton, setUpButton] = useState("");
  const [downButton, setDownButton] = useState("");
  const [voteDecision, setVoteDecision] = useState("");
  const [author, setAuthor] = useState({
    username: "",
    symScore: "",
  });

  const votes = useRef();
  const upVotes = useRef();
  const downVotes = useRef();

  useEffect(() => {
    upVotes.current = props.comment.upVotes;
    downVotes.current = props.comment.downVotes;
    votes.current = props.comment.netVotes;

    performFetchUser({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    props.comment.upVotes.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");

    props.comment.downVotes.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");

    return cancelFetchUser;
  }, []);

  const onSuccess = (onReceived) => {
    upVotes.current = onReceived.result.upVotes;
    downVotes.current = onReceived.result.downVotes;
    votes.current = onReceived.result.netVotes;

    upVotes.current.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");

    downVotes.current.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");
  };

  const { performFetch, cancelFetch, error } = useFetch(
    `/comments/${props.comment._id}`,
    onSuccess
  );

  useEffect(() => {
    if (voteDecision) {
      performFetch({
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          comment: {
            userID: getCookie("userID"),
            vote: voteDecision,
          },
        }),
      });
    }
    return cancelFetch;
  }, [voteDecision]);

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

  // user response
  const onSuccessUser = (onReceived) => {
    setAuthor(onReceived.result);
  };

  const {
    performFetch: performFetchUser,
    cancelFetch: cancelFetchUser,
    error: userError,
  } = useFetch(`/user/public/${props.comment.userID}`, onSuccessUser);

  return (
    <div className={style.commentContainer}>
      <div className={style.column}>
        <div className={style.userData}>
          <p className={appStyle.body}>u/</p>
          <div className={style.avatar}>
            <Avatar symScore={author.symScore} />
          </div>
          <Link
            className={appStyle.body}
            to={
              getCookie("userID") === props.comment.userID
                ? `/profile/${props.comment.userID}`
                : `/profile/public/${props.comment.userID}`
            }
          >
            {author.username}
          </Link>
        </div>
        <p className={`${appStyle.body} ${style.statementEnd}`}>
          ...{splitString(props.comment.statementEnd, 50)}
        </p>
        <p className={style.space}>.</p>
      </div>

      <div className={style.voteContainer}>
        <button className={appStyle.body} onClick={upHandler}>
          <ImArrowUp className={upButton} title="Up Vote" />
        </button>

        {error ? (
          <Error error={error || userError} transparent={true} />
        ) : (
          <p className={appStyle.body}>{votes.current}</p>
        )}
        <button className={appStyle.body} onClick={downHandler}>
          <ImArrowDown className={downButton} title="Down Vote" />
        </button>
      </div>
    </div>
  );
};

export default Comments;

Comments.propTypes = {
  comment: PropTypes.any.isRequired,
};
