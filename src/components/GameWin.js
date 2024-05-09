import React, { useEffect } from "react";
import "animate.css";

function GameWin({ data }) {
  data(false);

  useEffect(() => {
    const audio = new Audio("victory.mp3");

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Audio playback started successfully
        })
        .catch((error) => {
          // Autoplay was prevented, show UI to let user start playback
          console.log("Autoplay prevented:", error);
        });
    }

    return () => {
      // Clean up audio when component unmounts
      audio.pause();
      audio.src = ""; // Release memory
    };
  }, []);

  return (
    <div>
      <img
        src="https://i.postimg.cc/9fQVvLJv/image-removebg-preview-17-1.png"
        alt="backgorundgif"
        className="w-100 rounded animate__animated animate__zoomIn"
      />
    </div>
  );
}

export default GameWin;
