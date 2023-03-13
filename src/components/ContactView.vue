
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Message } from '@element-plus/icons-vue'

import { ref } from 'vue'

const contactList = ref([
    {
        tip: '意见反馈',
        content: 'https://github.com/szuea/issues',
        url: '#'
    }, {
        tip: '发送邮件',
        content: 'support@szuea.szu.edu.cn',
        url: '#'
    }, {
        tip: '在线交流',
        content: '#szuea at WeChat',
        url: '#'
    },
])

</script>

<template>
    <main class="contactView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <Message />
                </el-icon>
                <span class="title">
                    联系我们
                </span>
            </div>
        </header>
        <ul style="margin: 5px 0;">
            <li style="word-break: break-all;" v-for="item in contactList" :key="item.tip">
                <div style="font-weight: bold;margin-right: 4px;">{{ item.tip }}</div>
                <a :href="item.url">{{ item.content }}</a>
            </li>
        </ul>
    </main>
</template>

<style>
.contactView {
    margin-top: 10px;
}

.contactView .title {
    margin-top: -4px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}

.contactView ul {
    padding-inline-start: 20px;
}
</style>