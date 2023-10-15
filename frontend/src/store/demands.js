import { defineStore } from 'pinia'
import dataDemands from '../assets/demands.json';

export const useDemandsStore = defineStore('demands', {
  state: () => {
    return { 
        demands: []
    }
  },
  actions: {
    async fetchDemands() {
      this.demands = dataDemands;
    },

    addDemand(demand) {
      this.demands.push(demand) 
    },
    changeDemand(id,demand) {
        const index = this.demands.findIndex(obj => obj.Id === id);
        if (index !== -1) {
          this.demands[index] = demand;
        }
      },
    removeDemand(id) {
        let arr = this.demands;
        this.demands = arr.filter(item => item.Id !== id)
    }
  }
})