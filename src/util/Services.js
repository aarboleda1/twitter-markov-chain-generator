import axios from 'axios';

export const searchTwitter = (user) => {
	return axios.get(`http://localhost:8080/user/${user}`)
};
