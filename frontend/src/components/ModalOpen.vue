<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 v-if="this.type=='client'" class="modal-title fw-bold mb-0 fs-4">Окно клиента #{{this.id}}</h5>
                    <h5 v-else class="modal-title fw-bold mb-0 fs-4">Окно риэтора #{{this.id}}</h5>
                    <button type="button" class="btn btn-close" @click="$emit('close')"></button>
                </div>
                    <!-- <form @submit.prevent="onSubmit">
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
                    </form> -->
                <div class="modal-body">
                    <div class="list-group mb-3">
                        <div v-for="item in listSupplies" :key="item.Id" href="#" class="card text-danger border-danger list-group-item list-group-item-action p-1" aria-current="true">
                            <div class="card-body">
                                <h5 class="card-title m-0">Предложение ID {{item['Id']}}</h5>
                                <p class="card-text m-0 badge bg-danger rounded-pill mb-2 mt-2" >Клиент #{{item['ClientId']}}, Риэлтор #{{item['AgentId']}}</p>          
                                <p class="card-text" v-if="item['Price']">Цена {{item['Price']}} руб.</p>
                              </div>
                        </div>
                    </div>
                    <div class="list-group">
                        <div v-for="item in listDemands" :key="item.Id" href="#" class="card text-primary border-primary list-group-item list-group-item-action p-1" aria-current="true">
                            <div class="card-body">
                                <h5 class="card-title m-0">Потребность ID {{item['Id']}}</h5>
                                <p class="card-text m-0 badge bg-primary rounded-pill mt-2 mb-2" >Клиент #{{item['ClientId']}}, Риэлтор #{{item['AgentId']}}</p>          
                                <p class="card-text m-0" v-if="!!(item['Address_City']) + !!(item['Address_Street'])">Адрес: {{item['Address_City']}} {{item['Address_Street']}} {{item['Address_House']}} {{item['Address_Number']}}</p>
                                <p class="card-text m-0" v-if="!!(item['MinPrice']) + !!(item['MaxPrice'])">Цена: {{item['MinPrice']?'от '+item['MinPrice']:item['MinPrice']}} {{item['MaxPrice']?'по '+item['MaxPrice']:item['MaxPrice']}}  руб.</p>
                                <p class="card-text m-0" v-if="!!(item['MinArea']) + !!(item['MaxArea'])">Площадь: {{item['MinArea']?'от '+item['MinArea']:item['MinArea']}} {{item['MaxArea']?'по '+item['MaxArea']:item['MaxArea']}} м2</p>
                                <p class="card-text m-0" v-if="!!(item['MinRooms']) + !!(item['MaxRooms'])">Комнаты: {{item['MinRooms']?'от '+item['MinRooms']:item['MinRooms']}} {{item['MaxRooms']?'по '+item['MaxRooms']:item['MaxRooms']}} шт.</p>
                                <p class="card-text m-0" v-if="!!(item['MinFloor']) + !!(item['MaxFloor'])">Этаж(ность): {{item['MinFloor']?'от '+item['MinFloor']:item['MinFloor']}} {{item['MaxFloor']?'по '+item['MaxFloor']:item['MaxFloor']}}</p>
                              </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
</template>
  
<script>
import { useSuppliesStore } from '../store/supplies'
import { useDemandsStore } from '../store/demands'

export default {
    props: ['id','type'],
    emits: ['close'],
    computed: {
        isValidForm() {
            return Number.isInteger(this.Price) & !(!(this.Price)) & !(!(this.RealEstateId)) & !(!(this.AgentId)) & !(!(this.ClientId)) & this.Price>0
        },
        listSupplies(){
            if(this.type == 'client'){return useSuppliesStore().supplies.filter(item => item.ClientId == this.id)}
            else {return useSuppliesStore().supplies.filter(item => item.AgentId == this.id)}
        },
        listDemands(){
            if(this.type == 'client'){return useDemandsStore().demands.filter(item => item.ClientId == this.id)}
            else {return useDemandsStore().demands.filter(item => item.AgentId == this.id)}
        },
    },
    methods: {
        onSubmit() {
            return
        }
    }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>