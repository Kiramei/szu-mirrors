
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Link } from '@element-plus/icons-vue'


</script>

<template>
    <main class="friendView">
        <header style="width:100%;display:flex;">
            <div style="display:flex;">
                <el-icon :size="23">
                    <Link />
                </el-icon>
                <span class="title">
                    友情链接
                </span>
            </div>
        </header>
        <div class="content">

            <a href="#">校园网</a>
        </div>
    </main>
</template>

<style>
.friendView {
    margin-top: 10px;
}

.friendView .content {
    margin-top: 10px;
}

.friendView .title {
    margin-top: -4px;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin-left: 0.5em;
}
</style>