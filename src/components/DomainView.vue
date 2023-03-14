
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Connection } from '@element-plus/icons-vue'
import { ref } from 'vue'

const domainList = ref([
    {
        url: 'mirrors.szu.moe',
        tip: '自动解析（仅内部网）'
    }
    /*, {
        url: 'https://mirrors6.ea.szu.edu.cn',
        tip: '只解析IPv6'
    }, {
        url: 'https://mirrors4.ea.szu.edu.cn',
        tip: '只解析IPv4'
    },*/
])
</script>

<template>
    <main class="domainView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <Connection />
                </el-icon>
                <span class="title">
                    域名选择
                </span>
            </div>
        </header>
        <ul style="margin: 5px 0;">
            <li style="word-break: break-all;" v-for="item in domainList" :key="item.url">
                <a>{{ item.url }}</a>
                {{ item.tip }}
            </li>
        </ul>
    </main>
</template>

<style>
.domainView .title {
    margin-top: -6px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}

.domainView ul {
    padding-inline-start: 20px;
    margin-top: 5px;
}
</style>