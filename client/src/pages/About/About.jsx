import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import appStyle from "../../App.module.css";
import useFetch from "../../hooks/useFetch";
import ProgressBar from "../../components/ProgressBar";
import CountUp from "react-countup";
import bgImage from "../../assets/images/background-image.jpg";
import Error from "../../components/Error/Error";

const About = () => {
  const [users, setUsers] = useState();
  const [activeStatements, setActiveStatements] = useState();
  const [expired, setExpired] = useState(0);
  const [tags, setTags] = useState();

  const onSuccess = (onReceived) => {
    setUsers(onReceived.result.countUsers);
    setActiveStatements(onReceived.result.countStatements);
    setTags(onReceived.result.countTags);
    setExpired(0);
  };

  const { isLoading, performFetch, cancelFetch, error } = useFetch(
    "/database/all",
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
      <div className={style.aboutPage}>
        <div className={style.bgImageContainer}>
          <img src={bgImage} className={style.bgImage} />
        </div>
        <div className={style.aboutSection}>
          <div className={style.container}>
            <h2 className={appStyle.headerOne}>About SYM</h2>
            <div className={style.row}>
              <div className={style.titleContainer}>
                <p className={appStyle.headerTwo}>
                  Make a statement, the world is waiting..
                </p>
              </div>
              <div className={style.paragraphContainer}>
                <p className={appStyle.body}>
                  SYM aims to restore anonymity in social interaction platforms.
                  The idea is to let anyone open topics for discussion without
                  having to explain themselves, hence the character limit. What
                  you do here is open a discussion with one sentence and make a
                  statement with another. Any SYM user is then able to reply to
                  your topic by tagging a statement to your topic.
                  <br />
                  <br />
                  Users cannot follow other users. Each statement awards the
                  user points that add up to the SYM score. Posts are sorted by
                  most liked. Each post will self destruct in 48h. When a user
                  tags on a statement they also get points to their SYM score.
                </p>
              </div>
            </div>
          </div>
        </div>
        {error ? (
          <Error error={error} />
        ) : (
          <div className={style.statsSection}>
            <div className={style.content}>
              <p className={appStyle.headerOne}>Users</p>
              <div className={style.numbers}>
                <CountUp className={appStyle.headerOne} start={0} end={users} />
              </div>
            </div>
            <div className={style.content}>
              <p className={appStyle.headerOne}>Active Statements</p>
              <div className={style.numbers}>
                <CountUp
                  className={appStyle.headerOne}
                  start={0}
                  end={activeStatements}
                />
              </div>
            </div>
            <div className={style.content}>
              <p className={appStyle.headerOne}>Tags</p>
              <div className={style.numbers}>
                <CountUp className={appStyle.headerOne} start={0} end={tags} />
              </div>
            </div>
            <div className={style.content}>
              <p className={appStyle.headerOne}>Expired Posts</p>
              <div className={style.numbers}>
                <CountUp
                  className={appStyle.headerOne}
                  start={0}
                  end={expired}
                />
              </div>
            </div>
          </div>
        )}
        <div className={style.teamSection}>
          <div className={style.title}>
            <h3 className={appStyle.headerTwo}>The creative Team</h3>
          </div>
          <div className={style.content}>
            <p className={appStyle.body}>
              This SPA was developed by Edward Abboud as a portfolio project.
              The repository for this app is public and inspired by a repository
              from Hack Your Future&apos;s final project repository.
              <br />
              <br />
              To learn more about the creator check out their{" "}
              <a
                target="_blank"
                href="https://github.com/EdwardAbboud"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/edward-abboud/"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
