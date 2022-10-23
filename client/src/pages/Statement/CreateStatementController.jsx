// React
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Hooks
import useFetch from "../../hooks/useFetch";
// Component
import StatementForm from "./StatementForm";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";
import BackgroundImage from "../../components/BackgroundImage";
// Context
import NotifierContext from "../../context/NotifierContext";

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
  // Cancel fetch
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
      <StatementForm statementHandler={statementHandler} />
      <Error error={error} transparent={true} />
    </div>
  );
};

export default CreateStatementController;
