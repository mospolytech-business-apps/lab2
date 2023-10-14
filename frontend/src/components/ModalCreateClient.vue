<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold mb-0 fs-4">Добавить клиента</h5>
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
                                <input id="Phone" v-model="phone" type="phone" class="form-control rounded-3">
                                <label for="Phone">Телефон</label>
                            </div>
                            <div class="form-floating">
                                <input id="Email" v-model="email" type="email" class="form-control rounded-3">
                                <label for="Email">Email</label>
                            </div>
                        </div>
                        <div class="modal-footer form-group">
                            <button class="w-40 mb-2 btn btn-lg rounded-3 btn-secondary" @click="$emit('close')">
                                Отмена
                            </button>
                            <button class="w-40 mb-2 btn btn-lg rounded-3 btn-primary" @submit="this.onSubmit" :disabled="!isValidForm">Добавить клиента</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useClientsStore } from '../store/clients'

export default {
    emits: ['close'],
    data() {
        return {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: ''
        }
  },
  computed: {
    isValidForm() {
      return !(!(this.phone || this.email))
    }
  },
  methods: {
    onSubmit() {
      if (!this.isValidForm) return
      const client = {
        FirstName: this.firstName,
        LastName: this.lastName, 
        MiddleName: this.middleName,
        Phone: this.phone,
        Email: this.email,
        Id: useClientsStore().clients[useClientsStore().clients.length - 1].Id + 1
      }
      useClientsStore().addClient(client);
    //   this.$emit('submit', client);
      console.log(client)
    }
  }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>