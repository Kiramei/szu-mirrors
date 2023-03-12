<script setup lang="ts">
import MirrorView from '@/components/MirrorView.vue';
import NewsView from '@/components/NewsView.vue';

</script>

<template>
  <header class="header">
    <a href="/" class="page-title-block">
      <img src="@/assets/logo.png" width="40px" height="40px" alt="">
      <div class="page-title">
        深圳大学开源镜像站
      </div>
    </a>
    <div class="flex-grow"></div>

    <div class="menu-item">EVENTS</div>
    <div class="menu-item menu-active">MIRRORS</div>
  </header>
  <div class="container">
    <div class="listContainer">
      <MirrorView />
    </div>
    <div class="newsContainer">
      <NewsView />
    </div>
  </div>

</template>


<style>
.flex-grow {
  flex-grow: 1;
}

.header {
  margin-right: 20px;
  display: flex;
  margin-bottom: 40px;
}

.header a {
  color: var(--color-text);
}

.header a:hover {
  color: var(--color-text);
}

.header img {
  -webkit-user-drag: none;
  cursor: pointer;
}

.page-title-block {
  display: flex;
  user-select: none;
  cursor: pointer;
}

.page-title {
  margin-left: 10px;
  font-weight: bold;
  font-size: 22px;
}

.menu-item {
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  font-weight: 500;
  padding: 0px 20px 15px 20px;
  transition: 0.3s ease;
}

.menu-active {
  color: var(--color-text);
  border-bottom: 2px solid var(--color-text);
}

.menu-item:hover {
  opacity: 0.7;
}



@media screen and (min-width:1024px) {
  .listContainer {
    width: 65%;
  }

  .container {
    display: flex;
  }

  .newsContainer {
    width: 30%;
    margin: 10px 30px;
  }
}

@media screen and (max-width:1024px) {
  .newsContainer {
    display: none;
  }
}
</style>