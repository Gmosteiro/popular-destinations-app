<template>
  <div class="destination-card" @mouseover="hover = true" @mouseleave="hover = false" :class="{ hovered: hover }">
    <img :src="thumbnail" :alt="title" class="destination-image" />
    <div class="destination-info">
      <h2 class="title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
      <div class="tags">
        <span v-if="flight_price" class="tag flight">✈️ {{ flight_price }}</span>
        <span v-else-if="hotel_price" class="tag hotel">🏨 {{ hotel_price }}</span>
        <span v-if="drive_duration" class="tag drive">🚗 {{ drive_duration }}</span>
      </div>
      <a v-if="isDestination" :href="link" target="_blank" class="view-more" @click.prevent="$emit('click')">Ver más</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DestinationCard',
  props: {
    title: String,
    description: String,
    flight_price: String,
    hotel_price: String,
    drive_duration: String,
    thumbnail: String,
    link: String,
    isDestination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hover: false
    }
  }
}
</script>

<style scoped>
.destination-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  overflow: hidden;
  max-width: 340px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(34, 34, 59, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  margin: 0 auto;
}

.destination-card:hover .destination-image {
  transform: scale(1.02);
}

.destination-card.hovered,
.destination-card:hover {
  box-shadow: 0 6px 24px rgba(34, 34, 59, 0.18);
  transform: translateY(-4px) scale(1.03);
}

.destination-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #f0f0f0;
  transition: filter 0.2s;
}

.destination-info {
  padding: 1.2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #22223b;
  margin-bottom: 0.3rem;
}

.description {
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  min-height: 48px;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  background: #f3f3f3;
  color: #22223b;
  border-radius: 6px;
  padding: 0.2rem 0.7rem;
  font-size: 0.95rem;
  font-weight: 500;
  display: inline-block;
}

.tag.flight {
  background: #e0f7fa;
  color: #007bff;
}

.tag.hotel {
  background: #fff3e0;
  color: #ff9800;
}

.tag.drive {
  background: #e8f5e9;
  color: #43a047;
}

.view-more {
  margin-top: 0.5rem;
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.view-more:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>