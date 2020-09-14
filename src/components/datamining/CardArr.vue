<template>
     <div class="list">
         <slot />
     </div>
</template>

<script>
import {ContainerMixin, ElementMixin} from 'vue-slicksort';

export default {
   mixins: [ContainerMixin],

}
</script>

<style>

</style>