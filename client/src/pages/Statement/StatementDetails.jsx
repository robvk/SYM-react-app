import React, { useRef } from "react";
import style from "./StatementDetails.module.css";
import appStyle from "../../App.module.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";

import { useEffect } from "react";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import StatementCard from "../../components/Statement/StatementCard";

import Comments from "../../components/Statement/Comments";
import splitString from "../../util/stringSplitting";

const StatementDetails = () => {
  const { id } = useParams();
  const [statement, setStatement] = useState();
  const [comments, setComments] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [page, setPage] = useState(0);
  const listInnerRef = useRef();

  // Initial Fetch
  const onSuccess = (onReceived) => {
    setStatement(onReceived.result);
  };
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/statements/${id}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  // Fetch Comments
  const onSuccessComments = (onReceived) => {
    setComments([...comments, ...onReceived.result.comments]);
    if (!onReceived.result.comments?.length) {
      setIsDone(true);
    }
  };

  useEffect(() => {
    if (!isDone) {
      commentsFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
    }
    return cancelComments;
  }, [page]);

  const limit = 10;
  const {
    error: commentsError,
    isLoading: commentsLoading,
    performFetch: commentsFetch,
    cancelFetch: cancelComments,
  } = useFetch(
    `/comments/${id}/?skip=${page}&limit=${limit}`,
    onSuccessComments
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + limit);
      }
    }
  };

  return (
    <>
      <ProgressBar loading={isLoading || commentsLoading} />
      <div className={style.statementPage}>
        <h2 className={appStyle.headerOne}>Original Post</h2>
        <div className={style.cardsDiv}>
          {statement && <div>{<StatementCard statement={statement} />}</div>}
        </div>

        <div className={style.tagsDiv}>
          {comments.length !== 0 && (
            <h2 className={appStyle.body}>
              How others are completing this statement
            </h2>
          )}
          {comments.length !== 0 && (
            <div className={style.statementStartDiv}>
              <h2 className={`${style.statementStart} ${appStyle.headerOne}`}>
                {statement && splitString(statement.statementStart, 50)}
              </h2>
            </div>
          )}

          <div
            className={style.commentsDiv}
            onScroll={onScroll}
            ref={listInnerRef}
          >
            <ul>
              {comments.length ? (
                comments?.map((comment, index) => (
                  <li key={index}>{<Comments comment={comment} />}</li>
                ))
              ) : (
                <div className={style.noComments}>
                  <p className={appStyle.body}>
                    Oops, looks like you&apos;re the first one here, tag on this
                    statement!
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>

        <Error error={error || commentsError} transparent={true} />
      </div>
    </>
  );
};

export default StatementDetails;
