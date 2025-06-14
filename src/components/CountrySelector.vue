<template>
  <div class="country-selector">
    <label for="country">País de destino:</label>
    <select id="country" v-model="selectedCountry" @change="onCountryChange">
      <option disabled value="">Selecciona un país</option>
      <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
    </select>

    <label v-if="cities.length" for="city" style="margin-top:1rem;">Ciudad:</label>
    <select v-if="cities.length" id="city" v-model="selectedCity" @change="onCityChange">
      <option disabled value="">Selecciona una ciudad</option>
      <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    country: String,
    city: String
  },
  data() {
    return {
      selectedCountry: this.country || '',
      selectedCity: this.city || '',
      countries: ['Uruguay', 'Argentina', 'Brasil', 'España', 'Italia', 'Estados Unidos', 'Mexico'],
      citiesByCountry: {
        Uruguay: ['Montevideo', 'Punta Del Este', 'Rocha', 'Colonia'],
        Argentina: ['Buenos Aires', 'Bariloche', 'Cordoba', 'Mendoza'],
        Brasil: ['Rio de Janeiro', 'Sao Paulo', 'Salvador'],
        España: ['Madrid', 'Ibiza', 'Sevilla'],
        Italia: ['Roma', 'Milan', 'Florencia', 'Venecia'],
        'Estados Unidos': ['New York', 'Los Angeles', 'Miami', 'Chicago'],
        Mexico: ['Cancun', 'Ciudad de México', 'Guadalajara', 'Tijuana']
      }
    };
  },
  computed: {
    cities() {
      return this.selectedCountry ? this.citiesByCountry[this.selectedCountry] : [];
    }
  },
  methods: {
    onCountryChange() {
      this.selectedCity = '';
      this.$emit('update:country', this.selectedCountry);
      this.$emit('update:city', '');
    },
    onCityChange() {
      this.$emit('update:city', this.selectedCity);
    }
  }
};
</script>

<style scoped>
.country-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

select {
  padding: 0.5rem 1.2rem;
  border: 1px solid #bfc4ca;
  border-radius: 6px;
  background: #fff;
  font-size: 1rem;
  color: #222;
  transition: border-color 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

select:focus {
  border-color: #4f8cff;
  outline: none;
}
</style>