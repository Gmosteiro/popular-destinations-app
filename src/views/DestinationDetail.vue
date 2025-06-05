<template>
    <div v-if="destination" class="detail-container">
        <h2>{{ destination.baseData.title }}</h2>
        <p style="text-align:center; margin-bottom:1.5rem;">{{ destination.baseData.description || 'Sin descripción.' }}
        </p>
        <img :src="destination.baseData.thumbnail || ''" alt="Imagen del destino" class="detail-img"
            style="max-width: 100%; height: auto; display: block; margin-bottom: 1.5rem; border-radius: 18px; box-shadow: 0 4px 24px 0 rgba(0,0,0,0.09);">

        <!-- Nueva sección: Información general -->
        <div v-if="destination.knowledge_graph" class="info-extra">
            <h3>Información general</h3>
            <p v-if="destination.knowledge_graph.type">
                <strong>Tipo:</strong> {{ destination.knowledge_graph.type }}
            </p>
            <p
                v-if="destination.knowledge_graph.department_links && destination.knowledge_graph.department_links.length">
                <strong>Departamento:</strong>
                <a :href="destination.knowledge_graph.department_links[0].link" target="_blank">
                    {{ destination.knowledge_graph.department_links[0].text }}
                </a>
            </p>
            <p
                v-if="!destination.knowledge_graph.department_links || !destination.knowledge_graph.department_links.length">
                <strong>Departamento:</strong> No disponible
            </p>
            <p v-if="destination.knowledge_graph.founded">
                <strong>Fundación:</strong> {{ destination.knowledge_graph.founded }}
            </p>
            <p v-if="destination.knowledge_graph.postal_code">
                <strong>Código postal:</strong> {{ destination.knowledge_graph.postal_code }}
            </p>
            <p v-if="destination.knowledge_graph.demonym_s">
                <strong>Gentilicio:</strong> {{ destination.knowledge_graph.demonym_s }}
            </p>
            <p v-if="destination.knowledge_graph.description">
                <strong>Descripción:</strong> {{ destination.knowledge_graph.description }}
            </p>
            <p
                v-if="destination.knowledge_graph.source && destination.knowledge_graph.source.link && destination.knowledge_graph.source.name">
                <a :href="destination.knowledge_graph.source.link" target="_blank">
                    Más en {{ destination.knowledge_graph.source.name }}
                </a>
            </p>
            <div
                v-if="destination.knowledge_graph.web_results && destination.knowledge_graph.web_results.length && destination.knowledge_graph.web_results[0].carousel && destination.knowledge_graph.web_results[0].carousel.length">
                <div class="carousel-kg-imgs">
                    <img v-for="img in destination.knowledge_graph.web_results[0].carousel" :key="img.image"
                        :src="img.image" style="max-width:120px; margin:0 8px 8px 0; border-radius:8px;">
                </div>
            </div>
        </div>

        <!-- Nueva sección: Preguntas frecuentes -->
        <div v-if="destination.related_questions && destination.related_questions.length" class="faq-section">
            <h3>Preguntas frecuentes sobre el destino</h3>
            <div v-for="q in destination.related_questions" :key="q.question" class="faq-item">
                <p><strong>{{ q.question }}</strong></p>
                <p v-if="q.snippet">{{ q.snippet }}</p>
                <ul v-if="q.list && q.list.length">
                    <li v-for="item in q.list" :key="item">{{ item }}</li>
                </ul>
                <p v-if="q.title">
                    <a :href="q.link" target="_blank">{{ q.title }}</a>
                </p>
            </div>
        </div>

        <!-- Hoteles recomendados -->
        <div v-if="destination.hotels && destination.hotels.length" class="carousel-hoteles">
            <h3 style="text-align:center; margin-bottom:1.2rem; color:#22223b;">Hoteles recomendados</h3>
            <Carousel :items-to-show="2" :wrap-around="true" :mouse-drag="true" :snap-align="'center'" :transition="500"
                :autoplay="3000" :pause-autoplay-on-hover="true" :show-arrows="true" :show-dots="true"
                style="max-width: 600px; margin: 0 auto;">
                <Slide v-for="hotel in destination.hotels" :key="hotel.title">
                    <div class="hotel-slide">
                        <img :src="hotel.thumbnail" :alt="hotel.title" class="hotel-img">
                        <a :href="hotel.link" target="_blank" rel="noopener" class="hotel-title">{{ hotel.title }}</a>
                        <div class="hotel-source">{{ hotel.source }}</div>
                        <div class="hotel-rating">⭐ {{ hotel.rating }} ({{ hotel.reviews_original }} reseñas)</div>
                    </div>
                </Slide>
            </Carousel>
        </div>

        <button @click="$router.push('/')">Volver</button>
        <button @click="showInterest = true">Me interesa</button>
        <ContactForm v-if="showInterest" @close="showInterest = false" />
    </div>
    <div v-else>
        <p>No se encontró información del destino.</p>
        <button @click="$router.push('/')">Volver</button>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { fetchDestinationDetails } from '@/services/api';
