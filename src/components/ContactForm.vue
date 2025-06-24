<template>
    <div class="modal-overlay" role="dialog" aria-labelledby="modal-title" aria-modal="true"
        @click.self="$emit('close')" @keydown.esc="$emit('close')">
        <div class="modal-content" ref="modalContent">
            <h3 id="modal-title">¿Te interesa este destino?</h3>
            <form @submit.prevent="submit">
                <label for="contact-name">
                    Nombre:
                    <input id="contact-name" v-model="form.name" required aria-describedby="name-required"
                        ref="firstInput" />
                    <span id="name-required" class="sr-only">Campo obligatorio</span>
                </label>
                <label for="contact-email">
                    Email:
                    <input id="contact-email" v-model="form.email" type="email" required
                        aria-describedby="email-required" />
                    <span id="email-required" class="sr-only">Campo obligatorio</span>
                </label>
                <label for="contact-message">
                    Mensaje (opcional):
                    <textarea id="contact-message" v-model="form.message" rows="3"
                        aria-describedby="message-optional"></textarea>
                    <span id="message-optional" class="sr-only">Campo opcional</span>
                </label>
                <div class="modal-actions">
                    <button type="submit" aria-describedby="submit-description">Enviar</button>
                    <span id="submit-description" class="sr-only">Enviar formulario de contacto</span>
                    <button type="button" @click="$emit('close')" class="cancel-btn"
                        aria-label="Cancelar y cerrar formulario">
                        Cancelar
                    </button>
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
    mounted() {

        this.$nextTick(() => {
            if (this.$refs.firstInput) {
                this.$refs.firstInput.focus();
            }
        });


        document.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        submit() {
            alert('¡Gracias por tu interés! Te contactaremos pronto.');
            this.$emit('close');
            this.form = { name: '', email: '', message: '' };
        },
        handleKeyDown(e) {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        },
        trapFocus(e) {
            const focusableElements = this.$refs.modalContent.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
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

/* Clases para lectores de pantalla */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Mejor contraste para elementos de foco */
.modal-content input:focus,
.modal-content textarea:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

.modal-actions button:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
}
</style>