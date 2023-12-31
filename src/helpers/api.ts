import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mihorario.uninorte.edu.co/M1H0R4R10',
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('horun') ?? '{"token": ""}').token}`
  },
})

export default api