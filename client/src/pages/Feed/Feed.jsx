import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import style from "./Feed.module.css";
import appStyle from "../../App.module.css";
// import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import useFetch from "../../hooks/useFetch";
import StatementCard from "./StatementCard";
import Error from "../../components/Error/Error";

function Feed() {
  // const navigate = useNavigate();
  const [statements, setStatements] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const listInnerRef = useRef();
  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function createJobHandler() {
  //   navigate("/statement/create", {
  //     replace: true,
  //   });
  // }

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
    <div className={style.homePage}>
      <ProgressBar loading={isLoading} />
      <div className={style.container}>
        <div>
          <h2 className={appStyle.headerOne}>Home</h2>
        </div>

        <div className={style.cardsDiv} onScroll={onScroll} ref={listInnerRef}>
          <ul>
            {statements ? (
              statements?.map((statement, index) => (
                <li key={index}>{<StatementCard statement={statement} />}</li>
              ))
            ) : (
              <p>It seems like there are no statements.</p>
            )}
          </ul>
        </div>
      </div>

      <Error error={error} transparent={true} />
    </div>
  );
}

export default Feed;
