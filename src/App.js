import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const getTickets = async () => {
    const { data } = await axios.get(
      "https://hostservice.raja.ir/Api/ServiceProvider/TrainListEq?q=wFLgz7OBdr6i/yEvaG5RvKohbTplyVsAmT08uG7lOBvK2ZmViP0yqi2WcJ/PyoS4RN1NIF7CQixkZbFgpDauWEWsRhApsVSOj+NZMusWE08="
    );
    const { GoTrains } = data;
    const filteredTickets = GoTrains.filter(
      (ticket) => ticket.Counting > 0 && ticket.ExitTime === "15:00"
    );
    if (filteredTickets.length > 0) {
      const audio = new Audio("https://www.soundjay.com/buttons/beep-01a.wav");
      audio.play();
    }
    setTickets(GoTrains);
  };
  useEffect(() => {
    if (counter === 0) {
      getTickets();
      setCounter(counter + 1);
    }
    const timeOutId = setTimeout(() => {
      // const audio = new Audio(""); //https://www.soundjay.com/buttons/beep-01a.wav
      // audio.play();
      getTickets();
      setCounter(counter + 1);
    }, 20000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [counter]);
  const renderTickets = () => {
    const availableTickets = tickets.filter((ticket) => ticket.Counting > 0);
    return availableTickets.map((ticket, index) => {
      return (
        <div key={index} className="ticket">
          <div>{ticket.ExitTime} </div>
          <div>{ticket.TimeOfArrival}</div>
          <div>{ticket.Counting}</div>
          <div>{ticket.FullPrice}</div>
        </div>
      );
    });
  };
  return (
    <>
      <div>
        {tickets.length > 0 ? renderTickets() : ""} {counter}
      </div>
    </>
  );
}

export default App;
