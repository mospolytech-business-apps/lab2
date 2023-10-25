<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 v-if="this.type=='client'" class="modal-title fw-bold mb-0 fs-4">Окно клиента #{{this.id}}</h5>
                    <h5 v-if="this.type=='agent'" class="modal-title fw-bold mb-0 fs-4">Окно риэтора #{{this.id}}</h5>
                    <h5 v-if="this.type=='deal'" class="modal-title fw-bold mb-0 fs-4">Окно сделки #{{this.id}}</h5>
                    <button type="button" class="btn btn-close" @click="$emit('close')"></button>
                </div>
                <div v-if="this.type !== 'deal'" class="modal-body">
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
                <div v-else class="modal-body list-group">
                    <div class="list-group-item align-items-center justidy-content-center d-flex gap-3 py-3" v-for="key in Object.keys(this.outputDeal())">
                        <h6 class="mb-0">{{key}}</h6>
                        <p class="mb-0">{{Math.abs(this.outputDeal()[key])}} руб.</p>
                    </div>
                </div>
                </div>
        </div>
    </div>
</template>
  
<script>
import { useSuppliesStore } from '../store/supplies'
import { useDemandsStore } from '../store/demands'
import { useObjectsStore } from '../store/objects'
import { useDealsStore } from '../store/deals';



import calculateCommission from '../calc.js'

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
        },
        outputDeal(){
            let objects = useObjectsStore().objects;
            let supplies = useSuppliesStore().supplies;
            let myDeal = useDealsStore().deals.filter(j => j.Id == this.id)[0];
            let mySupply = supplies.filter(item => item.RealEstateId == myDeal.Supply_Id)[0];
            console.log(mySupply.RealEstateId)
            let x = objects.filter(item => item.Id == mySupply.RealEstateId)[0]
            console.log(x)
            return calculateCommission(
                x.Type
            ,mySupply.Price)
        }
    }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>