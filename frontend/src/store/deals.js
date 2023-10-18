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
    //   const response = await fetch('deals.json')
    //   this.deals = await response.json()
      this.deals = dataDeals;
    },

    addDeal(deal) {
      this.deals.push(deal) 
    },

    removeDeal(id) {
        let arr = this.deals;
        this.deals = arr.filter(item => item.Id !== id)
    }
  }
})