<template>
    <div class="search-home">
        <h1>Destinos Populares</h1>
        <CountrySelector v-model:country="selectedCountry" />

        <div v-if="loading" class="centered">
            <LoadingSpinner />
        </div>

        <div v-else-if="error" class="centered">
            <ErrorMessage :message="error" />
        </div>

        <div v-else-if="filteredDestinations.length" class="destinations-grid">
            <DestinationCard
                v-for="dest in filteredDestinations"
                :key="dest.destination_id || dest.title"
                v-bind="dest"
                @click="goToDetail(dest)"
            />
        </div>

        <div v-else-if="selectedCountry && !loading" class="centered">
            <p>No hay destinos disponibles para {{ selectedCountry }}.</p>
        </div>
    </div>
</template>

<script>
import DestinationCard from '../components/DestinationCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import CountrySelector from '../components/CountrySelector.vue';
import { fetchDestinations } from '../services/api.js';

export default {
    components: {
        DestinationCard,
        LoadingSpinner,
        ErrorMessage,
        CountrySelector
    },
    data() {
        return {
            destinations: [],
            loading: false,
            error: null,
            searchTerm: '',
            selectedCountry: 'Uruguay'
        };
    },
    computed: {
        filteredDestinations() {
            /*
            this.destinations[0] = {
            description: "Colonial Ciudad Vieja & Pocitos beach",
            extracted_flight_price: 886,
            flight_price: "$886",
            link: "https://www.google.com/search?sca_esv=cf6290cf059c5086&q=Montevideo&si=AMgyJEvmed8FkyEkpEJ8jfGhZkakcy5kQho_c4G-QJRdklshMgBviZBMZUY6WwOFPG6CBA6nkxhGx6g_1jDh_S9drHk0GowTPg%3D%3D&sa=X&ved=2ahUKEwiMla-MntWNAxWA6ckDHZtQMuYQs4ILegQIPBAD",
            thumbnail: "https://serpapi.com/searches/683ee82071577f8f32e782d4/images/cdff8ee4a1364cb487508b706bfe490352f704aeb89bd59a841809a49eb258dfad577bf7feb63f5fe5de2dcf9d44cb73.jpeg",
            title: "Montevideo"
            */
            return this.destinations;
        }
    },
    watch: {
        selectedCountry: 'getDestinations'
    },
    methods: {
        async getDestinations() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetchDestinations({ country: this.selectedCountry });
                this.destinations = response.destinations;
            } catch (err) {
                this.error = 'Error cargando los destinos.';
            } finally {
                this.loading = false;
            }
        },
        goToDetail(dest) {
            this.$router.push({
                name: 'DestinationDetail',
                params: { id: dest.title, destination: dest }
            });
        }
    },
    created() {
        this.getDestinations();
    }
};
</script>

<style scoped>
.search-home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    background: #f8fafc;
    min-height: 100vh;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #22223b;
    font-size: 2.2rem;
    letter-spacing: 1px;
}

.destinations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: #555;
}
</style>
