<template>
    <section class="clients">
        <div class="clients__wrapper p-4 table-responsive small">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица предложений</h3>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить предложение
                </button>
            </div>
            <form v-if="editId > -1" @submit.prevent="onSubmit">
                <div class="modal-body row d-flex g-2">
                    <div class="form-floating mb-3 col-md-4">
                        <select id="demand" v-model="content.ClientId" class="form-select" aria-label="Клиент">
                            <option v-for="client in clients" :key="client.Id" :value="client.Id">{{client.Id}} {{client.FirstName}} {{client.MiddleName}} {{client.LastName}}</option>
                        </select>
                        <label for="demand" class="required">Клиент</label>
                    </div>
                    <div class="form-floating mb-3 col-md-4">
                        <select id="type" v-model="content.AgentId" class="form-select" aria-label="Объект недвижимости">
                            <option v-for="agent in agents" :key="agent.Id" :value="agent.Id">{{agent.Id}} {{agent.FirstName}} {{agent.MiddleName}} {{agent.LastName}} (доля комиссии {{agent.DealShare}})</option>
                        </select>
                        <label for="type" class="required">Риэлтор</label>
                    </div>
                    <div class="form-floating mb-3 col-md-4">
                        <select id="type" v-model="content.RealEstateId" class="form-select" aria-label="Объект недвижимости">
                            <option v-for="object in objects" :key="object.Id" :value="object.Id">{{object.Id}} {{object.Address_City}} {{object.Address_Street}} дом {{object.Address_House}} кв. {{object.Address_Number}} площадь {{object.TotalArea}}</option>
                        </select>
                        <label for="type" class="required">Объект недвижимости</label>
                    </div>
                    <div class="form-floating mb-3 col-md-4">
                        <input required id="Address_Number" v-model="content.Price" type="number" class="form-control rounded-3">
                        <label for="Address_Number" class="required">Цена</label>
                        <small id="Address_Number" class="form-text text-muted">Цена должна быть целым положительным числом</small>
                    </div>
                    <div class="mb-4 form-floating col-md-4 align-self-end d-flex justify-content-end">
                        <button @click="cancelChanges" class="w-30 mx-2 btn btn-secondary rounded-pill">
                            Отменить изменения
                        </button>
                        <button class="w-30 mx-2 btn btn-primary rounded-pill" @click="saveChanges(editId)"
                            :disabled="!isValidForm">Сохранить изменения</button>
                    </div>
                </div>
            </form>
            <table class="table table-striped shadow-sm">
                <thead>
                    <tr>
                        <th scope="col" class="table__item">id</th>
                        <th scope="col" class="table__item">Клиент</th>
                        <th scope="col" class="table__item col-2">Риэлтор</th>
                        <th scope="col" class="table__item">Объект</th>
                        <th scope="col" class="table__item">Цена</th>
                        <th scope="col" class="table__item">Действия</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="supply in filteredSupplies" :key="supply.Id" :class="{ 'table-info': supply.Id == editId }">
                        <td class="table__item"><p class="table__input"
                            :disabled="this.editId !== supply.Id" >{{supply.Id}}</p></td>
                            <td class="table__item"><p class="table__input"
                                :disabled="this.editId !== supply.Id" >{{supply.ClientId}}</p></td>
                                <td class="table__item"><p class="table__input"
                                    :disabled="this.editId !== supply.Id" >{{supply.AgentId}}</p></td>
                                <td class="table__item"><p class="table__input"
                                    :disabled="this.editId !== supply.Id" >{{supply.RealEstateId}}</p></td>
                                <td class="table__item"><p class="table__input"
                                    :disabled="this.editId !== supply.Id" >{{supply.Price}}</p></td>
                        <td>
                            <div class="btn-group row " >
                                <button style="width:38px; height: 38px;" class="mx-2 rounded-circle p-2 lh-1 btn btn-outline-primary" @click="editById(supply.Id, supply)">
                                    <i class="bi-pencil-square"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-danger"
                                    @click="deleteModal = supply.Id">
                                    <i class="bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateOffer v-if="showModal" @close="showModal = false" />
        <ModalProofDelete v-if="deleteModal>-1" @close="deleteModal = -1" @proof="removeById(deleteModal)">выбранное предложение #<b>{{deleteModal}}</b>?</ModalProofDelete>
    </section>
</template>

<script>
import { useSuppliesStore } from '../store/supplies';
import { useObjectsStore } from '../store/objects';
import { useClientsStore } from '../store/clients';
import { useAgentsStore } from '../store/agents';
import ModalCreateOffer from "../components/ModalCreateOffer.vue";
import ModalProofDelete from './ModalProofDelete.vue';

export default {
    components: {
    ModalCreateOffer,
    ModalProofDelete
},
    data() {
        return {
            editId: -1,
            showModal: false,
            deleteModal: -1,
            search: '',
            id: '',
            filterType: 'all',
            objects: useObjectsStore().objects,
            clients: useClientsStore().clients,
            agents: useAgentsStore().agents,
            content: {
                AgentId: '',
                ClientId: '',
                RealEstateId: '',
                Price: '',
            }
        }
    },
    computed: {
        filteredSupplies() {
            let arr = useSuppliesStore().supplies;
            return arr
        },
        isValidForm() {
            return Number.isInteger(this.content.Price) & !(!(this.content.Price)) & !(!(this.content.RealEstateId)) & !(!(this.content.AgentId)) & !(!(this.content.ClientId)) & this.content.Price>0
        },
    },
    methods: {
        removeById(id) {
            useSuppliesStore().removeSupply(id);
        },
        editById(id, obj) {
            this.editId = id;
            this.content.AgentId = obj.AgentId;
            this.content.ClientId = obj.ClientId;
            this.content.RealEstateId = obj.RealEstateId;
            this.content.Price = obj.Price;
            this.content.Id = obj.Id;
        },
        saveChanges(id) {
            this.editId = -1;
            useSuppliesStore().changeSupply(id, this.content)
            console.log(id, this.content)
        },
        cancelChanges(id) {
            this.editId = -1;
            useSuppliesStore().fetchSupplies()
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
