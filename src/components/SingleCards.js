import React from "react";
import "./SingleCard.css";
import useSound from "use-sound";
import soundUrl from "./../components/cardflip.wav";

function SingleCards({ card, handleChoice, flipped, disabled }) {
  const [playbackRate, setPlaybackRate] = React.useState(0.75);
  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front" />
        <img
          src="/img/cover.jpg"
          className="back"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCards;
