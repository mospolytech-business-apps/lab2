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
      this.clients = dataClients;
    },
    changeClient(id, updatedClient) {
      const index = this.clients.findIndex(client => client.Id === id);
      if (index !== -1) {
        const updated = {...this.clients[index], ...updatedClient};
        this.clients.splice(index, 1, updated); 
      }
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