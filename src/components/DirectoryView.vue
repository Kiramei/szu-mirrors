<script setup lang="ts">
import { ElTable, ElTableColumn, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref, watch, inject, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

const directory = ref([])
const __route__ = useRoute()
/**
 * routing负责目录的路由
 */
const routing = () => axios(__route__.fullPath).then(res => {
    //获取反向代理的数据
    const origin = res.data
    //hrefs的正则匹配，用于筛选<a href="">中href的值
    const regex_1 = /<a\s[^>]*href\s*=\s*['"]([^"']*)['"][^>]*>/gi;
    const matches_1 = origin.match(regex_1);
    const hrefs = matches_1?.map((match: string) => match.replace(/<a\s[^>]*href\s*=\s*['"]([^"']*)['"][^>]*>/i, '$1'));
    //dates的正则匹配，用于筛选<a href="">后面的日期信息
    const regex_2 = /<a\s[^>]*>[^<]*<\/a>\s+(\d{2}-[A-Za-z]{3}-\d{4}\s+\d{2}:\d{2})/gi;
    const matches_2 = origin.match(regex_2);
    const dates = ['', ...matches_2?.map((match: string) => match.replace(/<a\s[^>]*>[^<]*<\/a>\s+(\d{2}-[A-Za-z]{3}-\d{4}\s+\d{2}:\d{2})/i, '$1')) ?? []];
    //返回表中所需填充的信息，作为对象数组返回
    directory.value = hrefs?.map((_e: string, i: number) => {
        let url: string
        //以下生成真实目录名，考虑各种情况
        if (hrefs?.at(i) === '../')
            url = hrefs?.at(i) ?? ''
        else if (__route__.fullPath.endsWith('/'))
            url = __route__.fullPath + hrefs?.at(i)
        else
            url = __route__.fullPath + '/' + hrefs?.at(i)
        return {
            "name": hrefs?.at(i),   //目录名
            "date": dates[i],       //日期
            "url": url              //真实目录名
        }
    })
})
//初始化路由
routing()
//监听路由
watch(__route__, () => {
    routing()
})
/**
 * 为每一个镜像设置背景样式，根据镜像状态
 * 该方法返回值为传入e-table中row-class-name的样式类名
 */


const boxWidth = ref(0)
const global: any = inject('global')

/**
 * 定义页面初始化操作，设置页面每10秒完成更新
 */
onMounted(() => {
    setBoxWidth(global.pageWidth.value)
})

/**
 * 使用watch监听窗口大小变化，设置全局窗口大小
 */
watch(global.pageWidth, () => {
    setBoxWidth(global.pageWidth.value)
})

/**
 * 该方法完成自适应操作，对大于450px的页宽设置250px的盒子宽度
 * 否则设置为185px
 * @param screenWidth 页面宽度，由监听器设定
 */

const setBoxWidth = (screenWidth: number) => {
    if (screenWidth >= 450) boxWidth.value = 250
    else boxWidth.value = 185
}



</script>

<template>
    <!-- 绑定数据，设置行样式 -->
    <ElTable :data="directory">
        <!-- 自定义列，表示镜像名 -->
        <ElTableColumn prop="name" label="Name">
            <!-- 定义插槽 -->
            <template #default="scope">
                <!-- 外部包裹的flex盒子 -->
                <div style="display: flex;align-items: center;">
                    <!-- 链接，可单击的实体，需要考虑是文件还是文件夹 -->
                    <RouterLink v-if="scope.row.name.endsWith('/')" class="linkItem" :to=scope.row.url>
                        {{ scope.row.name }}
                    </RouterLink>
                    <a v-if="!scope.row.name.endsWith('/')" :href="scope.row.url" class="linkItem" download>
                        {{ scope.row.name }}</a>
                    <!-- 链接旁边的小问号，暂时不起作用，后续配合help功能使用 -->
                    <el-icon v-if="false && scope.row.name != null" :size="18" color="var(--color-text)"
                        style="margin-left: 5px; cursor: pointer;">
                        <QuestionFilled />
                    </el-icon>
                </div>
            </template>
        </ElTableColumn>
        <!-- 自定义列，表示最新更新时间 -->
        <ElTableColumn prop="date" label="Last Update" :width="boxWidth">
            <template #default="scope">
                <div style="font-size:16px;display: flex;align-items: center;">
                    <!-- 显示时间 -->
                    <span>{{ scope.row.date }}</span>
                </div>
                <!-- 重传多次显示角标，内容为重传次数 -->
                <span :class="{ 'corner-tip': true, 'sync-tip': scope.row.status > 1 }"
                    v-if="scope.row.status !== 0 && Math.abs(scope.row.status) > 1">{{
                        Math.abs(scope.row.status) }}</span>
            </template>
        </ElTableColumn>
    </ElTable>
</template>

<style>
@media screen and (max-width: 450px) {
    .button-set {
        display: none;
    }
}

@media screen and (min-width: 450px) {
    .button-set {
        display: flex;
        align-items: center;
    }
}

.el-input,
.el-input__wrapper {
    background-color: var(--color-background);
}

.el-input__inner {
    color: var(--color-text, var(--color-text));
}

.ok-button {
    user-select: none;
    background-color: var(--ok-button-color);
    color: var(--status-button-text-color);
    border-radius: 5px;
    padding: 0px 6px 0px 5px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    margin-left: 10px;
    text-shadow: 1px 0px #848484bf;
}

.sync-button {
    user-select: none;
    background-color: var(--sync-button-color);
    color: var(--status-button-text-color);
    border-radius: 5px;
    padding: 0px 6px 0px 5px;
    height: 20px;
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    margin-left: 10px;
    text-shadow: 1px 0px #848484bf;
}

.fail-button {
    user-select: none;
    background-color: var(--fail-button-color);
    color: var(--status-button-text-color);
    border-radius: 5px;
    padding: 0px 6px 0px 5px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    margin-left: 10px;
    text-shadow: 1px 0px #848484bf;
}

.corner-tip {
    position: absolute;
    margin-left: 190px;
    margin-top: -23px;
    min-width: 16px;
    font-size: 10px;
    background: var(--corner-tip-color);
    color: white;
    border-radius: 10px;
    line-height: 10px;
    padding: 3px;
    text-align: center;
    user-select: none;
}

.sync-tip {
    margin-left: 202px;
}

.linkItem {
    font-size: 16px;
}

.el-table thead .cell {
    color: var(--color-text);
    font-weight: 600;
}

.el-table {
    --el-table-bg-color: var(--color-background);
    --el-table-border-color: var(--color-border);
    --el-table-text-color: var(--color-text);
    --el-table-header-text-color: var(--color-text);
    --el-table-header-bg-color: var(--color-background);
    --el-table-row-hover-bg-color: var(--table-row-color);
    --el-table-tr-bg-color: var(--color-background);
}

.el-table__header-wrapper {
    border-bottom: solid 1.5px var(--color-border);
}
</style>
