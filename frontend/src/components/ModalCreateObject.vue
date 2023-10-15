<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content p-2 ">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold mb-0 fs-4">Добавить объект недвижимости</h5>
                    <button type="button" class="btn btn-close" @click="$emit('close')"></button>
                </div>
                    <form @submit.prevent="onSubmit">
                        <div class="modal-body row g-2">
                            <div class="form-floating mb-3">
                                <input v-model="Address_City" class="form-control rounded-3" id="Address_City">
                                <label for="Address_City">Город</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="Address_Street" id="Address_Street" class="form-control rounded-3">
                                <label for="Address_Street">Улица</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Address_House" v-model="Address_House" class="form-control rounded-3">
                                <label for="Address_House">Дом</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Address_Number" v-model="Address_Number" class="form-control rounded-3">
                                <label for="Address_Number">Квартира</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Coordinate_latitude" v-model="Coordinate_latitude" class="form-control rounded-3">
                                <label for="Coordinate_latitude">Широта</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input id="Coordinate_longitude" v-model="Coordinate_longitude" class="form-control rounded-3">
                                <label for="Coordinate_longitude">Долгота</label>
                            </div>
                            <div class="form-floating mb-3">
                            <select id="type" v-model="type" class="form-select" aria-label="Тип объекта недвижимости">
                                <option value="apartment" selected>Квартира</option>
                                <option value="house">Дом</option>
                                <option value="land">Земля</option>
                            </select>
                            <label for="type">Тип объекта</label>
                            </div>
                            <div v-if="type=='apartment'" class="form-floating mb-3 col-md-6">
                                <input id="Floor" v-model="Floor" class="form-control rounded-3">
                                <label for="Floor">Этаж</label>
                            </div>
                            <div v-if="type=='apartment'" class="form-floating mb-3 col-md-6">
                                <input id="Rooms" v-model="Rooms" class="form-control rounded-3">
                                <label for="Rooms">Количество комнат</label>
                            </div>
                            <div v-if="type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="TotalFloors" v-model="TotalFloors" class="form-control rounded-3">
                                <label for="TotalFloors">Этажность дома</label>
                            </div>
                            <div v-if="type=='house'" class="form-floating mb-3 col-md-6">
                                <input id="Rooms" v-model="Rooms" class="form-control rounded-3">
                                <label for="Rooms">Количество комнат</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input id="TotalArea" v-model="TotalArea" class="form-control rounded-3">
                                <label for="TotalArea">Площадь</label>
                            </div>
                        </div>
                        <div class="modal-footer form-group">
                            <button class="w-40 mb-2 btn btn-secondary rounded-pill" @click="$emit('close')">
                                Отмена
                            </button>
                            <button class="w-40 mb-2 btn rounded-pill btn-primary" @submit="this.onSubmit" :disabled="!isValidForm">Добавить объект</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useObjectsStore } from '../store/objects'

export default {
    emits: ['close'],
    data() {
        return {
            type: 'apartment',
            Address_City: '',
            Address_Street: '',
            Address_House: '',
            Address_Number: '',
            Coordinate_latitude: '',
            Coordinate_longitude: '',
            TotalArea: '',
            Floor: '',
            Rooms: '',
            TotalFloors: '',
        }
  },
  computed: {
    isValidForm() {
      return true
    }
  },
  methods: {
    onSubmit() {
      if (!this.isValidForm) return
      let object = {
        Address_City: this.Address_City,
        Address_Street: this.Address_Street, 
        Address_House: this.Address_House,
        Address_Number: this.Address_Number,
        Coordinate_latitude: this.Coordinate_latitude,
        Coordinate_longitude: this.Coordinate_longitude,
        TotalArea: this.TotalArea,
        Id: useObjectsStore().objects[useObjectsStore().objects.length - 1].Id + 1
      }
      if (this.type=='apartment') {object.Floor = this.Floor; object.Rooms = this.Rooms}
      else if (this.type=='house') {object.TotalFloors = this.TotalFloors};
      useObjectsStore().addObject(object);
      console.log(object)
    }
  }
}
</script>
<style lang="scss">
.modal {
    display: block !important;
}
</style>