<template>
    <section class="clients">
        <div class="clients__wrapper p-4">
            <div class="table-title d-flex justify-content-between">
                <h3 class="d-inline-flex">Таблица клиентов</h3>
                <form class="w-50 me-3" role="search">
                    <input v-model="search" type="search" class="form-control" placeholder="Поиск по клиентам" aria-label="Search">
                </form>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить клиента
                </button>
            </div>
            <table class="table table-striped">
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
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.Id" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.FirstName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.MiddleName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.LastName" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.Phone" /></td>
                        <td class="table__item"><input class="table__input form-control" :disabled="this.editId !== client.Id"
                                v-model="client.Email" /></td>
                        <td v-if="client.Id !== editId">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary" @click="editById(client.Id)">
                                    Изменить
                                </button>
                                <button class="btn btn-outline-danger" @click="removeById(client.Id)">Удалить</button>
                            </div>
                        </td>
                        <td v-else>
                            <div class="btn-group">
                                <button class="btn btn-success" @click="saveChanges(client.Id)">Сохранить</button>
                                <button class="btn btn-warning" @click="cancelChanges(client.Id)">Отменить</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateClient v-if="showModal" @close="showModal = false" />
    </section>
</template>

<script>
import { useClientsStore } from '../store/clients'

import ModalCreateClient from "../components/ModalCreateClient.vue";

export default {
    components: {
        ModalCreateClient,
    },
    data() {
        return {
            editId: -1,
            showModal: false,
            search: '',
        }
    },
    computed: {
        // clients() {
        //     return useClientsStore().clients
        // },
        filteredClients() {
            if (this.search !== '') {
                return useClientsStore().clients.filter(client => {
                    const name = `${client.FirstName} ${client.MiddleName} ${client.LastName}`
                    // const searchWords = this.search.split(' ')
                    const searchWords = this.search
                    // return searchWords.every(word => {
                    //     return this.levenshteinDistance(name, word) <= 3
                    // })
                    return this.levenshteinDistance(name, searchWords) <= 3
                })
            }
            return useClientsStore().clients
        }
    },
    methods: {
        removeById(id) {
            useClientsStore().removeClient(id);
        },
        editById(id) {
            this.editId = id;
        },
        saveChanges(id) {
            // const index = this.clients.findIndex(c => c.id === client.id);
            // this.clients.splice(index, 1, updatedClient);
            this.editId = -1;
        },
        cancelChanges(id) {
            this.editId = -1;
            // this.clients = dataClients;
        },
        levenshteinDistance(str1, str2) {
            const track = Array(str2.length + 1).fill(null).map(() =>
                Array(str1.length + 1).fill(null));
            for (let i = 0; i <= str1.length; i += 1) {
                track[0][i] = i;
            }
            for (let j = 0; j <= str2.length; j += 1) {
                track[j][0] = j;
            }
            for (let j = 1; j <= str2.length; j += 1) {
                for (let i = 1; i <= str1.length; i += 1) {
                    const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                    track[j][i] = Math.min(
                        track[j][i - 1] + 1,
                        track[j - 1][i] + 1,
                        track[j - 1][i - 1] + indicator,
                    );
                }
            }
            return track[str2.length][str1.length];
        }
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
}</style>
