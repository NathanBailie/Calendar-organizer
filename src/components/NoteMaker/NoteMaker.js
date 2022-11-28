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
		if (!onValidateStartTime(time1) && !onValidateEndTime(time2)) {
			return onRedactNote(...arg);
		}
	}

	function onValidateStartTime(time) {
		if (!/\d?\d:\d\d?$/.test(time)) {
			setStartTimeMistake(true);
			return true;
		} else {
			setStartTimeMistake(false);
			return false;
		}
	}
	function onValidateEndTime(time) {
		if (!/\d?\d:\d\d?$/.test(time)) {
			setEndTimeMistake(true);
			return true;
		} else {
			setEndTimeMistake(false);
			return false;
		}
	}

	let startMistekeMessageClasses = 'noteMaker__startMistakeMessage';
	let endMistekeMessageClasses = 'noteMaker__endMistakeMessage';

	if (startTimeMistake === true) {
		startMistekeMessageClasses = 'noteMaker__startMistakeMessage noteMaker__startMistakeMessage_active';
	} else {
		startMistekeMessageClasses = 'noteMaker__startMistakeMessage';
	}
	if (endTimeMistake === true) {
		endMistekeMessageClasses = 'noteMaker__endMistakeMessage noteMaker__endMistakeMessage_active';
	} else {
		endMistekeMessageClasses = 'noteMaker__endMistakeMessage';
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
			<span className={startMistekeMessageClasses}>
				please, type the correct date
			</span>
			<input
				value={start}
				onChange={(e) => setStart(e.target.value)}
				onBlur={() => onValidateStartTime(start)}
				placeholder={'type the start time in format 00:00'}
			/>
			<p>End time</p>
			<span className={endMistekeMessageClasses}>
				please, type the correct date
			</span>
			<input
				value={end}
				onChange={(e) => setEnd(e.target.value)}
				onBlur={() => onValidateEndTime(end)}
				placeholder={'type the end time in format 00:00'}
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