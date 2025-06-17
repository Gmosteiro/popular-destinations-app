<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h3>¿Te interesa este destino?</h3>
            <form @submit.prevent="submit">
                <label>
                    Nombre:
                    <input v-model="form.name" required />
                </label>
                <label>
                    Email:
                    <input v-model="form.email" type="email" required />
                </label>
                <label>
                    Mensaje (opcional):
                    <textarea v-model="form.message" rows="3"></textarea>
                </label>
                <div class="modal-actions">
                    <button type="submit">Enviar</button>
                    <button type="button" @click="$emit('close')" class="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close'],
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        submit() {
            alert('¡Gracias por tu interés! Te contactaremos pronto.');
            this.$emit('close');
            this.form = { name: '', email: '', message: '' };
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(34, 34, 59, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    border-radius: 14px;
    padding: 2rem 2.2rem;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.13);
    min-width: 320px;
    max-width: 90vw;
}

.modal-content h3 {
    margin-bottom: 1.2rem;
    color: #22223b;
    text-align: center;
}

.modal-content label {
    display: block;
    margin-bottom: 1rem;
    color: #22223b;
    font-weight: 500;
}

.modal-content input,
.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.3rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    box-sizing: border-box;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.2rem;
}

.modal-actions button {
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    background: #4a4e69;
    color: #fff;
    transition: background 0.2s;
}

.modal-actions .cancel-btn {
    background: #ccc;
    color: #22223b;
}

.modal-actions button:hover:not(.cancel-btn) {
    background: #22223b;
}

.modal-actions .cancel-btn:hover {
    background: #bbb;
}
</style>