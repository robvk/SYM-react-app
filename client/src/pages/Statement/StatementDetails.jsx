import React from "react";
import style from "./StatementDetails.module.css";
import appStyle from "../../App.module.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error";

import { useEffect } from "react";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import StatementCard from "../../components/Statement/StatementCard";

const StatementDetails = () => {
  const { id } = useParams();
  const [statement, setStatement] = useState();

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

  return (
    <>
      <ProgressBar loading={isLoading} />
      <div className={style.statementPage}>
        <div className={style.statementContainer}>
          <h2 className={appStyle.headerOne}>Statement Details</h2>

          <div className={style.cardsDiv}>
            {statement && <div>{<StatementCard statement={statement} />}</div>}
          </div>
        </div>

        <Error error={error} transparent={true} />
      </div>
    </>
  );
};

export default StatementDetails;
