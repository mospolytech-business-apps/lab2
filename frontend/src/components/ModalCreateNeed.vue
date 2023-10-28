<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold mb-0 fs-4">Добавить потребность</h5>
                    <button type="button" class="btn btn-close" @click="$emit('close')"></button>
                </div>
                    <form @submit.prevent="onSubmit">
                        <div class="modal-body row g-2">
                            <div class="form-floating mb-3">
                                <select id="type" v-model="ClientId" class="form-select" aria-label="Объект недвижимости">
                                    <option v-for="client in clients" :key="client.Id" :value="client.Id">{{client.Id}} {{client.FirstName}} {{client.MiddleName}} {{client.LastName}}</option>
                                </select>
                                <label for="type" class="required">Клиент</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select id="type" v-model="AgentId" class="form-select" aria-label="Объект недвижимости">
                                    <option v-for="agent in agents" :key="agent.Id" :value="agent.Id">{{agent.Id}} {{agent.FirstName}} {{agent.MiddleName}} {{agent.LastName}} (доля комиссии {{agent.DealShare}})</option>
                                </select>
                                <label for="type" class="required">Риэлтор</label>
                            </div>
                            <div class="form-floating mb-3 col-md-4">
                                <input v-model="Address_City" class="form-control rounded-3" id="Address_City">
                                <label for="Address_City">Город</label>
                            </div>
                            <div class="form-floating mb-3 col-md-8">
                                <input v-model="Address_Street" id="Address_Street" class="form-control rounded-3">
                                <label for="Address_Street">Улица</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Address_House" v-model="Address_House" class="form-control rounded-3">
                                <label for="Address_House">Дом</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Address_Number" v-model="Address_Number" class="form-control rounded-3">
                                <label for="Address_Number">Квартира</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select id="type" v-model="type" class="form-select" aria-label="Тип объекта недвижимости">
                                    <option value="apartment" selected>Квартира</option>
                                    <option value="house">Дом</option>
                                    <option value="land">Земля</option>
                                </select>
                                <label for="type">Тип объекта недвижимости</label>
                            </div>
                            <div v-if="type=='apartment' || type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="MinRooms" v-model="MinRooms" class="form-control rounded-3">
                                <label for="MinRooms">Минимальное кол-во комнат</label>
                            </div>
                            <div v-if="type=='apartment' || type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="MaxRooms" v-model="MaxRooms" class="form-control rounded-3">
                                <label for="MaxRooms">Максимальное кол-во комнат</label>
                            </div>
                            <div v-if="type=='apartment'" class="form-floating mb-3 col-md-6">
                                <input id="MinFloors" v-model="MinFloors" class="form-control rounded-3">
                                <label for="MinFloors">Минимальный этаж</label>
                            </div>
                            <div v-if="type=='apartment'" class="form-floating mb-3 col-md-6">
                                <input id="MaxFloors" v-model="MaxFloors" class="form-control rounded-3">
                                <label for="MaxFloors">Максимальный этаж</label>
                            </div>
                            <div v-if="type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="MinFloors" v-model="MinFloors" class="form-control rounded-3">
                                <label for="MinFloors">Минимальная этажность дома</label>
                            </div>
                            <div v-if="type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="MaxFloors" v-model="MaxFloors" class="form-control rounded-3">
                                <label for="MaxFloors">Максимальная этажность дома</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="MinArea" v-model="MinArea" class="form-control rounded-3">
                                <label for="MinArea">Минимальная площадь</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="MaxArea" v-model="MaxArea" class="form-control rounded-3">
                                <label for="MaxArea">Максимальная площадь</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input required id="MinPrice" v-model="MinPrice" type="number" class="form-control rounded-3">
                                <label for="MinPrice" class="required">Минимальная цена</label>
                                <small for="MinPrice" class="form-text text-muted">Минимальная цена должна быть целым положительным числом</small>
                            </div>
                            <div class="form-floating mb-3">
                                <input required id="MaxPrice" v-model="MaxPrice" type="number" class="form-control rounded-3">
                                <label for="MaxPrice" class="required">Максимальная цена</label>
                                <small id="MaxPrice" class="form-text text-muted">Максимальная цена должна быть целым положительным числом</small>
                            </div>
                        </div>
                        <div class="modal-footer form-group">
                            <button class="w-40 mb-2 btn btn-secondary rounded-pill" @click="$emit('close')">
                                Отмена
                            </button>
                            <button class="w-40 mb-2 btn btn-primary rounded-pill" @submit="this.onSubmit" :disabled="!isValidForm">Добавить потребность</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useDemandsStore } from '../store/demands'
import { useClientsStore } from '../store/clients';
import { useAgentsStore } from '../store/agents';

export default {
    emits: ['close'],
    data() {
        return {
            type: 'apartment',
            clients: useClientsStore().clients,
            agents: useAgentsStore().agents,
            ClientId: '',
            AgentId: '',
            MinPrice: null,
            MaxPrice: null,
            MinFloors: '',
            MaxFloors: '',
            MinRooms: '',
            MaxRooms: '',
            MinArea: '',
            MaxArea: '',
            Address_City: '',
            Address_Street: '',
            Address_House: '',
            Address_Number: '',
        }
  },
  computed: {
    isValidForm() {
        return Number.isInteger(this.MaxPrice) & Number.isInteger(this.MinPrice) & !(!(this.MaxPrice)) & !(!(this.AgentId)) & !(!(this.ClientId)) & this.MaxPrice>0 & this.MinPrice>0
    }
  },

  methods: {
    onSubmit() {
      if (!this.isValidForm) return
      let demand = {
        ClientId: this.ClientId,
        AgentId: this.AgentId, 
        MinPrice: this.MinPrice,
        MaxPrice: this.MaxPrice,
        Type: this.type,
        MinArea: this.MinArea,
        MaxArea: this.MaxArea,
        Id: useDemandsStore().demands[useDemandsStore().demands.length - 1].Id + 1
      }
      if (this.type=='apartment' || this.type=='house') {
        demand.MinFloors = this.MinFloors;
        demand.MaxFloors = this.MaxFloors
        demand.MinRooms = this.MinRooms;
        demand.MaxRooms = this.MaxRooms
    }
      useDemandsStore().addDemand(demand);
      console.log(demand)
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>