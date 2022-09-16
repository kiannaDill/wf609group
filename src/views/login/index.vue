<template>
  <h1>内容</h1>
</template>

<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";

const data = reactive({
  count: 0,
});

const res = await axios.get("data.json")
console.log(res);

</script>

<style lang="scss" scoped>
</style>