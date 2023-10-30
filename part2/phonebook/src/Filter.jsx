const Filter = ({ searchWord, handleSearch }) => {
	return (
		<div>
			filter shown with <input value={searchWord} onChange={handleSearch} />
		</div>
	);
};

export default Filter;
