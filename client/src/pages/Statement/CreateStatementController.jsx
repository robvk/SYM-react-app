import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import StatementView from "./StatementView";
import Error from "../../components/Error/Error";
import ProgressBar from "../../components/ProgressBar";

const CreateStatementController = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/feed", {
      replace: true,
    });
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
      <StatementView statementHandler={statementHandler} />
      <Error error={error} transparent={true} />
    </div>
  );
};

export default CreateStatementController;
