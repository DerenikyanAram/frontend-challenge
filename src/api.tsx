import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'your_api_key_here'; // Замените на ваш ключ

export const fetchCats = async (limit: number = 10) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-api-key': API_KEY,
            },
            params: { limit },
        } as any);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке данных из API:', error);
        throw error;
    }
};
