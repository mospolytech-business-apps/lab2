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
      const index = this.demands.findIndex(demand => demand.Id === id);
      if (index !== -1) {
        const updated = {...this.demands[index], ...demand};
        this.demands.splice(index, 1, updated); 
    }
      },
    removeDemand(id) {
        let arr = this.demands;
        this.demands = arr.filter(item => item.Id !== id)
    }
  }
})