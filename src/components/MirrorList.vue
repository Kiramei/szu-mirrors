<script setup lang="ts">
import { ElTable, ElTableColumn, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
interface MirrorItem {
    name: string
    date: string
    status: number
}

/**
 * Every Ten seconds request the list
 * 
 */

 

const tableData = ref([
    {
        name: "AOSP",
        date: "2023-03-11 20:40",
        status: 0
    },
    {
        name: "Adoptium",
        date: "2023-03-09 04:28",
        status: 1
    },
    {
        name: "Koo",
        date: "2023-02-01 02:52",
        status: 2
    }, {
        name: "AOSP",
        date: "2023-03-11 20:40",
        status: 0
    },
    {
        name: "Adoptium",
        date: "2023-03-09 04:28",
        status: 1
    },
    {
        name: "Koo",
        date: "2023-02-01 02:52",
        status: 2
    }, {
        name: "AOSP",
        date: "2023-03-11 20:40",
        status: 0
    },
    {
        name: "Adoptium",
        date: "2023-03-09 04:28",
        status: 1
    },
    {
        name: "Koo",
        date: "2023-02-01 02:52",
        status: 2
    }, {
        name: "AOSP",
        date: "2023-03-11 20:40",
        status: 0
    },
    {
        name: "Adoptium",
        date: "2023-03-09 04:28",
        status: 1
    },
    {
        name: "Koo",
        date: "2023-02-01 02:52",
        status: 2
    }, {
        name: "AOSP",
        date: "2023-03-11 20:40",
        status: 0
    },
    {
        name: "Adoptium",
        date: "2023-03-09 04:28",
        status: 1
    },
    {
        name: "Koo",
        date: "2023-02-01 02:52",
        status: 2
    },])

const tableRowClassName = ({
    row
}: {
    row: MirrorItem
}) => {
    if (row.status === 1) {
        return 'process-row'
    } else if (row.status === 4) {
        return 'success-row'
    } else if (row.status === 2) {
        return 'warning-row'
    }
    return ''
}

</script>


<template>
    <ElTable :data="tableData" :row-class-name="tableRowClassName">
        <ElTableColumn prop="name" label="Name">
            <template #default="scope">
                <div style="display: flex;align-items: center;">
                    <a class="linkItem">{{ scope.row.name }}</a>
                    <el-icon :size="18" color="var(--color-text)" style="margin-left: 5px; cursor: pointer;">
                        <QuestionFilled />
                    </el-icon>
                </div>
            </template>
        </ElTableColumn>
        <ElTableColumn prop="date" label="Last Update" width="250">
            <template #default="scope">
                <div style="font-size:16px;display: flex;align-items: center;">
                    <span>{{ scope.row.date }}</span>
                    <span v-if="scope.row.status == 0" class="ok-button">OK</span>
                    <span v-if="scope.row.status == 1" class="sync-button">syncing</span>
                    <span v-if="scope.row.status == 2" class="fail-button">failed</span>
                </div>
            </template>
        </ElTableColumn>
    </ElTable>
</template>

<style>
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

.linkItem {
    font-size: 16px;
}

.el-table thead .cell {
    color: var(--color-text);
    font-weight: 600;
}

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-table .process-row {
    --el-table-tr-bg-color: rgb(227, 255, 253);
}

.el-table__header-wrapper {
    border-bottom: solid 1.5px var(--el-border-color-lighter);
}
</style>