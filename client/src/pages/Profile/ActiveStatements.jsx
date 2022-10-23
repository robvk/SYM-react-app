// React
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// Style
import appStyle from "../../App.module.css";
import style from "../Profile/ProfilePage.module.css";
// Hooks
import useFetch from "../../hooks/useFetch";
// Component
import StatementCard from "../../components/Statement/StatementCard";

const ActiveStatements = () => {
  const { id } = useParams();
  const [statements, setStatements] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const listInnerRef = useRef();
  const [page, setPage] = useState(0);

  const statementOnSuccess = (onReceived) => {
    setStatements([...statements, ...onReceived.result.statements]);
    if (!onReceived.result.statements.length) {
      setIsDone(true);
    }
  };

  const limit = 20;
  const { performFetch, cancelFetch } = useFetch(
    `/statements/user_statements/${id}?skip=${page}&limit=${limit}`,
    statementOnSuccess
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

  // Detect when the user scrolls to the bottom of the div
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + limit);
      }
    }
  };

  return (
    <div>
      {statements.length !== 0 && (
        <div>
          <div className={style.statementInformation}>
            <h2 className={`${style.subTitle} ${appStyle.boldBody}`}>
              Active Statements
            </h2>
            <div
              className={style.cardsDiv}
              onScroll={onScroll}
              ref={listInnerRef}
            >
              <ul>
                {statements ? (
                  statements?.map((statement, index) => (
                    <li key={index}>
                      {<StatementCard statement={statement} />}
                    </li>
                  ))
                ) : (
                  <p>It seems like there are no statements.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveStatements;
