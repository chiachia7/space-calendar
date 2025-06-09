import { useState } from 'react';
import Modal from 'react-modal';
import { translations } from '../data/translations'; // adjust the path if needed

const moonEmojis = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘',
};

Modal.setAppElement('#root');

const Calendar = ({ currentMonth, events, language }) => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const openModal = (phase) => {
    setSelectedPhase(phase);
  };

  const closeModal = () => {
    setSelectedPhase(null);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const getEventForDate = (day) => {
    const dateString = currentMonth.format(`YYYY-MM-${String(day).padStart(2, '0')}`);
    return (events || []).filter((event) => event.date === dateString);
  };

  const calendarCells = [];

  for (let i = 0; i < startDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateEvents = getEventForDate(day);
    const phaseEvent = dateEvents.find((e) => moonEmojis[e.type]);
    const phaseName = phaseEvent ? phaseEvent.type : null;
    const moonIcon = phaseName ? moonEmojis[phaseName] : null;

    calendarCells.push(
      <div
        key={day}
        className="border border-indigo-400 bg-slate-900/60 backdrop-blur-md shadow-md 
                   p-1 sm:p-2 h-16 sm:h-28 w-full rounded-2xl 
                   flex flex-col justify-start items-center 
                   text-[10px] sm:text-sm 
                   transition hover:scale-105 hover:shadow-lg duration-200
                   overflow-hidden text-xs break-words"
      >
        <div className="font-bold text-white text-[1rem] sm:text-lg text-center">{day}</div>

        {moonIcon && <div className="text-[0.6rem] sm:text-sm text-white mb-1">{moonIcon}</div>}

        {phaseName && (
          <p
            className="text-[9px] sm:text-xs text-indigo-200 cursor-pointer underline hover:text-indigo-400 text-center break-words leading-tight"
            onClick={() => openModal(phaseName)}
          >
            {phaseName}
          </p>
        )}

        {dateEvents
          .filter((event) => event.type !== "New Moon")
          .map((event, idx) => (
            <div
              key={idx}
              className="text-[9px] sm:text-xs text-pink-300 mt-1 cursor-pointer underline hover:text-pink-400 break-words leading-tight"
              onClick={() => openModal(event.name || event.type)}
            >
              {event.name || event.type}
            </div>
          ))}
      </div>
    );
  }

  const getDescription = (name) => {
    const langData = translations[language] || {};
    const moonDesc = langData.moonDescriptions?.[name];
    const eventDesc = langData.eventDescriptions?.[name];
    return moonDesc || eventDesc || "No description available.";
  };

  return (
    <div className="overflow-x-auto px-2 sm:px-4">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold text-indigo-300 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className={
              day === "Sun"
                ? "text-rose-200"
                : day === "Sat"
                ? "text-blue-300"
                : ""
            }
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
        {calendarCells}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedPhase}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-32"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {selectedPhase} {moonEmojis[selectedPhase]}
        </h2>
        <p className="text-gray-800">
          {getDescription(selectedPhase)}
        </p>

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          CLOSE
        </button>
      </Modal>
    </div>
  );
};

export default Calendar;
