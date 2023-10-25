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
            <form v-if="editId > -1" @submit.prevent="onSubmit">
                <div class="modal-body row g-2">
                    <div class="form-floating col-md-4">
                        <input v-model="content.MiddleName" class="form-control rounded-3" id="MiddleName">
                        <label for="MiddleName">Фамилия</label>
                    </div>
                    <div class="form-floating col-md-4">
                        <input v-model="content.FirstName" id="FirstName" class="form-control rounded-3">
                        <label for="FirstName">Имя</label>
                    </div>
                    <div class="form-floating col-md-4">
                        <input id="LastName" v-model="content.LastName" class="form-control rounded-3">
                        <label for="LastName">Отчество</label>
                    </div>
                    <div class="form-floating col-md-4">
                        <input id="Phone" v-model="content.DealShare" type="number" class="form-control rounded-3">
                        <label for="Phone">Доля от комиссии</label>
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
                        <th scope="col" class="table__item">Имя</th>
                        <th scope="col" class="table__item">Фамилия</th>
                        <th scope="col" class="table__item">Отчество</th>
                        <th scope="col" class="table__item">Доля от комиссии</th>
                        <th scope="col" class="table__item">Действия</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="agent in filteredAgents" :key="agent.Id" :class="{'table-info': agent.Id==editId}">
                        <th scope="row" class="table__item">
                            <p class="table__input" :disabled="this.editId!==agent.Id">{{agent.Id}}</p>
                        </th>
                        <td class="table__item">
                            <p class="table__input" :disabled="this.editId!==agent.Id">{{agent.FirstName}}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input" :disabled="this.editId!==agent.Id">{{agent.MiddleName}}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input" :disabled="this.editId!==agent.Id">{{agent.LastName}}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input" :disabled="this.editId!==agent.Id">{{agent.DealShare}}</p>
                        </td>
                        <td class="table__item px-3">
                            <div class="btn-group row " >
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-outline-dark" @click="openModal = agent.Id">
                                    <i class="bi-box-arrow-up-right"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="mx-2 rounded-circle p-2 lh-1 btn btn-outline-primary" @click="editById(agent.Id, agent)">
                                    <i class="bi-pencil-square"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-danger"
                                    @click="deleteModal = agent.Id"
                                    :disabled="checkId(agent.Id, this.supplies) || checkId(agent.Id, this.demands)">
                                    <i class="bi-trash"></i>
                                </button>
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
            content: {
                FirstName: '',
                LastName: '',
                MiddleName: '',
                DealShare: '',
                Id: 0
            }
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
        },
        isValidForm() {
            return !(!(this.content.FirstName))  & !(!(this.content.LastName)) & !(!(this.content.MiddleName))
        },
    },
    methods: {
        removeById(id) {
            useAgentsStore().removeAgent(id);
        },
        editById(id, obj) {
            this.editId = id;
            this.content.FirstName = obj.FirstName;
            this.content.LastName = obj.LastName;
            this.content.MiddleName = obj.MiddleName;
            this.content.DealShare = obj.DealShare;
            this.content.Id = obj.Id;
        },
        saveChanges(id) {
            this.editId = -1;
            useAgentsStore().changeAgent(id, this.content)
            console.log(id, this.content)
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
