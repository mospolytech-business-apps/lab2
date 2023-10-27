import { defineStore } from 'pinia'
import dataObjects from '../assets/objects.json';

export const useObjectsStore = defineStore('objects', {
  state: () => {
    return { 
      objects: []
    }
  },
  actions: {
    changeObject(id, updatedObject) {
      const index = this.objects.findIndex(object => object.Id === id);
      if (index !== -1) {
        const updated = {...this.objects[index], ...updatedObject};
        this.objects.splice(index, 1, updated); 
      }
    },
    async fetchObjects() {
    //   const response = await fetch('objects.json')
    //   this.objects = await response.json()
      this.objects = dataObjects;
    },

    addObject(object) {
      this.objects.push(object) 
    },
    
    removeObject(id) {
        let arr = this.objects;
        this.objects = arr.filter(item => item.Id !== id)
    }
  }
})