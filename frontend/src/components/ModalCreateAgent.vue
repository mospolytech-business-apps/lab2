<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold mb-0 fs-4">Добавить агента</h5>
                    <button type="button" class="btn btn-close" @click="$emit('close')"></button>
                </div>
                    <form @submit.prevent="onSubmit">
                        <div class="modal-body">
                            <div class="form-floating mb-3">
                                <input v-model="middleName" class="form-control rounded-3" id="middleName">
                                <label for="middleName">Фамилия</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="firstName" id="firstName" class="form-control rounded-3">
                                <label for="firstName">Имя</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input id="lastName" v-model="lastName" class="form-control rounded-3">
                                <label for="lastName">Отчество</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input id="DealShare" v-model="DealShare" type="number" class="form-control rounded-3">
                                <label for="DealShare">Доля от комиссии</label>
                            </div>
                        </div>
                        <div class="modal-footer form-group">
                            <button class="w-40 mb-2 btn rounded-pill btn-secondary" @click="$emit('close')">
                                Отмена
                            </button>
                            <button class="w-40 mb-2 btn rounded-pill btn-primary" @submit="this.onSubmit" :disabled="!isValidForm">Сохранить изменения</button>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>
</template>
  
<script>
import { useAgentsStore } from '../store/agents'

export default {
    emits: ['close'],
    data() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
      DealShare: '',
    }
  },
  computed: {
    isValidForm() {
      return !(!(this.firstName))  & !(!(this.lastName)) & !(!(this.middleName))
    }
  },
  methods: {
    onSubmit() {
      if (!this.isValidForm) return
      const agent = {
        FirstName: this.firstName,
        LastName: this.lastName, 
        MiddleName: this.middleName,
        DealShare: this.DealShare,
        Id: useAgentsStore().agents[useAgentsStore().agents.length - 1].Id + 1
      }
      useAgentsStore().addAgent(agent);
    //   this.$emit('submit', agent);
      console.log(agent)
    },

  }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>