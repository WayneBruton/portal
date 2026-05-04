<template>
  <div>
    <q-btn
      round
      color="purple"
      glossy
      icon="local_grocery_store"
      class="floating-button"
      @click="handleClick"
    ></q-btn>
    <q-dialog v-model="basic">
      <q-card>
        <q-card-section>
          <div class="text-h6">Chat Bot</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 3" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
            voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at
            omnis vel numquam exercitationem aut, natus minima, porro labore.
          </p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
const handleClick = () => {
  console.log("Button clicked");
  basic.value = true;
  // Handle button click event
};

const basic = ref(false);
</script>

<style>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* Add additional styles as needed */
}
</style>
