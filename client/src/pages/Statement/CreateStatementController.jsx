import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import StatementView from "./StatementView";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
import NotifierContext from "../../context/NotifierContext";
import BackgroundImage from "../../components/BackgroundImage";

const CreateStatementController = () => {
  const navigate = useNavigate();
  // Context
  const { notifier } = useContext(NotifierContext);

  const onSuccess = () => {
    navigate("/feed", {
      replace: true,
    });
    notifier("Statement successfully posted!");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/statements/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const statementHandler = (statement) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        statement,
      }),
    });
  };

  return (
    <div>
      <ProgressBar loading={isLoading} />
      <BackgroundImage still={true} space={true} />
      <StatementView statementHandler={statementHandler} />
      <Error error={error} transparent={true} />
    </div>
  );
};

export default CreateStatementController;
