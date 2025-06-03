<template>
    <div>
        <h2>{{ destination.title }}</h2>
        <p>{{ destination.description || 'Sin descripción.' }}</p>
        <img :src="destination.image || ''" alt="Imagen del destino" style="max-width: 400px;">
        <button @click="$router.push('/')">Volver</button>
    </div>
</template>

<script>
export default {
    props: ['id', 'destination'],
};
</script>
