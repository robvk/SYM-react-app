import React, { useEffect, useState, useLayoutEffect } from "react";
import style from "./Dashboard.module.css";
import appStyle from "../../App.module.css";
// import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import useFetch from "../../hooks/useFetch";
import StatementCard from "./StatementCard";
import Error from "../../components/Error/Error";

function Feed() {
  // const navigate = useNavigate();
  const [statements, setStatements] = useState([]);

  // const [isClickedToAvailable, setIsClickedToAvailable] = useState(true);
  // const [pageToShow, setPageToShow] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  // function createJobHandler() {
  //   navigate("/statement/create", {
  //     replace: true,
  //   });
  // }

  const onSuccess = (onReceived) => {
    setStatements(onReceived.result.statements);
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    "/statements/",
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

  return (
    <>
      <ProgressBar loading={isLoading} />
      <div className={style.container}>
        <div>
          <h2 className={appStyle.headerOne}>FEED</h2>
        </div>

        <div className={style.buttonsAndCardsDiv}>
          <div className={style.cardsDiv}>
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
      {error != null && <Error error={error} />}
    </>
  );
}

export default Feed;
