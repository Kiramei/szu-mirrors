<script setup lang="ts">
import MirrorList from '@/components/MirrorList.vue';
import { ElIcon, ElInput } from 'element-plus';
import { Box } from '@element-plus/icons-vue'
import { inject } from 'vue'

const global: any = inject('global')

</script>

<template>
  <main class="mirrorView">
    <header style="width:100%;display:flex;">
      <div style="display:flex;">
        <el-icon :size="30">
          <Box />
        </el-icon>
        <span class="title">
          镜像列表
        </span>
      </div>
      <div class="flex-grow"></div>
      <div class="search-box">
        <ElInput v-model="global.searchText.value" placeholder="搜索" />
      </div>
    </header>
    <div class="mirrorList">
      <MirrorList />
    </div>
  </main>
</template>

<style>
.mirrorView .title {
  font-size: 25px;
  font-weight: 800;
  line-height: 30px;
  margin-left: 0.5em;
}

.mirrorView .mirrorList {
  margin-top: 20px;
  height: 100%;
}

.flex-grow {
  flex-grow: 1;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 2px var(--color-text) inset
}

.search-box {
  width: 45%;
  max-width: 200px;
}
</style>