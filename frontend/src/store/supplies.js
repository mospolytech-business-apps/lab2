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
    changeSupply(id, updatedSupply) {
      const index = this.supplies.findIndex(supply => supply.Id === id);
      if (index !== -1) {
        const updated = {...this.supplies[index], ...updatedSupply};
        this.supplies.splice(index, 1, updated); 
    }
  },
    removeSupply(id) {
        let arr = this.supplies;
        this.supplies = arr.filter(item => item.Id !== id)
    }
  }
})