<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'element-plus/dist/index.css'
import { onMounted, inject } from 'vue';
import { ElIcon, ElScrollbar } from 'element-plus';
import { Message } from '@element-plus/icons-vue'
import GithubIcon from './components/icon/GithubIcon.vue';
import OtherIcon from './components/icon/OtherIcon.vue';

const global: any = inject('global')

onMounted(() => {
  global.pageWidth.value = document.body.clientWidth
  onresize = () => {
    global.pageWidth.value = document.body.clientWidth
  }
})

</script>

<template>
  <ElScrollbar height="100vh">
    <div class="app">
      <RouterView />
    </div>
    <div class="footer">
      <div class="description">
        本站由深圳大学信息中心支持创办，由深圳大学网络安全协会运行维护，致力为高校师生于提供高速的开源软件镜像
        <br />
        本镜像站正处于试运行阶段，如存在Bug请及时反馈
        <br />
        前端：<a href="https://kiramei.cn/">Kiramei</a> 后端/技术：<a href="https://www.hz2016.com">HydroegnE7</a>
        <br />
      </div>
      <div class="centerBottom">
        <div class="contactBottom">
          <div class="centerList">
            <div class="title">Contact Us</div>
            <ul>
              <li>
                <a to="#">
                  <ElIcon style="top: 2px;">
                    <Message />
                  </ElIcon>
                  <span>&nbsp;Mailing&nbsp;List</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ElIcon style="top: 2px;">
                    <GithubIcon />
                  </ElIcon>
                  <span> Github</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ElIcon style="top: 2px;">
                    <OtherIcon />
                  </ElIcon>
                  <span>&nbsp;沧海校区L3-1001</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="sponsorBottom"> <div class="title">Sponsor</div> <div class="psg"> 暂无赞助 </div> </div> -->
      </div>
      <div class="rightLogo">
        <img src="@/assets/szu-logo.png" alt="">
        <img src="@/assets/aurora-logo.png" alt="">
      </div>
    </div>
  </ElScrollbar>
</template>

<style scoped>
@media screen and (max-width:1024px) {
  .footer {
    display: flex;
    width: 100%;
    padding: 80px 5%;
    color: #bfc9d3;
    text-align: center;
    background-color: #384452;
    flex-direction: column;
  }

  .centerList {
    justify-content: center;
    display: flex;
  }

  .footer .description {
    width: 100%;
  }

  .rightLogo {
    margin-top: 40px;
  }

  .rightLogo img {
    height: 100px;
  }

  .contactBottom ul {
    width: 160px;
    text-align: left;
    list-style: none;
  }

  .centerBottom {
    width: 100%;
  }

  .contactBottom {
    margin-top: 50px;
  }

  .sponsorBottom {
    margin-top: 40px;
  }

  .contactBottom .title {
    font-size: 20px;
    font-weight: bold;
    color: #f1f1f1;
  }

  .sponsorBottom .title {
    font-size: 20px;
    font-weight: bold;
    color: #f1f1f1;
  }

  .sponsorBottom .psg {
    word-wrap: break-word;

  }
}

@media screen and (min-width:1024px) {
  .footer {
    display: flex;
    width: 100%;
    padding: 80px 150px;
    color: #bfc9d3;
    background-color: #384452;
    flex-direction: row;
    justify-content: center;
  }

  .rightLogo {
    margin-left: 0px;
  }

  .rightLogo img {
    height: 100px;
  }

  .centerBottom {
    width: 35%;
    max-width: 450px;
  }

  .contactBottom {
    margin-left: 40px;
    margin-top: -20px;
  }

  .sponsorBottom {
    margin-left: 40px;
  }

  .contactBottom .title {
    font-size: 20px;
    font-weight: bold;
    color: #f1f1f1;
  }

  .sponsorBottom .title {
    font-size: 20px;
    font-weight: bold;
    color: #f1f1f1;
  }

  .sponsorBottom .psg {
    word-wrap: break-word;

  }

  .footer .description {
    width: 400px;
  }
}


.footer ul {
  padding-inline-start: 15px;
}

.app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  overflow-x: hidden;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.centerList ul li a {
  color: #bfc9d3;
}
</style>
