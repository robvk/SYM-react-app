import React, { useEffect, useState, useRef } from "react";
import style from "./Feed.module.css";
import appStyle from "../../App.module.css";
import ProgressBar from "../../components/ProgressBar";
import useFetch from "../../hooks/useFetch";
import StatementCard from "../../components/Statement/StatementCard";
import Error from "../../components/Error/Error";
import { Link } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import BackgroundImage from "../../components/BackgroundImage";

function Feed() {
  const [statements, setStatements] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const listInnerRef = useRef();
  const [page, setPage] = useState(0);

  const onSuccess = (onReceived) => {
    setStatements([...statements, ...onReceived.result.statements]);
    if (!onReceived.result.statements.length) {
      setIsDone(true);
    }
  };

  const limit = 10;
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/statements/?skip=${page}&limit=${limit}`,
    onSuccess
  );

  useEffect(() => {
    if (!isDone) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
    }
    return cancelFetch;
  }, [page]);

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
      <ProgressBar loading={isLoading} />

      <div className={style.homePage}>
        <BackgroundImage />
        <div className={style.container}>
          <h2 className={appStyle.headerOne}>Home</h2>

          <div
            className={style.cardsDiv}
            onScroll={onScroll}
            ref={listInnerRef}
          >
            <ul>
              {!statements.length && (
                <div className={style.noStatements}>
                  <p className={appStyle.body}>
                    Oops, looks like you&apos;re early, make a statement!
                  </p>
                  <Link className={style.plus} key="0" to="/statements/create">
                    <VscAdd />
                  </Link>
                </div>
              )}
              {statements?.map((statement, index) => (
                <li key={index}>
                  {
                    <StatementCard
                      statement={statement}
                      cardLoading={isLoading}
                    />
                  }
                </li>
              ))}
            </ul>
          </div>
          <Error error={error} />
        </div>
      </div>
    </>
  );
}

export default Feed;