import { Carousel, Slide } from 'vue3-carousel';
import ContactForm from '@/components/ContactForm.vue';

export default {
    components: {
        Carousel,
        Slide,
        ContactForm
    },
    props: ['id'],
    data() {
        return {
            destination: null,
            showInterest: false
        };
    },
    created() {
        this.destination = {
            baseData: {}
        };
        this.loadDestination();
    },
    watch: {
        id() {
            this.loadDestination();
        },
        '$route.query.country'() {
            this.loadDestination();
        }
    },
    methods: {
        async loadDestination() {
            try {
                const country = this.$route.query.country;
                const { destination } = await fetchDestinationDetails({
                    country,
                    destination: this.id
                });
                console.log('Detalles del destino:', destination);
                this.destination = destination;
            } catch (error) {
                this.destination = null;
                console.error('Error al obtener los detalles del destino:', error);
            }
        }
    }
};
</script>

<style scoped>
.detail-container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 2rem 1.5rem;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07);
}

h2 {
    text-align: center;
    color: #22223b;
    margin-bottom: 1rem;
    font-size: 2rem;
}

.detail-img {
    display: block;
    margin: 0 auto 1.5rem auto;
    max-width: 350px;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.info-extra {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1rem 1.2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04);
}

.carousel-kg-imgs {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.faq-section {
    margin: 2rem 0 1.5rem 0;
    background: #f8fafc;
    border-radius: 16px;
    padding: 2rem 2rem 1.5rem 2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #e0e0e0;
}

.faq-section h3 {
    text-align: center;
    color: #22223b;
    font-size: 1.35rem;
    margin-bottom: 1.7rem;
    font-weight: 700;
    letter-spacing: 0.01em;
}

.faq-item {
    margin-bottom: 2rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #ececec;
}

.faq-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.faq-item strong {
    color: #4a4e69;
    font-size: 1.13rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
}

.faq-item p {
    margin: 0.2rem 0 0.7rem 0;
    color: #22223b;
    font-size: 1rem;
    line-height: 1.6;
}

.faq-item ul {
    /* padding-left: 1.2rem; */
    color: #22223b;
}

.faq-item li {
    margin-bottom: 0.3rem;
    list-style: disc;
}

.faq-item a {
    color: #3a86ff;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s;
    word-break: break-word;
}

.faq-item a:hover {
    color: #0056b3;
    text-decoration: underline;
}

.carousel-hoteles {
    margin: 2rem auto 1.5rem auto;
    max-width: 600px;
    background: #f8fafc;
    border-radius: 14px;
    padding: 1.5rem 0.5rem 2rem 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}

.hotel-slide {
    padding: 1rem 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hotel-img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.7rem;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08);
}

.hotel-title {
    font-weight: bold;
    color: #22223b;
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
    text-decoration: none;
}

.hotel-source {
    color: #4a4e69;
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
}

.hotel-rating {
    color: #f59e42;
    font-size: 1rem;
    margin-bottom: 0.2rem;
}

button {
    display: block;
    margin: 2rem auto 0 auto;
    padding: 0.7rem 2.2rem;
    background: #4a4e69;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover {
    background: #22223b;
}
</style>
