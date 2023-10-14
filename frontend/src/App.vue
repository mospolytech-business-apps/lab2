<template>
  <TableClients />
  <TableAgents />
</template>
<script>
import TableClients from './components/TableClients.vue';
import TableAgents from './components/TableAgents.vue';

import { useClientsStore } from './store/clients';
import { useAgentsStore } from './store/agents';


export default {
  components: {
    TableClients,
    TableAgents,
  },
  setup() {
    const clientsStore = useClientsStore()
    clientsStore.fetchClients()
    const agentsStore = useAgentsStore()
    agentsStore.fetchAgents()
    return {
      clients: clientsStore.clients,
      agents: agentsStore.agents
    }
  },
}
</script>

<style scoped></style>
