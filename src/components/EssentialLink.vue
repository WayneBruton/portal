<template>
  <!-- <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item> -->
  <div class="loginDiv">
    <!-- <div class="loginDivInside"> -->
      <div class="q-gutter-md" style="max-width: 100%; margin-top: 300px;">

        <q-input outlined v-model="text" label="Outlined" />

        <q-input standout v-model="text" label="Standout" />

        <q-input standout="bg-teal text-white" v-model="text" label="Custom standout" />

        <q-input borderless v-model="text" label="Borderless" />

      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
$q.dark.set(true);

// export default defineComponent({

//   name: 'EssentialLink',
//   props: {
//     title: {
//       type: String,
//       required: true
//     },

//     caption: {
//       type: String,
//       default: ''
//     },

//     link: {
//       type: String,
//       default: '#'
//     },

//     icon: {
//       type: String,
//       default: ''
//     }
//   }
// })
</script>

<style scoped>
.loginDiv {
  /* background-color: #f1f1f1; */
  /* margin: 20px 20px 20px 20px; */
  /* padding: 20px; */
  width: 100%;
  /* opacity: 0.5; */

  /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  /* font-family: Arial; */
}

.loginDivInside {
  /* background-color: #fff; */
  margin: 120px 20px 80px 20px;
  padding: 20px;
  width: 100%;
  height: 70vh;
  /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  font-family: Arial;
}
</style>
