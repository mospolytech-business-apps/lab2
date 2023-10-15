<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold mb-0 fs-4">Добавить предложение</h5>
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
                            <div class="form-floating mb-3">
                                <select id="type" v-model="RealEstateId" class="form-select" aria-label="Объект недвижимости">
                                    <option v-for="object in objects" :key="object.Id" :value="object.Id">{{object.Id}} {{object.Address_City}} {{object.Address_Street}} дом {{object.Address_House}} кв. {{object.Address_Number}} площадь {{object.TotalArea}}</option>
                                </select>
                                <label for="type" class="required">Объект недвижимости</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input required id="Address_Number" v-model="Price" type="number" class="form-control rounded-3">
                                <label for="Address_Number" class="required">Цена</label>
                                <small id="Address_Number" class="form-text text-muted">Цена должна быть целым положительным числом</small>
                            </div>
                        </div>
                        <div class="modal-footer form-group">
                            <button class="w-40 mb-2 btn btn-secondary rounded-pill" @click="$emit('close')">
                                Отмена
                            </button>
                            <button class="w-40 mb-2 btn btn-primary rounded-pill" @submit="this.onSubmit" :disabled="!isValidForm">Добавить предложение</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useSuppliesStore } from '../store/supplies'
import { useObjectsStore } from '../store/objects';
import { useClientsStore } from '../store/clients';
import { useAgentsStore } from '../store/agents';

export default {
    emits: ['close'],
    data() {
        return {
            type: 'apartment',
            objects: useObjectsStore().objects,
            clients: useClientsStore().clients,
            agents: useAgentsStore().agents,
            ClientId: '',
            AgentId: '',
            RealEstateId: '',
            Price: null,
        }
  },
  computed: {
    isValidForm() {
        return Number.isInteger(this.Price) & !(!(this.Price)) & !(!(this.RealEstateId)) & !(!(this.AgentId)) & !(!(this.ClientId)) & this.Price>0
    }
  },
  methods: {
    onSubmit() {
      if (!this.isValidForm) return
      let supply = {
        ClientId: this.ClientId,
        AgentId: this.AgentId, 
        Price: this.Price,
        RealEstateId: this.RealEstateId,
        Id: useSuppliesStore().supplies[useSuppliesStore().supplies.length - 1].Id + 1
      }
      useSuppliesStore().addSupply(supply);
      console.log(supply)
    }
  }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>