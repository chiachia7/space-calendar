// App.js
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import events from './data/events2025.json';
import { useState } from 'react';
import dayjs from 'dayjs';



function App() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // 1〜30日分

  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-05-01'));
  const [language, setLanguage] = useState('en'); // 言語の state

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  };

const handleNextMonth = () => {
  setCurrentMonth((prev) => prev.add(1, 'month'));
};


  return (
    <div className="font-title p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="font-title text-xl text-indigo-300 mb-2 text-shadow-gold">Starry Night Sky Calendar</h1>

      {/* ✅ 言語切り替えボタン */}
      <div className="absolute right-10 top-5 flex gap-4 justify-center mb-6">
        <button onClick={() => setLanguage('en')} className="hover:bg-indigo-500">
          🇬🇧
        </button>
        <button onClick={() => setLanguage('ja')} className="hover:bg-indigo-500">
          🇯🇵
        </button>
      </div>


      <div className="font-title flex justify-center items-center gap-8 mb-6">
        <button onClick={handlePrevMonth} className="text-indigo-300 hover:underline">← Last</button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-shadow-gray">
          {currentMonth.format('MMMM YYYY')}
        </h2>
        <button onClick={handleNextMonth} className="text-indigo-300 hover:underline">Next →</button>
      </div>


      <Calendar currentMonth={currentMonth} events={events} language={language} />

    </div>
  );

}


export default App;
