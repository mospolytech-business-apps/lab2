<template>
  <Header />
  <router-view></router-view>
</template>
<script>
import Header from './components/Header.vue';

import { useClientsStore } from './store/clients';
import { useAgentsStore } from './store/agents';
import { useObjectsStore } from './store/objects';
import { useDemandsStore } from './store/demands';
import { useSuppliesStore } from './store/supplies';
import { useDealsStore } from './store/deals';
import { useMobileStore } from './store/mobile';

export default {
  components: {
    Header
},
  setup() {
    const clientsStore = useClientsStore()
    clientsStore.fetchClients()
    const agentsStore = useAgentsStore()
    agentsStore.fetchAgents()
    const objectsStore = useObjectsStore()
    objectsStore.fetchObjects()
    const demandsStore = useDemandsStore()
    demandsStore.fetchDemands()
    const suppliesStore = useSuppliesStore()
    suppliesStore.fetchSupplies()
    const dealsStore = useDealsStore()
    dealsStore.fetchDeals()
    const mobileStore = useMobileStore()
    mobileStore.fetchMobile()
    return {
      clients: clientsStore.clients,
      agents: agentsStore.agents,
      objects: objectsStore.objects,
      demands: demandsStore.demands,
      supplies: suppliesStore.supplies,
      deals: dealsStore.deals,
      mobile: mobileStore.mobile,
    }
  },
}
</script>

<style lang="scss">
</style>
