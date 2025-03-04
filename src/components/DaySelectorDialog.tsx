import { addMealToSubcollection, CollectionType } from "@/firebase";
import { MealData } from "@/meal-links";
import React, { useState } from "react";

const daysOfWeek = [
  { name: "Saturday", value: "1" },
  { name: "Sunday", value: "2" },
  { name: "Monday", value: "3" },
  { name: "Tuesday", value: "4" },
  { name: "Wednesday", value: "5" },
  { name: "Thursday", value: "6" },
  { name: "Friday", value: "7" },
];

export default function DaySelectorDialog({
  onClose,
  meal,
  userId,
}: {
  onClose: () => void;
  meal: MealData;
  userId: string;
}) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleOk = () => {
    console.log("Selected days:", selectedDays);
    onClose(); // Close dialog after OK
  };
  const handleSave = async () => {
    await Promise.all(
      selectedDays.map((day) => {
        const newMeal = { ...meal, day: day };
        return addMealToSubcollection(userId, CollectionType.PLAN, newMeal);
      })
    );
    handleOk();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Select Days of the Week</h2>
        <div className="space-y-2">
          {daysOfWeek.map((day) => (
            <label key={day.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day.value)}
                onChange={() => toggleDay(day.value)}
              />
              <span>{day.name}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded hover:bg-black/50  duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedDays.length === 0}
            className={`px-4 py-2 rounded ${
              selectedDays.length === 0
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
