<template>
  <main class="p-4 space-y-8" aria-labelledby="destination-title">
    <h1 id="destination-title" class="text-3xl font-bold sr-only">Detalle del destino</h1>

    <section v-if="destination && destination.baseData.title" role="region">
      <h2 class="text-2xl font-semibold">{{ destination.baseData.title }}</h2>
      <p class="text-center mb-6">{{ destination.baseData.description || 'Sin descripción.' }}</p>
    </section>

    <!-- Contenedor horizontal responsive -->
    <div class="flex flex-col gap-6 xl:flex-row xl:justify-between xl:gap-4">
      <section v-if="destination.knowledge_graph" class="info-box bg-white rounded-2xl shadow p-4 flex-1">
        <h3 class="text-xl font-semibold mb-2">Información general</h3>
        <p v-if="destination.knowledge_graph.type"><strong>Tipo:</strong> {{ destination.knowledge_graph.type }}</p>
        <p v-if="destination.knowledge_graph.department_links?.length">
          <strong>Departamento:</strong>
          <a :href="destination.knowledge_graph.department_links[0].link" target="_blank">
            {{ destination.knowledge_graph.department_links[0].text }}
          </a>
        </p>
        <p v-if="!destination.knowledge_graph.department_links?.length">
          <strong>Departamento:</strong> No disponible
        </p>
        <p v-if="destination.knowledge_graph.founded"><strong>Fundación:</strong> {{ destination.knowledge_graph.founded }}</p>
        <p v-if="destination.knowledge_graph.postal_code"><strong>Código postal:</strong> {{ destination.knowledge_graph.postal_code }}</p>
        <p v-if="destination.knowledge_graph.demonym_s"><strong>Gentilicio:</strong> {{ destination.knowledge_graph.demonym_s }}</p>
      </section>

      <section v-if="destination.knowledge_graph?.description" class="info-box bg-white rounded-2xl shadow p-4 flex-1">
        <h3 class="text-xl font-semibold mb-2">Descripción</h3>
        <p>{{ destination.knowledge_graph.description }}</p>
        <p v-if="destination.knowledge_graph.source?.link">
          <a :href="destination.knowledge_graph.source.link" target="_blank">
            Más en {{ destination.knowledge_graph.source.name }}
          </a>
        </p>
      </section>

      <section v-if="destination.knowledge_graph?.web_results?.[0]?.carousel?.length" class="info-box bg-white rounded-2xl shadow p-4 flex-1">
        <h3 class="text-xl font-semibold mb-2">Imágenes</h3>
        
        <div class="grid grid-cols-2 gap-2">
          <img v-for="img in destination.knowledge_graph.web_results[0].carousel" :key="img.image" :src="img.image" class="w-[48%] md:w-[30%] lg:w-[32%]" />
        </div>
      </section>
    </div>

    <!-- Preguntas frecuentes -->
    <section v-if="destination.related_questions?.length" class="faq-section mt-8">
      <h3>Preguntas frecuentes</h3>
      <div v-for="q in destination.related_questions" :key="q.question" class="faq-item">
        <p><strong>{{ q.question }}</strong></p>
        <p v-if="q.snippet">{{ q.snippet }}</p>
        <p v-if="q.title">
          <a :href="q.link" target="_blank">{{ q.title }}</a>
        </p>
      </div>
    </section>

    <!-- Hoteles -->
    <div v-if="destination.hotels?.length" class="carousel-hoteles">
      <h3 style="text-align:center; margin-bottom:1.2rem; color:#22223b;">Hoteles recomendados</h3>
      <Carousel :items-to-show="2" :wrap-around="true" :mouse-drag="true" :snap-align="'center'" :transition="500"
        :autoplay="3000" :pause-autoplay-on-hover="true" :show-arrows="true" :show-dots="true"
        style="max-width: 600px; margin: 0 auto;">
        <Slide v-for="hotel in destination.hotels" :key="hotel.title">
          <div class="hotel-slide">
            <img :src="hotel.thumbnail" :alt="hotel.title" class="hotel-img" />
            <a :href="hotel.link" target="_blank" rel="noopener" class="hotel-title">{{ hotel.title }}</a>
            <div class="hotel-source">{{ hotel.source }}</div>
            <div class="hotel-rating">⭐ {{ hotel.rating }} ({{ hotel.reviews_original }} reseñas)</div>
          </div>
        </Slide>
      </Carousel>
    </div>

    <!-- Botones -->
    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
      <button @click="$router.push('/')">Volver</button>
      <button @click="showInterest = true">Me interesa</button>
    </div>
    <ContactForm v-if="showInterest" @close="showInterest = false" />
  </main>
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
    this.destination = { baseData: {} };
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
.info-box {
  min-width: 300px;
}
@media (min-width: 1024px) {
  .info-box {
    max-width: 32%;
  }
}
</style>
