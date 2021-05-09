import React, { useState } from "react";
import Page from "./components/Page";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const GoogleVision = () => {
  let history = useHistory();
  const emotions = ["happy", "neutral", "sad", "surprised"];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };

  if (count > 3) {
    history.push("/form");
  }
  return (
    <div>
      <Page count={count} emotion={randomEmotion} handleCount={handleCount} />
    </div>
  );
};

export default withRouter(GoogleVision);
