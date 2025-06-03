import axios from 'axios';
import { API_URL, API_KEY } from '@/lib/contants';

export const fetchDestinations = async (params) => {
    const apiResponse = await axios.get(`${API_URL}?api_key=${API_KEY}`, {
        params: {
            q: `${params.country}+Destinations`
        }
    });

    return {
        destinations: apiResponse.data.popular_destinations.destinations || []
    }
}