import { useEffect, useState } from "react";
import "./App.css";
import SingleCards from "./components/SingleCards";
import { Col, Container, Row } from "react-bootstrap";
import GameWin from "./components/GameWin";
import useSound from "use-sound";
import soundUrl from "./components/newgame.wav";
import React from "react";

const cardImages = [
  { src: "/img/pic1.jpeg", matched: false },
  { src: "/img/pic2.jpeg", matched: false },
  { src: "/img/pic3.jpeg", matched: false },
  { src: "/img/pic4.jpeg", matched: false },
  { src: "/img/pic5.jpeg", matched: false },
  { src: "/img/pic6.jpeg", matched: false },
  { src: "/img/pic7.jpeg", matched: false },
  { src: "/img/pic8.jpeg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoicetwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const [prevTurn, setPrevTurn] = useState(0);

  //timmer
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  //sound
  const [playbackRate, setPlaybackRate] = React.useState(0.75);
  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  //shuffle card
  const shuffleCards = () => {
    setPlaybackRate(playbackRate);
    play();
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })); //when its neg item remain same else sort
    setChoiceOne(null);
    setChoicetwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setSeconds(0);
    setPrevTurn(turns);
    setRunning(true);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoicetwo(card) : setChoiceOne(card);
  };

  //compare two selected card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice and increse turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoicetwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: cards.every((image) => image.matched)
          ? "url('https://i.pinimg.com/originals/9c/9c/95/9c9c9594083c7803650bca0f43f2b326.gif')"
          : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container>
        <Row style={{ height: "100vh" }}>
          <Col
            lg={6}
            className="d-flex align-items-center justify-content-center text-center"
          >
            {" "}
            <div className="text-sec">
              <h1>The</h1>

              <h1 className="text" data-text="Memory_">
                Memory_{" "}
              </h1>

              <h1>Game</h1>

              <div className="d-flex justify-content-between mt-3 timesec">
                <p className="me-4">Turns: {turns}</p>
                <p>
                  <i className="fa-solid fa-stopwatch me-2"></i>
                  {formatTime(seconds)}
                </p>
              </div>
              <p className="text-center">Previous turn : {prevTurn}</p>
              <div className="d-flex justify-content-center mb-3">
                <img
                  onClick={shuffleCards}
                  className="playagainbtn"
                  src="img/playagain.png"
                  alt="Plag_Again"
                ></img>
              </div>
            </div>
          </Col>
          <Col lg={6} className="d-flex align-items-center">
            {cards.every((image) => image.matched) ? (
              <GameWin data={setRunning} />
            ) : (
              <div className="card-grid">
                {cards.map((card) => (
                  <SingleCards
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={
                      card === choiceOne || card === choiceTwo || card.matched
                    }
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
