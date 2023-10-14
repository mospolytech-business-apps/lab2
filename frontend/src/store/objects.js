import { defineStore } from 'pinia'
import dataObjects from '../assets/objects.json';

export const useObjectsStore = defineStore('objects', {
  state: () => {
    return { 
      objects: []
    }
  },
  actions: {
    async fetchObjects() {
    //   const response = await fetch('objects.json')
    //   this.objects = await response.json()
      this.objects = dataObjects;
    },

    addObject(object) {
      this.objects.push(object) 
    },
    changeObject(id,object) {
        const index = this.objects.findIndex(obj => obj.Id === id);
        if (index !== -1) {
          this.objects[index] = object;
        }
      },
    removeObject(id) {
        let arr = this.objects;
        this.objects = arr.filter(item => item.Id !== id)
    }
  }
})