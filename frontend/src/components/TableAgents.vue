<template>
    <section class="agents">
        <div class="agents__wrapper p-4">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица агентов</h3>
                <form class="w-50 me-3" role="search">
                    <input v-model="search" type="search" class="form-control" placeholder="Поиск по агентам" aria-label="Search">
                </form>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить агента
                </button>
            </div>
            <table class="table table-striped shadow-sm">
                <thead>
                    <tr>
                        <th scope="col" class="table__item">id</th>
                        <th scope="col" class="table__item">Имя</th>
                        <th scope="col" class="table__item">Фамилия</th>
                        <th scope="col" class="table__item">Отчество</th>
                        <th scope="col" class="table__item">Доля от комиссии</th>
                        <th scope="col" class="table__item">Действия</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="agent in filteredAgents" :key="agent.Id" :class="{'table-info': agent.Id==editId}">
                        <th scope="row" class="table__item"><input class="table__input form-control" :disabled="this.editId!==agent.Id" v-model="agent.Id" /></th>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId!==agent.Id" v-model="agent.FirstName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId!==agent.Id" v-model="agent.MiddleName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId!==agent.Id" v-model="agent.LastName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId!==agent.Id" v-model="agent.DealShare"/></td>
                        <td v-if="agent.Id!==editId">
                            <div class="btn-group">
                                <button class="btn btn-outline-dark" @click="openModal = agent.Id">
                                    Открыть
                                </button>
                                <button class="btn btn-outline-primary" @click="editById(agent.Id)">
                                    Изменить
                                </button>
                                <button class="btn btn-outline-danger" @click="deleteModal=agent.Id" :disabled="checkId(agent.Id,this.supplies) || checkId(agent.Id,this.demands)">Удалить</button>
                            </div>
                        </td>
                        <td v-else>
                            <div class="btn-group">
                                <button class="btn btn-success" @click="saveChanges(agent.Id)">Сохранить</button>
                                <button class="btn btn-warning" @click="cancelChanges(agent.Id)">Отменить</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateAgent v-if="showModal" @close="showModal = false"/>
        <ModalOpen v-if="openModal>-1" :id="openModal" @close="openModal = -1" type="agent" />
        <ModalProofDelete v-if="deleteModal>-1" @close="deleteModal = -1" @proof="removeById(deleteModal)">выбранного риэлтора #<b>{{deleteModal}}</b>?</ModalProofDelete>
    </section>
</template>

<script>
import { useAgentsStore } from '../store/agents'
import levenshteinDistance from '../levenshtein.js'
import { useDemandsStore } from '../store/demands';
import { useSuppliesStore } from '../store/supplies';

import ModalCreateAgent from "../components/ModalCreateAgent.vue";
import ModalOpen from "../components/ModalOpen.vue";
import ModalProofDelete from './ModalProofDelete.vue';

export default {
    components: {
    ModalCreateAgent,
    ModalOpen,
    ModalProofDelete
},
    data() {
        return {
            editId: -1,
            showModal: false,
            openModal: -1,
            deleteModal: -1,
            search: '',
            demands: useDemandsStore().demands,
            supplies: useSuppliesStore().supplies,
        }
    },
    computed: {
        filteredAgents() {
            if (this.search !== '') {
                return useAgentsStore().agents.filter(agent => {
                    const name = `${agent.FirstName} ${agent.MiddleName} ${agent.LastName}`
                    // const searchWords = this.search.split(' ')
                    const searchWords = this.search
                    // return searchWords.every(word => {
                    //     return this.levenshteinDistance(name, word) <= 3
                    // })
                    return levenshteinDistance(name, searchWords) <= 3
                })
            }
            return useAgentsStore().agents
        }
    },
    methods: {
        removeById(id) {
            useAgentsStore().removeAgent(id);
        },
        editById(id) {
            this.editId = id;
        },
        saveChanges(id) {
            // const index = this.agents.findIndex(c => c.id === agent.id);
            // this.agents.splice(index, 1, updatedagent);
            this.editId = -1;
        },
        cancelChanges(id) {
            this.editId = -1;
            this.agents = dataAgents;
        },
        checkId(id, array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].AgentId === id) {
                    return true;
                }
            }
            return false;
        },
    },
}
</script>

<style lang="scss" scoped>
.agents__wrapper {
    padding: 0 40px;
    max-width: 1400px;
    margin: 0 auto;
}
.table__item {
    font-size: 18px;

}
.table__input {
    font-size: 18px;
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
