import "./App.css";
import axios from "axios";
import beep from "./assets/beep.wav";
// import dar from "./assets/darmanlo.aac"
import { useEffect, useState } from "react";
function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("nothing");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState(false);
  useEffect(() => {
    if (counter === 0) {
      getTickets();
      setCounter(counter + 1);
    }
    getTickets();
    const timeOutId = setTimeout(() => {
      // const audio = new Audio(""); //https://www.soundjay.com/buttons/beep-01a.wav
      // audio.play();
      setCounter(counter + 1);
    }, 10000);
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
  const getTickets = async () => {
    try {
      // const { data } = await axios.get(
      //   "https://safar724.com/bus/getservices?origin=11320000&destination=51360000&date=1402-02-20"
      // );
      // const { Items } = data;
      axios.defaults.headers.common["Api-Key"] =
        "sDSLk2rGId8L0jUz7N2vQK02vkGPf3DgqB0Yi9oqgI9yH3xWqxewCFOxdCmpMjbOROGTPMg162oK40pvX1asop23b0m2MNIulmNUxjwS2Vuq4opmBS4kVuHJUdSf60bJ";
      axios.defaults.headers.common["Authorization"] =
        "bearer clfRzt9DTkXhXnSU2EM3ynpPEVLcF_wvMkzIzi32BgjXjJogAaLWaDn04HCGQoKMbp7BPrwPcdb5xigYvXBhNbYi9ayYICIhjWbbsF0FzGVqiH1glck04QP05jmCNH8UA548hREJervIhanKifQGCIY5Nm2qx8KFQhA5RyrsSItZz-uKV6xh9ufUY3LS7zyt9NdvIQNUFhO52uudoGKDj_g777Htf_z8H2RjzlesZjgRoY5NKFUfuIlmj797M6s_ARocBG-exmuyoS46JlGPCjnfNpDPHuJCxoxbcCcmV7P69QJqBImFJyu1fPprWF4sRLeyf6zHL9wGNr4cqxOZzI_z91iSQs1hddI6_ud6RY3gRlWT2BcnvSvql0aoYpOjuoNQOQqQYAMLNpFTnHC6Pr7DilDt8TXM92xOe_Nyr9iiRv5wsSIlOnqv_q5MtHFE85unEmjVo_iCJ7uIZYmKAnOcRTVivJ-99oIKBHS45y3cdN6oV3rI6DG88DG5fsSBV8u0PWxYZXDO0yxMN0ZcjIEo1Ty5yZo86XDBXb26polDQ_PMWeeunhodBFWxiTSsxm7aTTfhjRZ3YZKur-bdhA";
      const { data } = await axios.get(
        "https://hostservice.raja.ir/Api/ServiceProvider/TrainListEq?q=q9RVtTLk8QRweaetRyF2PnBokF9NcmhxoKTeoMIZ4BrUPXw/5nWGDHn86eKZMJwx8wKq+UuQX4FTGWJsnjiZ5daOlMiYRNYj4Se4hMedvLo="
      );
      const { GoTrains } = data;
      // const { GoTrains: GoTrains2 } = data2;

      // const filteredTickets = Items.filter(
      //   (ticket) =>
      //     ticket.AvailableSeatCount > 0 && ticket.DepartureTime === "19:30"
      // );
      const filteredTickets = GoTrains.filter(
        (ticket) => ticket.Counting > 0 && ticket.ExitTime === "15:00"
      );
      if (filteredTickets.length > 0) {
        const audio = new Audio(beep);
        audio.play();
      }
      if (filteredTickets.length > 0) {
        setStatus(filteredTickets[0].ExitTime);
      }
      // if (filteredTickets2.length > 0) {
      //   setStatus(filteredTickets2[0].ExitTime);
      // }
      // }
      setError("");
      setTickets(filteredTickets);
    } catch (error) {
      setError("خطا در دریافت اطلاعات از سرور رجا");
    }
  };
  return (
    <>
      <div>
        {tickets.length > 0 ? renderTickets() : ""} {counter}
      </div>
      <div>{error}</div>
      <div>{status}</div>
      <div>{status === "24" ? "ویژه برادران خالی شد" : ""}</div>
      {!buttonState ? (
        <button
          onClick={() => {
            setButtonState(true);
          }}
        >
          Click to activate sound
        </button>
      ) : (
        ""
      )}
      <div>{buttonState ? "صدا میتونه پخش شه " : ""}</div>
    </>
  );
}

export default App;
