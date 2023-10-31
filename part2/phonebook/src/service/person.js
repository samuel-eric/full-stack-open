import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(baseUrl).then((response) => response.data);
};

const create = (data) => {
	return axios.post(baseUrl, data).then((response) => response.data);
};

const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, remove };
