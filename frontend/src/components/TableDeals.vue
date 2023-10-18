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
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== deal.Id" v-model="deal.Id" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== deal.Id" v-model="deal.Demand_Id" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== deal.Id" v-model="deal.Supply_Id" /></td>
                        <td v-if="deal.Id !== editId">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary" @click="editById(deal.Id)">
                                    Изменить
                                </button>
                                <button class="btn btn-outline-danger" @click="removeById(deal.Id)">Удалить</button>
                            </div>
                        </td>
                        <td v-else>
                            <div class="btn-group">
                                <button class="btn btn-success" @click="saveChanges(deal.Id)">Обновить</button>
                                <button class="btn btn-warning" @click="cancelChanges(deal.Id)">Отмена</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateDeal v-if="showModal" @close="showModal = false" />
    </section>
</template>

<script>
import { useDealsStore } from '../store/deals';

import ModalCreateDeal from './ModalCreateDeal.vue';

export default {
    components: {
    ModalCreateDeal
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
        filteredDeals() {
            let arr = useDealsStore().deals;
            return arr
        }
    },
    methods: {
        removeById(id) {
            useDealsStore().removeDeal(id);
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
