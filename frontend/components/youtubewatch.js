import React from "react";
import css from "../styles/youtubewatch.module.css";

const youtubewatch = ({
  url,
  width,
  height,
  autoplay,
  end,
  loop,
  modestbranding,
  start,
  color,
  controls,
}) => {
  let videoId = url.split("=")[1];
  let src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&end=${end}&loop=${loop}&modestbranding=${modestbranding}&start=${start}&color=${color}${
    controls ? `&controls=1` : `&controls=0`
  }`;

  return (
    <div className={css.wrapformobile}>
      <iframe
        id="ytplayer"
        type="text/html"
        width={width}
        height={height}
        src={src}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default youtubewatch;
