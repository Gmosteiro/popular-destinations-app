<template>
    <div class="search-home">
        <h1>Destinos Populares</h1>
        <CountrySelector v-model:country="selectedCountry" v-model:city="selectedCity" />

        <div v-if="loading" class="centered">
            <LoadingSpinner />
        </div>

        <div v-else-if="error" class="centered">
            <ErrorMessage :message="error" />
        </div>

        <div v-else-if="filteredDestinations.length" class="destinations-grid">
            <DestinationCard v-for="dest in filteredDestinations" :key="dest.destination_id || dest.title" v-bind="dest"
                @click="goToDetail(dest)" />
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
            selectedCountry: 'Uruguay',
            selectedCity: '' // <-- Agregado
        };
    },
    computed: {
        filteredDestinations() {
            if (this.destinations && this.destinations.length) {
                return this.destinations;
            }
            const sights = JSON.parse(localStorage.getItem('allSights') || '[]');
            if (sights.length) {
                return sights;
            }
            const shopping = JSON.parse(localStorage.getItem('allShopping') || '[]');
            return shopping;
        }
    },
    watch: {
        selectedCountry: 'getDestinations',
        selectedCity: 'getDestinations' // <-- Agregado
    },
    methods: {
        async getDestinations() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetchDestinations({
                    country: this.selectedCountry,
                    city: this.selectedCity
                });
                this.destinations = response.destinations || [];
                if (response.sights) {
                    localStorage.setItem('allSights', JSON.stringify(response.sights));
                }
                if (response.shopping) {
                    localStorage.setItem('allShopping', JSON.stringify(response.shopping));
                }
                localStorage.setItem('allDestinations', JSON.stringify(this.destinations));
            } catch (err) {
                console.error('Error al cargar los destinos:', err);
                this.error = 'Error cargando los destinos.';
            } finally {
                this.loading = false;
            }
        },
        goToDetail(dest) {
            localStorage.setItem('selectedDestination', JSON.stringify(dest));
            this.$router.push({
                name: 'DestinationDetail',
                params: { id: dest.title },
                query: {
                    country: this.selectedCountry,
                    city: this.selectedCity // <-- Agregado
                }
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
