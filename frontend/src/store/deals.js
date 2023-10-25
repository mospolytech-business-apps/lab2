import { defineStore } from 'pinia'
import dataDeals from '../assets/deals.json';

export const useDealsStore = defineStore('deals', {
  state: () => {
    return { 
      deals: []
    }
  },

  actions: {
    async fetchDeals() {
      this.deals = dataDeals;
    },

    addDeal(deal) {
      this.deals.push(deal) 
    },

    removeDeal(id) {
        let arr = this.deals;
        this.deals = arr.filter(item => item.Id !== id)
    },

    changeDeal(id, updatedDeal) {
      const index = this.deals.findIndex(deal => deal.Id === id);
      if (index !== -1) {
        const updated = {...this.deals[index], ...updatedDeal};
        this.deals.splice(index, 1, updated); 
      }
    },
  }
})