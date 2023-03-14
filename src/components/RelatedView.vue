
<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { CollectionTag } from '@element-plus/icons-vue'

// import { ref } from 'vue'

// type Relative={
//     content:string,
//     url:string
// }

// const relateList = ref([])

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
            <!-- <li style="word-break: break-all;" v-for="item in relateList" :key="item.content">
                <a :href="item.url">{{ item.content }}</a>
            </li> -->
            <li style="word-break: break-all;">
                <a href="https://www.szu.moe">深圳大学Aurora战队</a>
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