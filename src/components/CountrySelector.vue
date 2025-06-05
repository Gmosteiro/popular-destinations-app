<template>
  <div>
    <label for="country">País de destino:</label>
    <select id="country" v-model="selectedCountry" @change="$emit('update:country', selectedCountry)">
      <option disabled value="">Selecciona un país</option>
      <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    country: String
  },
  data() {
    return {
      selectedCountry: this.country || '',
      countries: ['Uruguay', 'Argentina', 'Brasil', 'Chile', 'Italia', 'España', 'Francia', 'Alemania', 'Estados Unidos', 'Canadá']
    };
  }
};
</script>