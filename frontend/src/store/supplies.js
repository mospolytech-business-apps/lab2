import { defineStore } from 'pinia'
import dataSupplies from '../assets/supplies.json';

export const useSuppliesStore = defineStore('supplies', {
  state: () => {
    return { 
      supplies: []
    }
  },
  actions: {
    async fetchSupplies() {
      this.supplies = dataSupplies;
    },

    addSupply(supply) {
      this.supplies.push(supply) 
    },
    changeSupply(id,supply) {
        const index = this.supplies.findIndex(obj => obj.Id === id);
        if (index !== -1) {
          this.supplies[index] = supply;
        }
      },
    removeSupply(id) {
        let arr = this.supplies;
        this.supplies = arr.filter(item => item.Id !== id)
    }
  }
})