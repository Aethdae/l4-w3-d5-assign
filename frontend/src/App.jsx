import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import { DICE_URL, ROLL_URL } from "./consts";
import RollCard from "./components/RollCard";

export default function App() {
  const [dice, setDice] = useState([]);
  const [rollResult, setRollResult] = useState(0);
  async function getDice() {
    try {
      const res = await fetch(DICE_URL);
      const { dice } = await res.json();
      setDice(dice);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getDice();
  }, []);

  async function roll() {
    try {
      const res = await fetch(ROLL_URL);
      const { result } = await res.json();
      setRollResult(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div className="flex flex-col gap-4 max-w-[50%] items-center mx-auto">
        <h2 className="bold text-4xl bg-amber-300 px-4 border-4">
          Current Dice:
        </h2>
        <div className="grid grid-cols-10 gap-4 items-center justify-center bg-black rounded-xl border-gray-400 shadow-md/100 shadow-black border-2 text-white px-4 min-h-60">
          {dice.map((die) => (
            <p
              className="bg-gray-800 border-white border text-center px-2"
              key={crypto.randomUUID()}
            >
              {die}
            </p>
          ))}
        </div>
        <Controls dice={dice} getDice={getDice} roll={roll} />
        {rollResult != 0 && <RollCard roll={rollResult} />}
      </div>
    </main>
  );
}
