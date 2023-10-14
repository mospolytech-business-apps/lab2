<template>
    <section class="clients">
        <div class="clients__wrapper p-4 table-responsive small">
            <div class="table-title d-flex justify-content-between mb-3">
                <h3 class="d-inline-flex">Таблица недвижимости</h3>
                <form class="w-50 me-3" role="search">
                    <input v-model="search" type="search" class="form-control" placeholder="Поиск по объектам недвижимости"
                        aria-label="Search">
                </form>
                <button type="button" @click="showModal = true"
                    class="d-inline-flex align-items-center btn btn-primary px-4 rounded-pill" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Добавить объект
                </button>
            </div>
            <form class="row g-2" onsubmit="return false;">
                <div class="form-floating col-md-6">
                    <select id="filterType" v-model="filterType" class="form-control">
                        <option selected value="all">
                            Все типы
                        </option>
                        <option value="apartment">
                            Квартира
                        </option>
                        <option value="house">
                            Дом
                        </option>
                        <option value="land">
                            Земля
                        </option>
                    </select>  
                    <label for="filterType">Фильтрация по типу недвижимости</label>  
                </div>
                <div class="form-floating col-md-6">
                    <input v-model="district" class="form-control" list="filterDistricts" id="inputDistrict" placeholder="Введите название района">
                    <datalist id="filterDistricts">
                        <option v-for="district in districts" :value="district.name">{{district.name}}</option>
                    </datalist>
                    <label for="inputDistrict">Фильтрация по району</label>  
                </div>
            </form>
            <table class="table table-sm table-striped shadow-sm">
                <thead>
                    <tr>
                        <th scope="col" class="table__item">id</th>
                        <th scope="col" class="table__item">Город</th>
                        <th scope="col" class="table__item col-2">Улица</th>
                        <th scope="col" class="table__item">Дом</th>
                        <th scope="col" class="table__item">Квартира</th>
                        <th scope="col" class="table__item">Широта</th>
                        <th scope="col" class="table__item">Долгота</th>
                        <th scope="col" class="table__item">Площадь</th>
                        <th scope="col" class="table__item">Комнаты</th>
                        <th scope="col" class="table__item">Этаж</th>
                        <th scope="col" class="table__item">Этажи</th>
                        <th scope="col" class="table__item">Действия</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="object in filteredObjects" :key="object.Id" :class="{ 'table-info': object.Id == editId }">
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Id" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Address_City" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Address_Street" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Address_House" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Address_Number" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Coordinate_latitude" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.Coordinate_longitude" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-model="object.TotalArea" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-if="object.Rooms" v-model="object.Rooms" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-if="object.Floor" v-model="object.Floor" /></td>
                        <td class="table__item"><input class="table__input form-control"
                                :disabled="this.editId !== object.Id" v-if="object.TotalFloors"
                                v-model="object.TotalFloors" /></td>
                        <td v-if="object.Id !== editId">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary" @click="editById(object.Id)">
                                    Изменить
                                </button>
                                <button class="btn btn-outline-danger" @click="removeById(object.Id)">Удалить</button>
                            </div>
                        </td>
                        <td v-else>
                            <div class="btn-group">
                                <button class="btn btn-success" @click="saveChanges(object.Id)">Обновить</button>
                                <button class="btn btn-warning" @click="cancelChanges(object.Id)">Отмена</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreateObject v-if="showModal" @close="showModal = false" />
    </section>
</template>

<script>
import { useObjectsStore } from '../store/objects';
import levenshteinDistance from '../levenshtein.js';
import filterInsideArea from '../districtfilter.js';
import districtsData from '../assets/districts.json';

import ModalCreateObject from "../components/ModalCreateObject.vue";

export default {
    components: {
        ModalCreateObject,
    },
    data() {
        return {
            editId: -1,
            showModal: false,
            search: '',
            id: '',
            filterType: 'all',
            districts: districtsData,
            district: '',
        }
    },
    computed: {
        filteredObjects() {
            let arr = useObjectsStore().objects;
            arr = this.filterByType(arr);
            if(this.district){
                if(districtsData.findIndex(obj => obj.name == this.district)>0){
                    let district = districtsData[districtsData.findIndex(obj => obj.name == this.district)];
                    arr = filterInsideArea(district,arr)
                }
            }
            if (this.search !== '') {
                return arr.filter(object => {
                    const text = `${object.Address_City} ${object.Address_Street}`
                    const nums = `${object.Address_House} ${object.Address_Number}`
                    const searchWords = this.search.split(' ')
                    return (levenshteinDistance(text, searchWords[0] + ' ' + searchWords[1]) <= 3 & levenshteinDistance(nums, searchWords[2] + ' ' + searchWords[3]) <= 1)
                })
            }
            return arr
        }
    },
    methods: {
        removeById(id) {
            useObjectsStore().removeObject(id);
        },
        editById(id) {
            this.editId = id;
        },
        saveChanges(id) {
            this.editId = -1;
            let index = this.filteredObjects.findIndex(obj => obj.Id === id);
            useObjectsStore().changeObject(id, this.filteredObjects[index]);
        },
        cancelChanges(id) {
            this.editId = -1;
            useObjectsStore().fetchObjects()
        },
        filterByType(arr) {
            if (this.filterType === 'apartment') {
                console.log(123)
                return arr.filter(item => item.Rooms || item.Floor)
            } else if (this.filterType === 'house') {
                return arr.filter(item => item.TotalFloors && !item.Rooms && !item.Floor)
            } else if (this.filterType === 'land') {
                return arr.filter(item => !item.Rooms && !item.Floor && !item.TotalFloors)
            } else {
                return arr
            }
        }
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
