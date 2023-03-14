<script setup lang="ts">
import { ElTable, ElTableColumn, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref, watch, inject, onMounted } from 'vue'
import axios from 'axios'
interface MirrorItem {
    name: string
    lastupdate: string
    status: number
}

/**
 * Every Ten seconds request the list
 *
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
const tableData = ref([])
const dataResult = ref([])
// const searchMode = ref(false)
const global: any = inject('global')


onMounted(() => {
    setBoxWidth(global.pageWidth.value)
    sync();
    setInterval(sync, 10000);
})

const sync = () => {
    axios.get('/api/status').then(res => {
    //axios.get('https://mirrors.szu.moe/api').then(res => {
        dataResult.value = tableData.value = res.data
    })
}

watch(global.pageWidth, () => {
    setBoxWidth(global.pageWidth.value)
})

watch(global.searchText, () => {
    let sText: string = global.searchText.value
    if (sText.length > 0)
        dataResult.value =
            tableData.value.filter(
                (e: MirrorItem) => e.name.indexOf(sText) != -1)
    else
        dataResult.value = tableData.value
})

const setBoxWidth = (screenWidth: number) => {
    if (screenWidth >= 450) boxWidth.value = 225
    else boxWidth.value = 170
}
</script>

<template>
    <ElTable :data="dataResult" :row-class-name="tableRowClassName">
        <ElTableColumn prop="name" label="Name">
            <template #default="scope">
                <div style="display: flex;align-items: center;">
                    <a class="linkItem" :href=scope.row.name>{{ scope.row.name }}</a>
                    <el-icon v-if="scope.row.url != null" :size="18" color="var(--color-text)" style="margin-left: 5px; cursor: pointer;">
                        <QuestionFilled />
                    </el-icon>
                </div>
            </template>
        </ElTableColumn>
        <ElTableColumn prop="date" label="Last Update" :width="boxWidth">
            <template #default="scope">
                <div style="font-size:16px;display: flex;align-items: center;">
                    <span>{{ scope.row.lastupdate }}</span>
                    <div class="button-set">
                        <span v-if="scope.row.status === 0" class="ok-button">OK</span>
                        <span v-if="scope.row.status > 0" class="sync-button">syncing</span>
                        <span v-if="scope.row.status < 0" class="fail-button">failed</span>
                    </div>
                </div>
                <span class="corner-tip" v-if="scope.row.status !== 0 && Math.abs(scope.row.status) > 1">{{
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
    background-color: var(--el-color-success);
    color: white;
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
    background-color: #5bc0de;
    color: white;
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
    background-color: var(--el-color-warning);
    color: white;
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
    background: var(--el-color-danger);
    color: white;
    border-radius: 10px;
    line-height: 10px;
    padding: 3px;
    text-align: center;
    user-select: none;
}

.linkItem {
    font-size: 16px;
}

.el-table thead .cell {
    color: var(--color-text);
    font-weight: 600;
}

.el-table .warning-row {
    --el-table-tr-bg-color: #e6a23c33;
}

.el-table .success-row {
    --el-table-tr-bg-color: #67c23a32;
}

.el-table .process-row {
    --el-table-tr-bg-color: rgb(227, 255, 253);
}

.el-table {
    --el-table-bg-color: var(--color-background);
    --el-table-border-color: var(--color-border);
    --el-table-text-color: var(--color-text);
    --el-table-header-text-color: var(--color-text);
    --el-table-header-bg-color: var(--color-background);
    --el-table-row-hover-bg-color: var(--color-border-hover);
    --el-table-tr-bg-color: var(--color-background);
}

.el-table__header-wrapper {
    border-bottom: solid 1.5px var(--color-border);
}
</style>