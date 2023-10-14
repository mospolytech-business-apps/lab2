<template>
  <Header />
  <router-view></router-view>

  <!-- <TableClients />
  <TableAgents /> -->

</template>
<script>
import TableClients from './components/TableClients.vue';
import TableAgents from './components/TableAgents.vue';
import Header from './components/Header.vue';

import { useClientsStore } from './store/clients';
import { useAgentsStore } from './store/agents';

export default {
  components: {
    TableClients,
    TableAgents,
    Header
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
