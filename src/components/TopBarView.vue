<script setup lang="ts">
import { ref, watch, inject, onMounted } from 'vue'
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { Expand } from '@element-plus/icons-vue';
// 全局注入
const titleText = ref('深大开源镜像')
const global: any = inject('global')
/**
 * 根据页宽设置初始站名
 */
onMounted(() => {
    setTitleText(global.pageWidth.value)
})
/**
 * 监听页宽变化
 */
watch(global.pageWidth, () => {
    setTitleText(global.pageWidth.value)
})
/**
 * 设置页宽
 */
const setTitleText = (screenWidth: number) => {
    if (screenWidth > 420) titleText.value = '深圳大学开源镜像站'
    else titleText.value = '深大开源镜像'
}
</script>


<template>
    <a href="./" class="page-title-block">
        <img src="@/assets/szu-logo.png" width="40px" height="40px" alt="">
        <div class="page-title">
            {{ titleText }}
        </div>
    </a>
    <div class="flex-grow"></div>
    <div class="menu-top">
        <!--div class="menu-item">EVENTS</div-->
        <div class="menu-item menu-active">MIRRORS</div>
    </div>
    <div class="menu-button">
        <ElDropdown>
            <ElButton>
                <ElIcon size="20">
                    <Expand />
                </ElIcon>
            </ElButton>
            <template #dropdown>
                <ElDropdownMenu>
                    <ElDropdownItem>Events</ElDropdownItem>
                    <ElDropdownItem>Mirrors</ElDropdownItem>
                </ElDropdownMenu>
            </template>
        </ElDropdown>
    </div>
</template>

<style>
.page-title-block {
    display: flex;
    user-select: none;
    cursor: pointer;
}

.page-title {
    margin-left: 10px;
    font-weight: bold;
    font-size: 22px;
}

.menu-item {
    cursor: pointer;
    user-select: none;
    font-size: 13px;
    font-weight: 500;
    padding: 0px 20px 18px 20px;
    transition: 0.3s ease;
}



.menu-active {
    color: var(--color-text);
    border-bottom: 2px solid var(--color-text);
}

.menu-item:hover {
    opacity: 0.7;
}


@media screen and (min-width: 600px) {
    .menu-top {
        display: flex;
    }

    .menu-button {
        display: none;
    }
}

@media screen and (max-width: 600px) {
    .menu-top {
        display: none;
    }

    .menu-button {
        display: block;
    }
}


@media screen and (min-width:1024px) {
    .listContainer {
        width: 65%;
    }

    .container {
        display: flex;
    }

    .newsContainer {
        width: 30%;
        margin: 10px 30px;
    }
}

@media screen and (max-width:1024px) {
    .newsContainer,
    .downloadContainer,
    .domainContainer,
    .contactContainer,
    .relatedContainer,
    .friendContainer {
        display: none;
    }
}
</style>