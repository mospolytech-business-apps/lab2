<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content rounded-3 shadow">
                <div class="modal-body p-4 text-center">
                    <h5 class="">Подтверждение удаления</h5>

                    <p class="mb-0">Вы уверены, что желаете безвозвратно удалить <slot></slot>
                    </p>
                </div>
                <div class="modal-footer flex-nowrap p-0">
                    <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                    data-bs-dismiss="modal" @click="$emit('close')">Нет, оставить</button>
                    <button type="button" @click="$emit('proof');$emit('close')"
                        class="btn btn-lg text-danger btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 "><strong>Да, удалить</strong></button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    emits: ['close', 'proof'],
}
</script>
<style lang="scss">
.modal {
    display: block !important;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.4);
}</style>