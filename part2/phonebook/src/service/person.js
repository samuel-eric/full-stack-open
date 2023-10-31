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

const update = (id, data) => {
	return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
};

export default { getAll, create, remove, update };
