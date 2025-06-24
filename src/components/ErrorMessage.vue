<template>
    <div class="error-message" role="alert" aria-live="assertive">
        <div class="error-icon" aria-hidden="true">⚠️</div>
        <span class="error-text">{{ message }}</span>
    </div>
</template>

<script>
export default {
    props: ['message'],
};
</script>

<style scoped>
.error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    padding: 1rem;
    color: #c53030;
    max-width: 400px;
}

.error-icon {
    font-size: 1.25rem;
}

.error-text {
    font-weight: 500;
}
</style>
