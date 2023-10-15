<template>
    <section class="clients">
        <div class="clients__wrapper p-4 table-responsive small">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица потребностей</h3>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить потребность
                </button>
            </div>
            <div class="table__wrapper">
                <table class="table table-striped shadow-sm">
                    <thead>
                        <tr>
                            <th scope="col" class="table__item">id</th>
                            <th scope="col" class="table__item">Клиент</th>
                            <th scope="col" class="table__item">Риэлтор</th>
                            <th scope="col" class="table__item">Тип</th>
                            <th scope="col" class="table__item">Город</th>
                            <th scope="col" class="table__item">Улица</th>
                            <th scope="col" class="table__item">Дом</th>
                            <th scope="col" class="table__item">Квартира</th>
                            <th scope="col" class="table__item">Мин. цена</th>
                            <th scope="col" class="table__item">Макс. цена</th>
                            <th scope="col" class="table__item">Мин. площадь</th>
                            <th scope="col" class="table__item">Макс. площадь</th>
                            <th scope="col" class="table__item">Мин. комнат</th>
                            <th scope="col" class="table__item">Макс. комнат</th>
                            <th scope="col" class="table__item">Мин. этаж</th>
                            <th scope="col" class="table__item">Макс. этаж</th>
                            <th scope="col" class="table__item">Действия</th>
                        </tr>
                    </thead>
                    <tbody class="table-hover">
                        <tr v-for="demand in filteredDemands" :key="demand.Id" :class="{ 'table-info': demand.Id == editId }">
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Id" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.ClientId" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.AgentId" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Type" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Address_City" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Address_Street" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Address_House" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.Address_Number" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MinPrice" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MaxPrice" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MinArea" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MaxArea" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MinRooms" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MaxRooms" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MinFloor" /></td>
                            <td class="table__item"><input class="table__input form-control"
                                    :disabled="this.editId !== demand.Id" v-model="demand.MaxFloor" /></td>
                            <td v-if="demand.Id !== editId">
                                <div class="btn-group">
                                    <button class="btn btn-outline-primary" @click="editById(demand.Id)">
                                        Изменить
                                    </button>
                                    <button class="btn btn-outline-danger" @click="removeById(demand.Id)">Удалить</button>
                                </div>
                            </td>
                            <td v-else>
                                <div class="btn-group">
                                    <button class="btn btn-success" @click="saveChanges(demand.Id)">Обновить</button>
                                    <button class="btn btn-warning" @click="cancelChanges(demand.Id)">Отмена</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalCreateNeed v-if="showModal" @close="showModal = false" />
    </section>
</template>

<script>
import { useDemandsStore } from '../store/demands';

import ModalCreateNeed from "../components/ModalCreateNeed.vue";

export default {
    components: {
        ModalCreateNeed,
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
        filteredDemands() {
            let arr = useDemandsStore().demands;
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
            useDemandsStore().removeDemand(id);
        },
        editById(id) {
            this.editId = id;
        },
        saveChanges(id) {
            this.editId = -1;
            let index = this.filteredDemands.findIndex(obj => obj.Id === id);
            useDemandsStore().changeSupply(id, this.filteredDemands[index]);
        },
        cancelChanges(id) {
            this.editId = -1;
            useDemandsStore().fetchDemands()
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

.table__wrapper {
    width: 100%;
    overflow: scroll;
}
.table {
    width: 2400px;
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
