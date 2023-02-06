import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './app.scss';
import '../../base/fonts/fonts.scss'
import '../../base/animations/animations.scss';
import CalendarData from '../CalendarData';
import NoteMaker from '../NoteMaker';
import NotesDisplay from '../NotesDisplay';


const App = () => {
	let allNnotes = [
		onCreateNote(2022, 10, 22, 'name', '10:00', '15:00', 'text'),
		onCreateNote(2022, 10, 22, 'name', '10:00', '15:00', 'text'),
		onCreateNote(2022, 10, 23, 'name', '15:30', '18:30', 'text2'),
		onCreateNote(2022, 10, 23, 'name', '11:00', '15:00', 'text2'),
		onCreateNote(2022, 10, 27, 'name', '12:00', '15:00', 'text3'),
	];
	const date = new Date();
	const [currentYear, currentMonth, currentDay, currentDayOfWeek] = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getDay(),
	];
	const [dayToShow, setDayToShow] = useState(currentDay);
	const [dayOfWeektoShow, setDayOfWeektoShow] = useState(currentDayOfWeek);
	const [notes, setNotes] = useState(allNnotes);
	const [notesToShow, setNotesToShow] = useState([]);
	const [dateOfShowingNote, setDateOfShowingNote] = useState([]);
	const [edit, setEdit] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState([]);
	const daysWithNotes = notes.map(note => { return { year: note.year, month: note.month, day: note.day } });

	useEffect(() => {
		if (dateOfShowingNote.length === 0) {
			onGetDate(currentYear, currentMonth, currentDay)
			onCompareTimes();
		}
	}, [notesToShow]);

	function onCreateNote(year, month, day, name, startTime, endTime, text) {
		return {
			year: year,
			month: month,
			day: day,
			name: name,
			startTime: startTime,
			endTime: endTime,
			text: text,
			important: false,
			done: false,
			id: uuid()
		};
	};

	function onGetDate(year = currentYear, month = currentMonth, day = currentDay) {
		setDateOfShowingNote([year, month, day]);
		setDayToShow(day);
		const dayOfWeek = new Date(year, month, day).getDay();
		setDayOfWeektoShow(dayOfWeek);
	};

	const onToggleProperty = (id, prop) => {
		let secondProp;
		if (prop === 'important') {
			secondProp = 'done';
		} else if (prop === 'done') {
			secondProp = 'important';
		}
		const newNotes = notes.map(note => {
			if (note.id === id) {
				return { ...note, [prop]: !note[prop], [secondProp]: false }
			};
			return note;
		});
		setNotes(newNotes);
	};

	function onEditNote(id) {
		setEdit(true);
		const note = notes.filter(note => note.id === id);
		setNoteToEdit(note);
	};

	function onRedactNote(year, month, day, title, start, end, txt, id) {
		const check = notes.some(note => note.id === id);
		if (check === true) {
			const newNotes = notes.map(note => {
				if (note.id === id) {
					return { ...note, ['name']: title, ['startTime']: start, ['endTime']: end, ['text']: txt }
				}
				return note;
			});
			setNotes(newNotes);
		} else {
			const newNote = onCreateNote(year, month, day, title, start, end, txt);
			setNotes([...notes, newNote]);
		}
		setEdit(false);
	};

	function onAddNewNote(year, month, day) {
		setEdit(true);
		const newNote = [onCreateNote(year, month, day, '', '', '', '')];
		setNoteToEdit(newNote);
	};


	function onRemoveItem(id) {
		const itemIndex = notes.findIndex(note => note.id === id);
		const newNotes = [...notes.slice(0, itemIndex), ...notes.slice(itemIndex + 1)];
		setNotes(newNotes);
	};

	function onCompareTimes() {
		let now = new Date();
		let newNotes = [];
		for (let note of notes) {
			let [endHour, endMinutes] = note.endTime.split(':');
			let { year, month, day } = note;
			let dateOfNote = new Date(year, month, day, Number(endHour), Number(endMinutes));
			if (dateOfNote < now) {
				newNotes.push({ ...note, ['done']: true });
			} else if ((dateOfNote - now) / (1000 * 60 * 60) < 2) {
				newNotes.push({ ...note, ['important']: true });
			} else {
				newNotes.push(note);
			};
		};
		setNotes(newNotes);
	};


	return (
		<div className="container">
			<div className="wraper">
				<CalendarData
					currentYear={currentYear}
					currentMonth={currentMonth}
					currentDay={currentDay}
					dayToShow={dayToShow}
					dayOfWeektoShow={dayOfWeektoShow}
					onGetDate={onGetDate}
					daysWithNotes={daysWithNotes}
				/>
				{edit ?
					<NoteMaker
						noteToEdit={noteToEdit}
						onRedactNote={onRedactNote}
					/>
					:
					<NotesDisplay
						notes={notes}
						notesToShow={notesToShow}
						onEditNote={onEditNote}
						onToggleProperty={onToggleProperty}
						dateOfShowingNote={dateOfShowingNote}
						onAddNewNote={onAddNewNote}
						onRemoveItem={onRemoveItem}
					/>
				}
			</div>
		</div>
	);
};

export default App;