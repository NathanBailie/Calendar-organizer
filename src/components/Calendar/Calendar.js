import { useState } from 'react';
import './calendar.scss';
import left from '../../base/icons/chevrons/left.png';
import right from '../../base/icons/chevrons/right.png';


const Calendar = (props) => {
	const {
		currentYear, currentMonth,
		year, month, day, dayOfWeek,
		arrayOfDays,
		daysWithNotes,
		onGetDate,
		onChangeMonth } = props;
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const daysShort = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	const nameOfMonth = months[month];
	const nameOfDay = days[dayOfWeek];
	const calendarTitle = daysShort.map((day, index) => <span key={index}>{day}</span>);
	const notesInCurrentMonth = daysWithNotes.filter(note => {
		if (note.year === year &&
			note.month === month) {
			return note;
		};
	});
	const daysWithNotesInCurrentMonth = notesInCurrentMonth.map(item => item.day);
	const [activeNumber, setActiveNumber] = useState(false);
	const calendarDays = arrayOfDays.map((dayOfMonth, index) => {
		let spanClass;
		if (day === index &&
			currentYear === year &&
			currentMonth === month) {
			spanClass = 'calendar__current';
		} else {
			spanClass = '';
		};
		if (daysWithNotesInCurrentMonth.indexOf(dayOfMonth) !== -1) {
			spanClass += ' calendar__withNote'
		};
		if (dayOfMonth === '') {
			spanClass += ' calendar__disabled'
		};
		if (dayOfMonth === activeNumber) {
			spanClass += ' calendar__typed'
		};

		return (
			<span
				key={index}
				className={spanClass}
				onClick={() => { onGetDate(year, month, dayOfMonth); setActiveNumber(dayOfMonth) }}
			>{dayOfMonth}</span>
		);
	});


	return (
		<div className="calendar">
			<h2 className='calendar__year'>{year}</h2>
			<div className="calendar__month">
				<button
					onClick={() => { onChangeMonth(-1); setActiveNumber(false); onGetDate() }}>
					<img src={left} alt="leftChevron" />
				</button>
				<h2>{nameOfMonth}</h2>
				<button
					onClick={() => { onChangeMonth(1); setActiveNumber(false); onGetDate() }}>
					<img src={right} alt="rightChevron" />
				</button>
			</div>
			<p>{`${nameOfDay} ${day}`}</p>

			<div className="calendar__title">
				{calendarTitle}
			</div>
			<div className="calendar__list">
				{calendarDays}
			</div>
		</div>
	);
};

export default Calendar;