<template>
  <div class="image-wrap">
    <img :src="src" :style="{ maxWidth: _maxWidth }" />
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';

const props = defineProps({
  src: String as PropType<string>,
  maxWidth: [String, Number] as PropType<string | number>
})

const _maxWidth = computed(() => typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth)
</script>

<style scoped>
.image-wrap {
  display: flex;
  justify-content: center;
}
</style>