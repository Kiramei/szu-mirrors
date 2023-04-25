<script setup lang="tsx">
import {
    ElIcon, ElTableV2, ElBreadcrumb, ElBreadcrumbItem,
    ElNotification, TableV2FixedDir, type Column, type TableV2Instance
} from 'element-plus';
import { Loading } from '@element-plus/icons-vue'
import { ref, watch, inject, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, RouterLink } from 'vue-router';
import router from '@/router';

const directory = ref([])
const showList = ref([])
const __route__ = useRoute()
const __loading__ = ref(true)

interface DirInfo {
    name: Array<string>,
    date: string
}

/**
 * routing负责目录的路由
 */

const routing = () => {
    __loading__.value = true
    //axios请求原页面，重新绘制
    axios(
        'mbt.html',
        // __route__.fullPath,
        { timeout: 1000 * 180 }
    ).then(res => {
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
        showList.value = directory.value = hrefs?.map((_e: string, i: number) => {
            let url: string
            //以下生成真实目录名，考虑各种情况
            if (hrefs?.at(i) === '../')
                url = hrefs?.at(i) ?? ''
            else if (__route__.fullPath.endsWith('/'))
                url = __route__.fullPath + hrefs?.at(i)
            else
                url = __route__.fullPath + '/' + hrefs?.at(i)
            return {
                "name": [hrefs?.at(i), url],   //目录名
                "date": dates[i],       //日期
            }
        })
        __loading__.value = false
    }, () => {
        ElNotification({
            title: 'Error',
            message: `${__route__.fullPath} 暂时无法响应，或者是响应超时`,
            type: 'error',
            position: 'bottom-right',
            duration: 5000
        })
        setTimeout(() => {
            const prev = (__route__.fullPath.match(/^(.*\/)[^/]*\/?$/) || ['', '/'])[1]
            router.push(prev)
        }, 1000);
    })
}
//初始化路由
routing()
//监听路由
watch(__route__, () => {
    if (__route__.fullPath !== '/')
        routing()
})
/**
 * 导航栏设置
 */
const routeList = computed(() => {
    let res = __route__.fullPath.split('/').slice(1)
    if (res[res.length - 1] !== '') res.push('')
    res = ['root', ...res]
    let realUrl = ''
    return res.map((e, i) => {
        if (e === 'root') realUrl += '/'
        else if (e != '')
            if (i !== res.length - 2) realUrl += e + '/'
            else realUrl += e
        return {
            "realUrl": realUrl,
            "name": e
        }
    })
})

/**
 * Column 是单元的自定义组件
 */
const columns: Column<any>[] = [
    {
        key: 'name',
        title: 'Name',
        dataKey: 'name',
        width: 640,
        // fixed: TableV2FixedDir.LEFT,
        cellRenderer: ({ cellData: name, }) =>
            <>
                {
                    /* 链接，可单击的实体，需要考虑是文件还是文件夹 */
                    name[0].endsWith('/') ?
                        <RouterLink to={name[1]} class="linkItem" >
                            {name[0]}
                        </RouterLink>
                        :
                        <a href={name[1]} id="dir_item" class="linkItem" download={name[0]}>
                            {name[0]}
                        </a>
                }
                {
                    /* 链接旁边的小问号，暂时不起作用，后续配合help功能使用 */
                    /* false && name != null?
                    <el-icon size={18} color={'var(--color-text)'}
                        style="margin-left: 5px; cursor: pointer;">
                        <QuestionFilled />
                    </el-icon>:<></> */
                }
            </>,
    }, {
        key: 'date',
        title: 'Date',
        dataKey: 'date',
        width: 148,
        fixed: TableV2FixedDir.RIGHT,
        cellRenderer: ({ cellData: date }) => (
            <span class="flex items-center">
                {date}
            </span>
        ),
    }
]

const tableRef = ref<TableV2Instance>()

const tableScroll=()=>{
    console.log(tableRef.value?.scrollToTop(150))
}

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
    setTabelWidth(global.pageWidth.value)
})

/**
 * 使用watch监听窗口大小变化，设置全局窗口大小
 */
watch(global.pageWidth, () => {
    setBoxWidth(global.pageWidth.value)
    setTabelWidth(global.pageWidth.value)
})

const apt = ref(0)

const setTabelWidth = (pw: number) => {
    if (pw >= 1024)
        apt.value = Math.min(pw - 64 - 339.52, 790.39)
    else
        apt.value = pw - 64
    // columns[0].width = pw / 2
}

/**
 * 该方法完成自适应操作，对大于450px的页宽设置250px的盒子宽度
 * 否则设置为185px
 * @param screenWidth 页面宽度，由监听器设定
 */

const setBoxWidth = (screenWidth: number) => {
    if (screenWidth >= 450) boxWidth.value = 250
    else boxWidth.value = 185
}

/**
 * 使用watch监听搜索框数据变化，并且实现搜索功能
 */
watch(global.searchText, () => {
    let sText: string = global.searchText.value
    if (sText.length > 0)
        showList.value = directory.value.filter(
            (e: DirInfo) => e.name[0].indexOf(sText) != -1)
    else
        showList.value = directory.value
})

</script>

<template>
    <div class="nav_bar">
        <span style="min-width: 90px;">当前目录为：</span>
        <ElBreadcrumb separator="/" class="nav_breadcrumb">
            <ElBreadcrumbItem v-for="item in routeList" :to="`${item.realUrl}`" :key="item.name">
                {{ item.name }}
            </ElBreadcrumbItem>
        </ElBreadcrumb>
    </div>
    <el-table-v2 ref="tableRef" :columns="columns" :data="showList" :width="apt" :height="400" @click="tableScroll" fixed>
        <template #overlay v-if="__loading__">
            <div class="el-loading-mask item-center">
                <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                    <Loading />
                </el-icon>
            </div>
        </template>
    </el-table-v2>
</template>

<style>
.nav_bar {
    display: flex;
    margin-left: 12px;
}

.nav_breadcrumb {
    height: 25px;
    line-height: 25px;
    display: flex;
    overflow-y: hidden;
    white-space: nowrap
}

.item-center {
    display: flex;
    align-items: center;
    justify-content: center
}
</style>
