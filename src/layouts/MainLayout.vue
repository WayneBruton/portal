<template>
  <q-layout>
    <!-- <template> -->
    <!-- <std-header /> -->
    <!-- <div class="q-pa-md q-gutter-y-sm">
        <div class="bg-orange text-white">
          <q-toolbar>
            <q-btn flat round dense icon="menu" class="q-mr-sm" />
            <q-space />
            <q-btn flat round dense icon="search" class="q-mr-xs" />
            <q-btn flat round dense icon="group_add" />
          </q-toolbar>
          <q-toolbar inset>
            <q-toolbar-title><strong>Quasar</strong> Framework</q-toolbar-title>
          </q-toolbar>
        </div>
      </div> -->
    <!-- </template> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import StdHeader from "components/StdHeader.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink
    // StdHeader,
  },

  setup() {
    // const leftDrawerOpen = ref(false)

    return {};
  },
});
</script>

<style scoped>
q-drawer {
  background-color: transparent !important;
  box-shadow: none !important;
}

body {
  margin: 0px;
}
</style>
