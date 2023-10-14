<template>
    <TableObjects />
</template>
<script>
import TableObjects from '../components/TableObjects.vue';
import { useObjectsStore } from '../store/objects';

export default {
    components: {
        TableObjects,
    },
    setup() {
        const objectsStore = useObjectsStore()
        objectsStore.fetchObjects()
        return {
            objects: objectsStore.objects,
        }
    },
}

</script>
  
<style scoped></style>
  