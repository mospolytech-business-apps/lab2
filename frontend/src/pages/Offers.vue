<template>
    <TableOffers />
    <TableNeeds />
</template>
<script>
import TableNeeds from '../components/TableNeeds.vue';
import TableOffers from '../components/TableOffers.vue';
import { useSuppliesStore } from '../store/supplies';

export default {
    components: {
    TableOffers,
    TableNeeds
},
    setup() {
        const suppliesStore = useSuppliesStore()
        suppliesStore.fetchSupplies()
        return {
            supplies: suppliesStore.supplies,
        }
    },
}

</script>
  
<style scoped></style>
  