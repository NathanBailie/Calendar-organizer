import { useState } from 'react';
import Calendar from '../Calendar';


const CalendarData = ({ currentYear, currentMonth, currentDay, dayToShow, dayOfWeektoShow, onGetDate, daysWithNotes }) => {
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	const [day, setDay] = useState(currentDay);
	// const [dayOfWeek, setDayOfWeek] = useState(dayOfWeektoShow);
	const amountOfDays = amountOfDaysInMonth(year, month);
	const arrayOfDays = getArrayOfDays(amountOfDays, year, month);

	function amountOfDaysInMonth(year, month) {
		let date = new Date(year, month + 1, 0);
		return (date.getDate())
	}

	function onChangeMonth(amount) {
		if (month === 11 && amount > 0) {
			setMonth(0);
			setYear((y) => y + amount);
		} else if (month === 0 && amount < 0) {
			setMonth(11);
			setYear((y) => y + amount);
		} else {
			setMonth((m) => m + amount)
		}
	}

	function getArrayOfDays(amount, year, month) {
		let firstDay = (new Date(year, month, 1)).getDay();
		const array = [];

		let count = 0;
		while (count < amount) {
			count++;
			array.push(count);
		}

		let count2 = 1;
		while (count2 < firstDay) {
			array.unshift('');
			count2++;
		}
		return array;
	}

	return (
		<Calendar
			currentYear={currentYear}
			currentMonth={currentMonth}
			year={year}
			month={month}
			day={day}
			dayToShow={dayToShow}
			dayOfWeek={dayOfWeektoShow}
			arrayOfDays={arrayOfDays}
			daysWithNotes={daysWithNotes}
			onChangeMonth={onChangeMonth}
			onGetDate={onGetDate}
		/>
	)
}

export default CalendarData;