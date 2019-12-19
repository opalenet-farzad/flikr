<template>
    <img :alt="image.title" :src="image.url_n" @click="$emit('imageSelected', image)"
         class="w-100 mt-4 img">
</template>

<script>
export default {
  name: 'ImageCard',
  props: ['image'],
  methods: {
    imageSelected() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
  img{
    cursor: pointer;
  }
</style>
