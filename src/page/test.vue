<template>
  <div>{{ data.msg }}</div>
</template>

<script lang="ts" setup>
interface DataProp {
  msg: number;
}
import { reactive, toRefs } from "@vue/reactivity";
const item: Todo = {
  id: 1,
  name: "hh",
};

let cat = new Animal("Tom");

let data: DataProp = reactive({
  msg: 1,
});
const refdata = toRefs(data);
</script>
<style scoped></style>
