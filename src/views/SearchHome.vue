<template>
    <div class="search-home">
        <header class="main-header">
            <h1>Destinos Populares</h1>
        </header>

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

        <footer class="main-footer">
            <span>© {{ new Date().getFullYear() }} Popular Destinations App · Hecho con ❤️</span>
        </footer>
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
            selectedCity: ''
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
        selectedCity: 'getDestinations'
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
                    city: this.selectedCity
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
    max-width: 100vw;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
}

@media (min-width: 600px) {
    .search-home {
        max-width: 1100px;
        margin: 0 auto;
        padding: 2rem 2rem 0 2rem;
        border-radius: 18px;
        box-shadow: 0 2px 24px rgba(34, 34, 59, 0.06);
    }
}

.main-header {
    width: 100%;
    background: linear-gradient(90deg, #4f8cff 0%, #6dd5ed 100%);
    padding: 2rem 0 1.5rem 0;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 2px 12px rgba(34, 34, 59, 0.08);
    margin-bottom: 2rem;
    text-align: center;
}

.main-header h1 {
    color: #fff;
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    margin: 0;
}

.destinations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    flex: 1;
}

.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: #555;
    flex: 1;
}

.main-footer {
    width: 100%;
    background: #22223b;
    color: #fff;
    text-align: center;
    padding: 1.2rem 0 1rem 0;
    border-radius: 18px 18px 0 0;
    margin-top: 3rem;
    font-size: 1rem;
    letter-spacing: 0.5px;
    box-shadow: 0 -2px 12px rgba(34, 34, 59, 0.08);
}
</style>
