const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	const successStyle = {
		color: 'green',
		border: '3px solid green',
		borderRadius: 5,
		background: 'lightgrey',
		fontSize: 20,
		padding: '10px 5px',
	};
	const errorStyle = {
		color: 'red',
		border: '3px solid red',
		borderRadius: 5,
		background: 'lightgrey',
		fontSize: 20,
		padding: '10px 5px',
	};
	return (
		<div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
	);
};

export default Notification;
