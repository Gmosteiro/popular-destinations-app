import axios from 'axios';
import { API_URL, API_KEY } from '@/lib/contants';

export const fetchDestinations = async (params) => {

    const sanitizeCity = params.city ? params.city.replace(' ', '+').trim() : '';
    const sanitizeCountry = params.country ? params.country.replace(' ', '+').trim() : '';

    const query = params.city
        ? `${sanitizeCountry}+${sanitizeCity}+Destinations`
        : `${sanitizeCountry}+Destinations`;

    const apiResponse = await axios.get(`${API_URL}?api_key=${API_KEY}`, {
        params: {
            q: query.trim()
        }
    });

    const destinations = apiResponse.data?.popular_destinations?.destinations || [];
    const sights = apiResponse.data?.top_sights?.sights || [];
    let shopping = [];

    if (!destinations.length && !sights.length && apiResponse.data?.shopping_results?.length) {
        shopping = apiResponse.data.shopping_results.map(item => ({
            title: item.title,
            price: item.price,
            rating: item.rating,
            reviews: item.reviews,
            thumbnail: item.thumbnail,
            link: item.link,
            source: item.source,
            description: item.source // o puedes dejarlo vacío o usar otra propiedad
        }));
    }

    return {
        destinations,
        sights,
        shopping
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