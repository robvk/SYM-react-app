import React from "react";
import appStyle from "../../App.module.css";
import stepTwoGIF from "../../assets/GIF/stepTwo.gif";
import stepThreeGIF from "../../assets/GIF/stepThree.gif";
import stepFourGIF from "../../assets/GIF/stepFour.gif";
import { ImArrowUp, ImArrowDown, ImLoop2 } from "react-icons/im";

export const stepOne = (
  <div>
    <h2 className={appStyle.headerOne}>Welcome to SYM</h2>
    <p className={appStyle.body}>
      This tutorial will help get you started and well on your way to State Your
      Mind. To skip this tutorial please press the skip button below, you can
      always access this tutorial again by hovering over your username on the
      top right of the screen and clicking on &quot;Help&quot;.
      <br />
      <br />A few guidelines before getting into how all this works. This
      project is not intended for commercial use. The data submitted to this
      application will not be used in anyway other than allowing the app to
      function properly. This is a content-based platform, meaning you cannot
      follow users and will be presented the content that is doing the best.
      Every post or statement made will expires after 48h of it&apos;s creation.
      These so called expired posts will be moved to a separate collection of
      data and will no longer circle the feed.
    </p>
  </div>
);

export const stepTwo = (
  <div>
    <h2 className={appStyle.headerOne}>Make a Statement</h2>
    <img src={stepTwoGIF} alt="GIF showing how to create a statement" />
    <p className={appStyle.body}>
      When you&apos;re ready to make a statement, click on the &quot;+&quot;
      icon or on &quot;Create New Statement&quot; buttons in the navbar or the
      footer. What you want to do is create a 2 part statement that will let
      other users share their thoughts and finish the sentence in their own way.
    </p>
  </div>
);

export const stepThree = (
  <div>
    {" "}
    <h2 className={appStyle.headerOne}>Interact with Statements</h2>
    <img
      src={stepThreeGIF}
      alt="GIF showing how to interact with a statement"
    />
    <p className={appStyle.body}>
      Statements will appear in your feed by order of most up-voted to least. To
      up-vote click on the &apos;
      <ImArrowUp />
      &apos; and to down-vote click on the &apos;
      <ImArrowDown />
      &apos;.
      <br /> To add a tag and complete someone&apos;s sentence click on the
      &apos;
      <ImLoop2 />
      &apos; icon and type in your response before hitting the post button.
    </p>
  </div>
);

export const stepFour = (
  <div>
    <h2 className={appStyle.headerOne}>Profiles</h2>
    <img src={stepFourGIF} alt="GIF showing user profile" />
    <p className={appStyle.body}>
      To check out your SYM score you can navigate to your profile. On your
      profile you can edit your details, change your password and delete your
      account. There you will see the current rank of your profile and how much
      your SYM score is.
    </p>
  </div>
);

export const stepFive = (
  <div>
    <h2 className={appStyle.headerOne}>Score and Rank</h2>
    <p className={appStyle.body}>
      <strong>How do you get a higher SYM score?</strong>
      <br />
      <br />
      Every statement you make awards you 2 points.
      <br />
      <br />
      Every tag you add to someone else&apos; awards you 1 point.
      <br />
      <br />
      When your post expires, you will get a reward of the amount of users that
      tagged your statement. Up votes and down votes do not award any points,
      but they will get more eyes on your post.
      <br />
      <br />
      Happy stating!
    </p>
  </div>
);
