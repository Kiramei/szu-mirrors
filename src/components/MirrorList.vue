<script setup lang="ts">
import { ElTable, ElTableColumn, ElIcon, vLoading } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref, watch, inject, onMounted } from 'vue'
import axios from 'axios'

/**
 * 定义返回的json单元对象
 * name : 镜像名
 * lastupdate : 最后更新时间
 * status : 当前状态
 */
interface MirrorItem {
    name: string
    lastupdate: string
    status: number
}

/**
 * 为每一个镜像设置背景样式，根据镜像状态
 * 该方法返回值为传入e-table中row-class-name的样式类名
 */

const tableRowClassName = ({
    row
}: {
    row: MirrorItem
}) => {
    if (row.status > 0) {
        return 'process-row'
    } else if (row.status === 0) {
        return 'success-row'
    } else if (row.status < 0) {
        return 'warning-row'
    }
    return ''
}


const boxWidth = ref(0)
const dataResult = ref([])
const global: any = inject('global')
const __loading__ = ref(true)

/**
 * 定义页面初始化操作，设置页面每10秒完成更新
 */
onMounted(() => {
    setBoxWidth(global.pageWidth.value)
    sync();
    setInterval(sync, 10000);
})

/**
 * 使用Axios库进行HTTP GET请求，以获取/api/status端点的数据。
 * 当响应成功返回时，它将响应数据赋给dataResult.value和tableData.value。
 * 该函数作用是同步数据
 */
const sync = () => {
    axios.get('/api/status').then(res => {
        //axios.get('https://mirrors.szu.moe/api').then(res => {
        dataResult.value = global.tableData.value = res.data
        __loading__.value = false
    })
}

/**
 * 使用watch监听窗口大小变化，设置全局窗口大小
 */
watch(global.pageWidth, () => {
    setBoxWidth(global.pageWidth.value)
})

/**
 * 使用watch监听搜索框数据变化，并且实现搜索功能
 */
watch(global.searchText, () => {
    let sText: string = global.searchText.value
    if (sText.length > 0)
        dataResult.value = global.tableData.value.filter(
            (e: MirrorItem) => e.name.indexOf(sText) != -1)
    else
        dataResult.value = global.tableData.value
})

/**
 * 该方法完成自适应操作，对大于450px的页宽设置250px的盒子宽度
 * 否则设置为185px
 * @param screenWidth 页面宽度，由监听器设定
 */

const setBoxWidth = (screenWidth: number) => {
    if (screenWidth >= 450) boxWidth.value = 250
    else boxWidth.value = 190
}



</script>

<template>
    <!-- 绑定数据，设置行样式 -->
    <ElTable v-loading="__loading__" :data="dataResult" :row-class-name="tableRowClassName">
        <!-- 自定义列，表示镜像名 -->
        <ElTableColumn prop="name" label="Name">
            <!-- 定义插槽 -->
            <template #default="scope">
                <!-- 外部包裹的flex盒子 -->
                <div style="display: flex;align-items: center;">
                    <!-- 链接，可单击的实体 -->
                    <RouterLink class="linkItem" :to=scope.row.name>{{ scope.row.name }}</RouterLink>
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
                    <span>{{ scope.row.lastupdate }}</span>
                    <div class="button-set">
                        <!-- 三种按钮 -->
                        <span v-if="scope.row.status === 0" class="ok-button">OK</span>
                        <span v-if="scope.row.status > 0" class="sync-button">syncing</span>
                        <span v-if="scope.row.status < 0" class="fail-button">failed</span>
                    </div>
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
