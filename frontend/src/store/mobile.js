import { defineStore } from 'pinia'
import dataMobile from '../assets/mobile.json';

export const useMobileStore = defineStore('mobile', {
  state: () => {
    return { 
      mobile: []
    }
  },

  actions: {
    async fetchMobile() {
    //   const response = await fetch('deals.json')
    //   this.deals = await response.json()
      this.mobile = dataMobile;
    },

    addMobile(mobile) {
      this.mobile.push(mobile) 
    },

    removeMobile(id) {
        let arr = this.mobile;
        this.mobile = arr.filter(item => item.uuid !== id)
    },
    changeMobile(id,object) {
      const index = this.mobile.findIndex(obj => obj.uuid === id);
      console.log(index)
      if (index !== -1) {
        this.mobile[index] = object;
      }
    },
  }
})