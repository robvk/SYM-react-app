import React, { useEffect, useRef, useState } from "react";
import appStyle from "../../App.module.css";
import useFetch from "../../hooks/useFetch";
import StatementCard from "../../components/StatementCard";
import style from "../Profile/ProfilePage.module.css";
import { useParams } from "react-router-dom";

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
                  <li key={index}>{<StatementCard statement={statement} />}</li>
                ))
              ) : (
                <p>It seems like there are no statements.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveStatements;
