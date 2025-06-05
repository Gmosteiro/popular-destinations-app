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

export const fetchDestinationHotels = async (params) => {
    const apiResponse = await axios.get(`${API_URL}?api_key=${API_KEY}`, {
        params: {
            q: `${params.country}+${params.destination}+Hoteles`
        }
    });

    return {
        hotels: apiResponse.data.shopping_results.slice(0, 5) || {}
    }
}

export const fetchDestinationDetails = async (params) => {
    const apiResponse = await axios.get(`${API_URL}?api_key=${API_KEY}`, {
        params: {
            q: `${params.country}+${params.destination}`
        }
    });

    const { hotels } = await fetchDestinationHotels(params);

    return {
        destination: {
            baseData: localStorage.selectedDestination ? JSON.parse(localStorage.selectedDestination) : {},
            related_questions: apiResponse.data.related_questions ? apiResponse.data.related_questions.slice(0, 5) : [],
            knowledge_graph: apiResponse.data.knowledge_graph || {},
            hotels: hotels || []
        }
    }
}