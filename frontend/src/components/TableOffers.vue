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
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== supply.Id" v-model="supply.Id" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== supply.Id" v-model="supply.ClientId" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== supply.Id" v-model="supply.AgentId" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== supply.Id" v-model="supply.RealEstateId" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== supply.Id" v-model="supply.Price" /></td>
                        <td v-if="supply.Id !== editId">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary" @click="editById(supply.Id)">
                                    Изменить
                                </button>
                                <button class="btn btn-outline-danger" @click="removeById(supply.Id)">Удалить</button>
                            </div>
                        </td>
                        <td v-else>
                            <div class="btn-group">
                                <button class="btn btn-success" @click="saveChanges(supply.Id)">Обновить</button>
                                <button class="btn btn-warning" @click="cancelChanges(supply.Id)">Отмена</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateOffer v-if="showModal" @close="showModal = false" />
    </section>
</template>

<script>
import { useSuppliesStore } from '../store/supplies';

import ModalCreateOffer from "../components/ModalCreateOffer.vue";

export default {
    components: {
        ModalCreateOffer,
    },
    data() {
        return {
            editId: -1,
            showModal: false,
            search: '',
            id: '',
            filterType: 'all',
        }
    },
    computed: {
        filteredSupplies() {
            let arr = useSuppliesStore().supplies;
            // arr = this.filterByType(arr);
            // if(this.district){
            //     if(districtsData.findIndex(obj => obj.name == this.district)>0){
            //         let district = districtsData[districtsData.findIndex(obj => obj.name == this.district)];
            //         arr = filterInsideArea(district,arr)
            //     }
            // }
            // if (this.search !== '') {
            //     return arr.filter(object => {
            //         const text = `${object.Address_City} ${object.Address_Street}`
            //         const nums = `${object.Address_House} ${object.Address_Number}`
            //         const searchWords = this.search.split(' ')
            //         return (levenshteinDistance(text, searchWords[0] + ' ' + searchWords[1]) <= 3 & levenshteinDistance(nums, searchWords[2] + ' ' + searchWords[3]) <= 1)
            //     })
            // }
            return arr
        }
    },
    methods: {
        removeById(id) {
            useSuppliesStore().removeSupply(id);
        },
        editById(id) {
            this.editId = id;
        },
        saveChanges(id) {
            this.editId = -1;
            let index = this.filteredSupplies.findIndex(obj => obj.Id === id);
            useSuppliesStore().changeSupply(id, this.filteredSupplies[index]);
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


.table__input {
    border: 1px solid black;

    &:disabled {
        border: 1px solid transparent;
        color: black;
        background: none;
    }
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
