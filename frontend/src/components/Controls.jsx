import React, { useState } from "react";
import { CLEAR_URL, DICE_URL } from "../consts";

export default function Controls({ dice, getDice, roll }) {
  const [deleteValue, setDeleteValue] = useState("");
  const [addValue, setAddValue] = useState("");

  async function deleteDie() {
    const num = Number(deleteValue);
    if (!num) {
      return;
    }
    const body = { die: num };
    try {
      const res = await fetch(DICE_URL, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      getDice();
    }
  }
  async function addDie() {
    const nums = addValue.split(",");
    if (!nums) {
      return;
    }
    nums.forEach(async (num) => {
      const trimmed = num.trim();
      const toNumber = Number(trimmed);
      if (!toNumber) return;
      const body = { die: toNumber };

      try {
        const res = await fetch(DICE_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
      } catch (error) {
        console.error(error);
      } finally {
        getDice();
      }
    });
  }

  async function clearDice() {
    try {
      const res = await fetch(CLEAR_URL);
    } catch (error) {
      console.error(error);
    } finally {
      getDice();
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <form>
          <label className="flex gap-2">
            Add die
            <input
              className="bg-gray-200 border-2 rounded-md"
              value={addValue}
              onChange={(e) => {
                setAddValue(e.target.value);
              }}
              type="text"
              name="addDie"
              id="addDie"
            />
          </label>
        </form>
        <button
          className="text-white rounded-2xl px-2 bg-blue-800 border-blue-950 border-4 hover:bg-blue-600"
          onClick={() => {
            addDie();
          }}
        >
          Add
        </button>
      </div>
      <p>|</p>
      <button
        onClick={() => {
          roll();
        }}
        className="bg-green-600 px-4 rounded-2xl border-2 border-green-800 hover:bg-green-400"
      >
        Roll
      </button>
      <p>|</p>

      <div className="flex gap-4">
        <select
          name="delete"
          id="delete"
          value={deleteValue}
          onChange={(e) => {
            setDeleteValue(e.target.value);
          }}
        >
          {dice.map((die) => (
            <option key={crypto.randomUUID()} value={String(die)}>
              {die}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            deleteDie();
          }}
          className="text-white rounded-2xl px-2 bg-red-800 border-red-950 border-4 hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <p>|</p>
      <button
        onClick={() => {
          clearDice();
        }}
        className="text-white rounded-2xl px-2 bg-red-800 border-red-950 border-4 hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
}
