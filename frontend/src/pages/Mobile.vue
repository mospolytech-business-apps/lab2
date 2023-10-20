<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center h-100">
                <div class="col">
                    <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
                        <div class="card-body py-4 px-4 px-md-5">
                            <div class="pb-2">
                                <div class="card">
                                    <div class="card-body">
                                        <form ref="createEvent" v-if="editId==-1" class="d-flex flex-row justify-content-between flex-wrap">
                                            <div for="date" data-mdb-toggle="datepicker"
                                                class="md-form md-outline input-with-post-icon datepicker mw-50 w-100">
                                                <label for="date" class="form-text text-muted">Комментарий задачи</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                                    v-model="comment" placeholder="Новая задача">
                                            </div>
                                            <!-- <div class="md-form md-outline">
                                                <label for="type" class="form-text text-muted">Риэлтор</label>
                                                <select id="type" v-model="agent_id" class="form-select"
                                                    aria-label="Объект недвижимости">
                                                    <option v-for="agent in agents" :key="agent.Id" :value="agent.Id">
                                                        {{ agent.Id }} {{ agent.FirstName }} {{ agent.MiddleName }}
                                                        {{ agent.LastName }} (доля комиссии {{ agent.DealShare }})</option>
                                                </select>
                                            </div> -->
                                            <div for="date" data-mdb-toggle="datepicker"
                                                class="md-form md-outline input-with-post-icon datepicker">
                                                <label for="date" class="form-text text-muted">Дата задачи</label>
                                                <input v-model="datetime" class="form-control" id="date"
                                                    type="datetime-local">
                                            </div>
                                            <div class="md-form md-outline ">
                                                <div class="row">
                                                    <label for="time" class="form-text text-muted">Длительность (час, мин,
                                                        сек)</label>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <input v-model="hours" type="number" class="form-control" id="hours"
                                                            placeholder="Часы" min="0" max="23">
                                                    </div>
                                                    <div class="col-4">
                                                        <input v-model="minutes" type="number" class="form-control" id="minutes"
                                                            placeholder="Минуты" min="0" max="59">
                                                    </div>
                                                    <div class="col-4">
                                                        <input v-model="seconds" type="number" class="form-control" id="seconds"
                                                            placeholder="Секунды" min="0" max="59">
                                                    </div>
                                                </div>
                                            </div>
                                            <div for="type"
                                                class="md-form md-outline input-with-post-icon datepicker">
                                                <label for="type" class="form-text text-muted">Тип задачи</label>
                                                <select id="type" v-model="type" class="form-select"
                                                    aria-label="Тип задачи">
                                                    <option value="meeting" selected>Встреча с клиентом</option>
                                                    <option value="presentation">Показ</option>
                                                    <option value="call">Запланированный звонок</option>
                                                </select>
                                            </div>
                                            <div class="md-form align-self-end m-2 mb-0">
                                                <button @click="onSubmit" :disabled="!isValidForm" type="button" class="btn btn-primary">Добавить</button>
                                            </div>
                                        </form>
                                        <form ref="updateEvent" v-else class="d-flex flex-row justify-content-between flex-wrap">
                                            <div for="date" data-mdb-toggle="datepicker"
                                                class="md-form md-outline input-with-post-icon datepicker mw-50 w-100">
                                                <label for="date" class="form-text text-muted">Комментарий задачи</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                                    v-model="comment" placeholder="Текст задачи">
                                            </div>
                                            <div for="date" data-mdb-toggle="datepicker"
                                                class="md-form md-outline input-with-post-icon datepicker">
                                                <label for="date" class="form-text text-muted">Дата задачи</label>
                                                <input v-model="datetime" class="form-control" id="date"
                                                    type="datetime-local">
                                            </div>
                                            <div class="md-form md-outline ">
                                                <div class="row">
                                                    <label for="time" class="form-text text-muted">Длительность (час, мин,
                                                        сек)</label>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <input v-model="hours" type="number" class="form-control" id="hours"
                                                            placeholder="Часы" min="0" max="23">
                                                    </div>
                                                    <div class="col-4">
                                                        <input v-model="minutes" type="number" class="form-control" id="minutes"
                                                            placeholder="Минуты" min="0" max="59">
                                                    </div>
                                                    <div class="col-4">
                                                        <input v-model="seconds" type="number" class="form-control" id="seconds"
                                                            placeholder="Секунды" min="0" max="59">
                                                    </div>
                                                </div>
                                            </div>
                                            <div for="type"
                                                class="md-form md-outline input-with-post-icon datepicker">
                                                <label for="type" class="form-text text-muted">Тип задачи</label>
                                                <select id="type" v-model="type" class="form-select"
                                                    aria-label="Тип задачи">
                                                    <option value="meeting" selected>Встреча с клиентом</option>
                                                    <option value="presentation">Показ</option>
                                                    <option value="call">Запланированный звонок</option>
                                                </select>
                                            </div>
                                            <div class="md-form align-self-end m-2 mb-0">
                                                <button @click="cancelChanges" type="button" class="btn btn-danger">Отменить</button>
                                                <button @click="saveChanges(editId)" :disabled="!isValidForm" type="button" class="btn btn-success">Сохранить</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <h3 class="text">События на сегодня<br></h3>
                            <h4 v-if="filteredMobile.length==0" class="d-inline-flex text-success">Пусто, сегодня Вы отдыхаете!</h4>
                            <div v-else class="table__wrapper">
                                <table class="table mb-0 overflow-scroll">
                                    <thead>
                                        <tr>
                                            <!-- <th scope="col">Риэлтор</th> -->
                                            <th scope="col">Дата и время</th>
                                            <th scope="col">Задача</th>
                                            <th scope="col">Длительность</th>
                                            <th scope="col">Тип</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="fw-normal" v-for="item in filteredMobile" :key="item.uuid">
                                            <!-- <th>
                                                {{ item.agent_id }}
                                            </th> -->
                                            <th>
                                                <span class="ms-2">{{ this.upDate(item.datetime) }}</span>
                                            </th>
                                            <td class="align-middle">
                                                <span>{{ item.comment }}</span>
                                            </td>
                                            <td class="align-middle">
                                                <span>{{ formatDuration(item.duration) }}</span>
                                            </td>
                                            <td class="align-middle">
                                                <h6 class="mb-0"><span class="badge bg-danger">{{ item.type }}</span></h6>
                                            </td>
                                            <td class="align-middle d-flex flex-wrap align-items-center">
                                                <button @click="editById(item.uuid, item)"
                                                    class="btn btn-info btn-sm m-1">Изменить</button>
                                                <button @click="removeById(item.uuid)"
                                                    class="btn btn-danger btn-sm d-flex align-items-center m-1">Отменить
                                                    <svg height="20" viewBox="0 0 24 24" width="20" class="ml-2" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M17.5 12C20.5376 12 23 14.4624 23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 14.4624 14.4624 12 17.5 12ZM15.0238 15.0241C14.8285 15.2194 14.8285 15.536 15.0238 15.7312L16.793 17.501L15.0264 19.2675C14.8311 19.4628 14.8311 19.7793 15.0264 19.9746C15.2217 20.1699 15.5382 20.1699 15.7335 19.9746L17.5 18.208L19.2694 19.9768C19.4647 20.1721 19.7812 20.1721 19.9765 19.9768C20.1718 19.7816 20.1718 19.465 19.9765 19.2697L18.208 17.501L19.9793 15.7313C20.1745 15.536 20.1745 15.2194 19.9793 15.0242C19.784 14.8289 19.4674 14.8289 19.2722 15.0242L17.501 16.794L15.7309 15.0241C15.5356 14.8289 15.2191 14.8289 15.0238 15.0241ZM21 8.5L21.0012 12.0226C19.9907 11.3753 18.7892 11 17.5 11C13.9101 11 11 13.9101 11 17.5C11 18.7892 11.3753 19.9907 12.0226 21.0012L6.25 21C4.45507 21 3 19.5449 3 17.75V8.5H21ZM17.75 3C19.5449 3 21 4.45507 21 6.25V7H3V6.25C3 4.45507 4.45507 3 6.25 3H17.75Z"/></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { useMobileStore } from '../store/mobile';
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            editId: -1,
            comment: '',
            type: '',
            agent_id: -1,
            datetime: '',
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    computed: {
        isValidForm() {
        // return true;
        return (this.datetime!=="") & (this.type!=="");
    },
        filteredMobile() {
            let arr = useMobileStore().mobile;
            let date = new Date();
            const today = new Date(date).setHours(0, 0, 0, 0);
            return arr.filter(item => {
                const itemDate = new Date(item.datetime).setHours(0, 0, 0, 0);
                return itemDate === today; 
            });
        }
    },
    methods: {
        onSubmit() {
            if (this.isValidForm) {
            let object = {
                comment: this.comment,
                agent_id: 1,
                duration: this.hours*3600+this.minutes*60+this.seconds,
                datetime: this.datetime,
                type: this.type,
                uuid: uuidv4(),
            }
            useMobileStore().addMobile(object);
            this.editId = -1;
            this.comment = '';
            this.type = '';
            this.agent_id = -1;
            this.datetime = '';
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
        },
        upDate(x) {
            const datetime = x;
            const date = new Date(datetime);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        },
        formatDuration(timeInSeconds) {
            let hours = Math.floor(timeInSeconds / 3600);
            let minutes = Math.floor((timeInSeconds % 3600) / 60);
            let seconds = timeInSeconds % 60;
            let text = '';
            if (hours > 0) {
                text += `${hours} час. `;
            }
            if (minutes > 0) {
                text += `${minutes} мин. `;
            }
            if (seconds > 0 || timeInSeconds === 0) {
                text += `${seconds} сек.`;
            }
            return text;
        },
        removeById(uuid) {
            useMobileStore().removeMobile(uuid);
        },
        editById(id, obj) {
            this.editId = id;
            this.comment = obj.comment;
            this.datetime = obj.datetime;
            this.hours = Math.floor(obj.duration/3600);
            this.minutes = Math.floor(obj.duration%3600/60);
            this.seconds = obj.duration%3600%60;
            this.type = obj.type;
        },
        saveChanges(id) {
            let object = {
                comment: this.comment,
                agent_id: 1,
                duration: this.hours*3600+this.minutes*60+this.seconds,
                datetime: this.datetime,
                type: this.type,
                uuid: uuidv4(),
            }
            useMobileStore().changeMobile(id, object);
            this.editId = -1;
            this.comment = '';
            this.type = '';
            this.agent_id = -1;
            this.datetime = '';
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        },
        cancelChanges() {
            this.editId = -1;
            this.comment = '';
            this.type = '';
            this.agent_id = -1;
            this.datetime = '';
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        },
    },
}
</script>
<style>
.table__wrapper {
    width: 100%;
    overflow: scroll;
}
</style>