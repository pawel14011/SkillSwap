import axios from 'axios'

// Upewnij się, że adres URL pasuje do Twojego backendu
const API_URL = 'http://localhost:5000/api'

const api = axios.create({
	baseURL: API_URL,
})

// Możesz dodać interceptory do obsługi błędów globalnie
api.interceptors.response.use(
	response => response,
	error => {
		// Np. wyloguj jeśli token jest nieważny (401)
		if (error.response && error.response.status === 401) {
			// Tutaj można by wywołać funkcję wylogowującą z AuthContext
			console.error('Unauthorized, logging out.')
			// window.location.href = '/login'; // Proste przekierowanie
		}
		return Promise.reject(error)
	}
)

export default api
