<template>
  <div>我是首页位置</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { homeGoodsList } from '../../api';

const getHomeInfo = async () => {
  const res = await homeGoodsList();
  console.log(res);
}

onMounted(() => {
  getHomeInfo();
})
</script>

<style lang="scss" scoped>

</style>