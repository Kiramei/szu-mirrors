
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { CollectionTag } from '@element-plus/icons-vue'

import { ref } from 'vue'

const relateList = ref([
    {
        content: '使用帮助',
        url: '#'
    }, {
        content: '服务器状态',
        url: '#'
    },
    {
        content: '同步器状态',
        url: '#'
    },
    {
        content: '深圳大学电子协会',
        url: '#'
    },
    {
        content: '镜像管理器源码',
        url: '#'
    },
    {
        content: '自定义镜像脚本',
        url: '#'
    },
])

</script>

<template>
    <main class="relatedView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <CollectionTag />
                </el-icon>
                <span class="title">
                    相关链接
                </span>
            </div>
        </header>
        <ul style="margin: 5px 0;">
            <li style="word-break: break-all;" v-for="item in relateList" :key="item.content">
                <a :href="item.url">{{ item.content }}</a>
            </li>
        </ul>
    </main>
</template>

<style>
.relatedView {
    margin-top: 10px;
}

.relatedView .title {
    margin-top: -4px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}

.relatedView ul {
    padding-inline-start: 20px;
}
</style>