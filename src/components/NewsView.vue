
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Notification, DArrowRight } from '@element-plus/icons-vue'

import { ref } from 'vue'

type News = {
    date: string,
    content: string
}

const newsList = ref([])

</script>

<template>
    <main class="newsView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <Notification />
                </el-icon>
                <span class="title">
                    新闻公告
                </span>
            </div>
        </header>
        <ul style="margin: 5px 0;">
            <!-- <li style="word-break: break-all;" v-for="item in newsList" :key="item.date">
                <span style="font-weight: bold;margin-right: 4px;">{{ item.date }}</span>
                {{ item.content }}
            </li> -->
            <li style="word-break: break-all;" >
                <span style="font-weight: bold;margin-right: 4px;">2023-2-1</span>
                【公告】2023-2-1镜像站试运营
            </li>
        </ul>
        <footer style="width: 100%;">
            <a style="float:right;display: flex;align-items: center;">
                <span style="margin-top: -4px;">more</span>
                <el-icon>
                    <DArrowRight />
                </el-icon>
            </a>
        </footer>
    </main>
</template>

<style>
.newsView .title {
    margin-top: -4px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}

.newsView ul {
    padding-inline-start: 20px;
}

.newsView ul li {
    cursor: pointer;
}
</style>