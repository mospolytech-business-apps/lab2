import { defineStore } from 'pinia'
import dataClients from '../assets/clients.json';
import axios from 'axios';

export const useClientsStore = defineStore('clients', {
  state: () => {
    return { 
      clients: []
    }
  },

  actions: {
    async fetchClients() {
    //   const response = await fetch('clients.json')
    //   this.clients = await response.json()
      this.clients = dataClients;
    },

    addClient(client) {
      this.clients.push(client) 
    },

    removeClient(id) {
        let arr = this.clients;
        this.clients = arr.filter(item => item.Id !== id)
    }
  }
})