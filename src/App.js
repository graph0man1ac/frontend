import { Button } from "./components/Button";
import { Input } from "./components/Input";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [likesCount, setLikesCount] = useState(0);

  const getLikes = () => {
    fetch("http://localhost:3000/likes/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setLikesCount(data[0].value))
      .catch((error) => console.error("Ошибка синхронизации лайков", error));
  };

  useEffect(() => {
    getLikes();
    const intervalId = setInterval(() => {
      getLikes();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOnClick = () => {
    setLikesCount(likesCount + 1);
    fetch("http://localhost:3000/likes/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error("Ошибка обновления лайков");
        }
      })
      .catch((error) => console.error("Ошибка обновления лайков", error));
  };

  return (
    <div className="App">
      <div className="container">
        likes_counter
        <Input likesCount={likesCount} />
        <Button onClick={handleOnClick} name="Like" />
      </div>
    </div>
  );
}

export default App;
