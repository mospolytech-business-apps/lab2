<template>
    <section class="clients">
        <div class="clients__wrapper p-4">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица клиентов</h3>
                <form class="w-50 me-3" role="search">
                    <input v-model="search" type="search" class="form-control" placeholder="Поиск по клиентам"
                        aria-label="Search">
                </form>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить клиента
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
                        <input id="Phone" v-model="content.Phone" type="phone" class="form-control rounded-3">
                        <label for="Phone">Телефон</label>
                    </div>
                    <div class="form-floating col-md-4">
                        <input id="Email" v-model="content.Email" type="email" class="form-control rounded-3">
                        <label for="Email">Email</label>
                    </div>
                    <div class="form-floating col-md-4 align-self-end d-flex justify-content-end">
                        <button @click="cancelChanges" class="w-40 mx-2 btn btn-secondary rounded-pill">
                            Отменить изменения
                        </button>
                        <button class="w-40 mx-2 btn btn-primary rounded-pill" @click="saveChanges(editId)"
                            :disabled="!isValidForm">Сохранить изменения
                        </button>
                    </div>
                </div>
            </form>
            <table class="table table-striped shadow-sm">
                <thead>
                    <tr>
                        <th scope="col" class="table__item">id</th>
                        <th scope="col" class="table__item">Фамилия</th>
                        <th scope="col" class="table__item">Имя</th>
                        <th scope="col" class="table__item">Отчество</th>
                        <th scope="col" class="table__item">Телефон</th>
                        <th scope="col" class="table__item">email</th>
                        <th scope="col" class="table__item">Действия</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="client in filteredClients" :key="client.Id" :class="{ 'table-info': client.Id == editId }">
                        <td class="table__item">
                            <p class="table__input">{{ client.Id }}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input">{{ client.FirstName }}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input">{{ client.MiddleName }}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input">{{ client.LastName }}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input">{{ client.Phone }}</p>
                        </td>
                        <td class="table__item">
                            <p class="table__input">{{ client.Email }}</p>
                        </td>
                        <td>
                            <div class="btn-group row " >
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-outline-dark" @click="openModal = client.Id">
                                    <i class="bi-box-arrow-up-right"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="mx-2 rounded-circle p-2 lh-1 btn btn-outline-primary" @click="editById(client.Id, client)">
                                    <i class="bi-pencil-square"></i>
                                </button>
                                <button style="width:38px; height: 38px;" class="rounded-circle p-2 lh-1 btn btn-danger"
                                    @click="deleteModal = client.Id"
                                    :disabled="checkId(client.Id, this.supplies) || checkId(client.Id, this.demands)">
                                    <i class="bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateClient v-if="showModal" @close="showModal = false" />
        <ModalOpen v-if="openModal > -1" :id="openModal" @close="openModal = -1" type="client" />
        <ModalProofDelete v-if="deleteModal > -1" @close="deleteModal = -1" @proof="removeById(deleteModal)">выбранного
            клиента #<b>{{ deleteModal }}</b>?</ModalProofDelete>
    </section>
</template>

<script>
import { useClientsStore } from '../store/clients';
import { useDemandsStore } from '../store/demands';
import { useSuppliesStore } from '../store/supplies';
import levenshteinDistance from '../levenshtein.js'

import ModalCreateClient from "../components/ModalCreateClient.vue";
import ModalOpen from './ModalOpen.vue';
import ModalProofDelete from './ModalProofDelete.vue';

export default {
    components: {
        ModalCreateClient,
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
                Phone: '',
                Email: '',
                Id: 0
            }
        }
    },
    computed: {
        isValidForm() {
            return !(!(this.content.Phone || this.content.Email))
        },
        filteredClients() {
            if (this.search !== '') {
                return useClientsStore().clients.filter(client => {
                    const name = `${client.FirstName} ${client.MiddleName} ${client.LastName}`
                    const searchWords = this.search
                    return levenshteinDistance(name, searchWords) <= 3
                })
            }
            return useClientsStore().clients
        }
    },
    methods: {
        removeById(id) {
            useClientsStore().removeClient(id);
        },
        editById(id, obj) {
            this.editId = id;
            this.content.FirstName = obj.FirstName;
            this.content.LastName = obj.LastName;
            this.content.MiddleName = obj.MiddleName;
            this.content.Phone = obj.Phone;
            this.content.Email = obj.Email;
            this.content.Id = obj.Id;
        },
        saveChanges(id) {
            this.editId = -1;
            useClientsStore().changeClient(id, this.content)
            console.log(id, this.content)
        },
        cancelChanges() {
            this.editId = -1;
            this.content = {}
        },
        checkId(id, array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].ClientId === id) {
                    return true;
                }
            }
            return false;
        },
    },
}
</script>

<style lang="scss" scoped>
.clients__wrapper {
    padding: 0 40px;
    max-width: 1400px;
    margin: 0 auto;
}

.table__item {
    font-size: 18px;

}
.btn:disabled:hover {
    opacity: 0.5;
}
.table__input {
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
