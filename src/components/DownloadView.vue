
<script setup lang="ts">
import { ElIcon, ElButton } from 'element-plus';
import { Document } from '@element-plus/icons-vue'


</script>

<template>
    <main class="downloadView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <Document />
                </el-icon>
                <span class="title">
                    下载链接
                </span>
            </div>
        </header>
        <div class="tip">
            常用发行版ISO和应用工具安装包直接下载
        </div>
        <div class="button">
            <ElButton type="primary">资源整理中</ElButton>
        </div>
    </main>
</template>

<style>
.downloadView {
    margin-top: 10px;
}

.downloadView .title {
    margin-top: -6px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}

.downloadView .tip {
    margin-top: 5px;
}

.downloadView .button {
    margin-top: 10px;
}
</style>