<template>
    <section class="clients">
        <div class="clients__wrapper p-4 table-responsive small">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица предложений</h3>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить сделку
                </button>
            </div>
            <form v-if="editId > -1" @submit.prevent="onSubmit">
                <div class="modal-body row g-2">
                    <div class="form-floating mb-3">
                        <select id="demand" v-model="content.Demand_Id" class="form-select" aria-label="Потребность">
                            <option v-for="demand in demands" :key="demand.Id" :value="demand.Id">{{outputDemand(demand)}}</option>
                        </select>
                        <label for="demand" class="required">Потребность</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select id="supply" v-model="content.Supply_Id" class="form-select" aria-label="Предложение">
                            <option v-for="supply in supplies" :key="supply.Id" :value="supply.Id">Предложение #{{outputSupply(supply)}}</option>
                        </select>
                        <label for="supply" class="required">Предложение</label>
                    </div>
                    <div class="form-floating col-md-4 align-self-end d-flex justify-content-end">
                        <button @click="cancelChanges" class="w-40 mx-2 btn btn-secondary rounded-pill">
                            Отменить изменения
                        </button>
                        <button class="w-40 mx-2 btn btn-primary rounded-pill" @click="saveChanges(editId)"
                            :disabled="!isValidForm">Сохранить изменения</button>
                    </div>
                </div>
            </form>
            <table class="table table-striped shadow-sm">
                <thead>
                    <tr>
                        <th scope="col" class="table__item">id</th>
                        <th scope="col" class="table__item">Потребность</th>
                        <th scope="col" class="table__item">Предложение</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="deal in filteredDeals" :key="deal.Id" :class="{ 'table-info': deal.Id == editId }">
                        <td class="table__item">
                            <p class="table__input">{{deal.Id}}</p>
                            </td>
                        <td class="table__item">
                            <p class="table__input">{{deal.Demand_Id}}</p>
                            </td>
                        <td class="table__item">
                            <p class="table__input">{{deal.Supply_Id}}</p>
                            </td>
                        <td>
                            <div class="btn-group row " >
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-outline-dark" @click="openModal = deal.Id">
                                    <i class="bi-box-arrow-up-right"></i>
                                </button>
                                <button :disabled="editId>-1" style="width:38px; height: 38px;" class="mx-2 rounded-circle p-2 lh-1 btn btn-outline-primary" @click="editById(deal.Id, deal)">
                                    <i class="bi-pencil-square"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-danger"
                                    @click="deleteModal = deal.Id">
                                    <i class="bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalOpen v-if="openModal > -1" :id="openModal" @close="openModal = -1" type="deal" />
        <ModalCreateDeal v-if="showModal" @close="showModal = false" />
        <ModalProofDelete v-if="deleteModal>-1" @close="deleteModal = -1" @proof="removeById(deleteModal)">выбранный объект #<b>{{deleteModal}}</b>?</ModalProofDelete>
    </section>
</template>

<script>
import { useDealsStore } from '../store/deals';
import { useSuppliesStore } from '../store/supplies';
import { useDemandsStore } from '../store/demands';
import ModalCreateDeal from './ModalCreateDeal.vue';
import ModalProofDelete from './ModalProofDelete.vue';
import ModalOpen from './ModalOpen.vue';

export default {
    components: {
    ModalCreateDeal,
    ModalProofDelete,
    ModalOpen
},
    data() {
        return {
            editId: -1,
            showModal: false,
            openModal: -1,
            deleteModal: -1,
            search: '',
            id: '',
            filterType: 'all',
            supplies: useSuppliesStore().supplies,
            demands: useDemandsStore().demands,
            content: {
                Supply_Id: '',
                Demand_Id: '',
            }
        }
    },
    computed: {
        filteredDeals() {
            let arr = useDealsStore().deals;
            return arr
        },
        isValidForm() {
            return !(!(this.content.Supply_Id))  & !(!(this.content.Demand_Id))
        },
    },
    methods: {
        removeById(id) {
            useDealsStore().removeDeal(id);
        },
        editById(id, obj) {
            this.editId = id;
            this.content.Supply_Id = obj.Supply_Id;
            this.content.Demand_Id = obj.Demand_Id;
        },
        saveChanges(id) {
            this.editId = -1;
            useDealsStore().changeDeal(id, this.content)
            console.log(id, this.content)
        },
        cancelChanges() {
            this.editId = -1;
        },
        outputSupply(supply){
        return String(supply.Id)+' | Цена '+String(supply.Price)+' руб.'
    },
    outputDemand(supply){
        return 'Потребность #'+supply.Id+' | Клиент '+supply['ClientId']+' | Риэлтор #'+supply['AgentId']
    },
    },
}
</script>

<style lang="scss" scoped>
.clients__wrapper {
    padding: 0 20px;
    max-width: 1440px;
    margin: 0 auto;
}


.table__button {
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    padding: 10px 12px;
    width: 124px;
    text-align: center;
    margin-right: 2px;
    background-color: rgb(169, 169, 169);
}
</style>
