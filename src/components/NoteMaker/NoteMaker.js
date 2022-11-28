import { useState } from 'react';
import './noteMaker.scss';



const NoteMaker = ({ noteToEdit, onRedactNote }) => {
	const [{ year, month, day, name, startTime, endTime, text, id }] = noteToEdit;
	const [title, setTitle] = useState(name);
	const [start, setStart] = useState(startTime);
	const [end, setEnd] = useState(endTime);
	const [txt, setTxt] = useState(text);
	const [startTimeMistake, setStartTimeMistake] = useState(false);
	const [endTimeMistake, setEndTimeMistake] = useState(false);

	function onValidate(time1, time2, ...arg) {
		if (!/\d?\d:\d\d?$/.test(time1)) {
			setStart('');
			setStartTimeMistake(true);
		} if (!/\d?\d:\d\d?$/.test(time2)) {
			setEnd('');
			setEndTimeMistake(true);
		} else {
			return onRedactNote(...arg);
		}
	}

	let startTimeClass = 'noteMaker__startTime';
	let endTimeClass = 'noteMaker__endTime';

	if (startTimeMistake === true) {
		startTimeClass = 'noteMaker__startTime noteMaker__startTime_mistake';
	}
	if (endTimeMistake === true) {
		endTimeClass = 'noteMaker__endTime noteMaker__endTime_mistake';
	}



	return (
		<div className='noteMaker'>
			<h2>Your note</h2>
			<p>Note name</p>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder={'type a title for your note'}
			/>
			<p>Start time</p>
			<input
				value={start}
				onChange={(e) => setStart(e.target.value)}
				placeholder={'type the start time in format 00:00'}
				className={startTimeClass}
			/>
			<p>End time</p>
			<input
				value={end}
				onChange={(e) => setEnd(e.target.value)}
				placeholder={'type the end time in format 00:00'}
				className={endTimeClass}
			/>
			<p>Note</p>
			<textarea
				value={txt}
				onChange={(e) => setTxt(e.target.value)}
				placeholder={'type your note text'}
			/>
			<button
				onClick={() =>
					onValidate(start, end, year, month, day, title, start, end, txt, id)}
			>Complete</button>
		</div>
	);
};

export default NoteMaker;