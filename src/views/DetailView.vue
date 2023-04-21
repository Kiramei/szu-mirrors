<script setup lang="ts">
import TopBarView from '@/components/TopBarView.vue'
import { ref } from 'vue';

const p = ref('')
</script>


<template>
  <header class="header">
    <TopBarView />
  </header>
  <div class="routeContainer">
    {{ `当前路由为: ${$route.fullPath}` }}
  </div>
  {{ `当前导航目录有:${p}` }}
</template>


<style>
.routeContainer {
  font-size: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 418px;
}
</style> 

