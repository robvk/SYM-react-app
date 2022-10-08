import React, { useLayoutEffect, useEffect } from "react";
import styles from "./About.module.css";
import appStyle from "../../App.module.css";
import useFetch from "../../hooks/useFetch";
import ProgressBar from "../../components/ProgressBar";

const About = () => {
  // const [availableJobAmount, setAvailableJobAmount] = useState();
  // const [takenJobAmount, setTakenJobAmount] = useState();
  // const [sendersAmount, setSendersAmount] = useState();
  // const [deliverersAmount, setDeliverersAmount] = useState();

  // const onSuccess = (onReceived) => {
  //   setAvailableJobAmount(onReceived.result.numOfAvailableJobs);
  //   setTakenJobAmount(onReceived.result.numOfTakenJobs);
  //   setSendersAmount(onReceived.result.numOfSenders);
  //   setDeliverersAmount(onReceived.result.numOfDeliverers);
  // };

  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/graphs/values"
    // onSuccess
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
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <ProgressBar loading={isLoading} />
      <div className={styles.aboutSection}>
        <h1 className={appStyle.h1Desktop}>About SYM</h1>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <p className={appStyle.h2Desktop}>
              Make a statement, the world is waiting..
            </p>
          </div>
          <div className={styles.paragraphContainer}></div>
        </div>
      </div>
      <div className={styles.teamSection}>
        <div className={styles.title}>
          <h3 className={appStyle.h2Desktop}>The creative Team</h3>
        </div>
        <div className={styles.content}>
          <h5 className={appStyle.boldBodyDesktop}>who we are</h5>
          <p className={appStyle.bodyDesktop}>
            We are team of creatively diverse. driven. innovative individuals
            working in various locations in the Netherland.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
