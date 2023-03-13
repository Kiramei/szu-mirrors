<script setup lang="ts">
import MirrorView from '@/components/MirrorView.vue';
import NewsView from '@/components/NewsView.vue';
import TopBarView from '@/components/TopBarView.vue'
import DownloadView from '@/components/DownloadView.vue'
import DomainView from '@/components/DomainView.vue'
import ContactView from '@/components/ContactView.vue'
import RelatedView from '@/components/RelatedView.vue'
import FriendView from '@/components/FriendView.vue';
</script>

<template>
  <header class="header">
    <TopBarView />
  </header>
  <div class="container">
    <div class="listContainer">
      <MirrorView />
    </div>
    <div class="infoContainer">
      <div class="newsContainer">
        <NewsView />
      </div>
      <div class="domainContainer">
        <DomainView />
      </div>
      <div class="downloadContainer">
        <DownloadView />
      </div>
      <div class="contactContainer">
        <ContactView />
      </div>
      <div class="relatedContainer">
        <RelatedView />
      </div>
      <div class="friendContainer">
        <FriendView />
      </div>
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
  width: 40px;
  height: 40px;
}

.infoContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2.5em;
}

.newsContainer,
.downloadContainer,
.domainContainer,
.contactContainer,
.relatedContainer,
.friendContainer {
  width: 100%;
}
</style>