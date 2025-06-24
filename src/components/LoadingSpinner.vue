<template>
    <div class="loading-spinner" role="status" aria-label="Cargando contenido">
        <div class="spinner" aria-hidden="true"></div>
        <span class="loading-text">Cargando...</span>
    </div>
</template>

<style scoped>
.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    color: #555;
    font-size: 1.1rem;
}
</style>
