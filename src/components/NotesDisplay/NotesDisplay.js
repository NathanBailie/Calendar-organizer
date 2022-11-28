import './notesDisplay.scss';
import hourglass from '../../base/icons/spinner/hourglass.gif';


const NotesDisplay = ({ notes, dateOfShowingNote, onEditNote, onToggleProperty, onAddNewNote, onRemoveItem }) => {
	const [chosenYear, chosenMonth, chosenDay] = dateOfShowingNote;
	const notesToShow = notes.filter(note => {
		return note.year === chosenYear &&
			note.month === chosenMonth &&
			note.day === chosenDay
	});

	if (notesToShow.length === 0) {
		return (
			<div className="display">
				<div className="empty">
					<h2>There are not any notes on this date</h2>
					<img src={hourglass} alt="glass" />
					<button
						className='display__adder'
						onClick={() => onAddNewNote(chosenYear, chosenMonth, chosenDay)}
					>Add new note</button>
				</div>
			</div>
		);
	};

	let result = notesToShow.map(note => {
		const { name, startTime, endTime, text, important, done, id } = note;
		let headerClasses;
		let textClasses;
		let importantButtonClasses;
		let finishButtonClasses;
		let noteClasses;
		let timeClasses;

		if (important) {
			headerClasses = 'display__title display__title_active';
			timeClasses = 'display__time display__time_active';
			textClasses = 'display__text display__text_active';
			importantButtonClasses = 'display__necessary display__necessary_active';
			finishButtonClasses = 'display__done';
			noteClasses = 'display__note display__note_active';
		} else if (done) {
			headerClasses = 'display__title display__title_finished';
			timeClasses = 'display__time display__time_finished';
			textClasses = 'display__text display__text_finished';
			importantButtonClasses = 'display__necessary';
			finishButtonClasses = 'display__done display__done_active';
			noteClasses = 'display__note display__note_finished';
		} else {
			headerClasses = 'display__title';
			timeClasses = 'display__time';
			textClasses = 'display__text';
			importantButtonClasses = 'display__necessary';
			finishButtonClasses = 'display__done';
			noteClasses = 'display__note';
		};

		return (
			<div key={id}>
				<h2 className={headerClasses}>
					{name}
				</h2>
				<p className={timeClasses}>{` (from ${startTime} to ${endTime})`}</p>
				<div className={noteClasses} >
					<span
						className={textClasses}
						onClick={() => onEditNote(id)}
					>{text}</span>
					<div className="display__actions">
						<span
							className={importantButtonClasses}
							onClick={() => onToggleProperty(id, 'important')}
						>&#9734;</span>
						<span className={finishButtonClasses}
							onClick={() => onToggleProperty(id, 'done')}
						>&#10004;</span>
						<span
							className="display__redact"
							onClick={() => onEditNote(id)}
						>&#9998;</span>
						<span
							className='display__remove'
							onClick={() => onRemoveItem(id)}
						>&#9850;</span>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className='display'>
			{result}
			<button
				className='display__adder'
				onClick={() => onAddNewNote(chosenYear, chosenMonth, chosenDay)}
			>Add new note</button>
		</div>
	);
};

export default NotesDisplay;