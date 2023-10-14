import { defineStore } from 'pinia'
import dataAgents from '../assets/agents.json';
import axios from 'axios';

export const useAgentsStore = defineStore('agents', {
  state: () => {
    return { 
      agents: []
    }
  },

  actions: {
    async fetchAgents() {
    //   const response = await fetch('agents.json')
    //   this.agents = await response.json()
      this.agents = dataAgents;
    },

    addAgent(agent) {
      this.agents.push(agent) 
    },

    removeAgent(id) {
        let arr = this.agents;
        this.agents = arr.filter(item => item.Id !== id)
    }
  }
})