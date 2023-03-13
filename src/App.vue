<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'element-plus/dist/index.css'
import { onMounted, inject } from 'vue';
import { ElIcon } from 'element-plus';
import { Message } from '@element-plus/icons-vue'
import GithubIcon from './components/icon/GithubIcon.vue';
import OtherIcon from './components/icon/OtherIcon.vue';
import SinaIcon from './components/icon/SinaIcon.vue';

const global: any = inject('global')

onMounted(() => {
  global.pageWidth.value = document.body.clientWidth
  onresize = () => {
    global.pageWidth.value = document.body.clientWidth
  }
})

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <div class="app">
    <RouterView />
  </div>
  <div class="footer">
    <div class="description">
      本站由深大电协支持创办，由深大电协运行维护。
      <br />
      <br />
      深大电协，全名深圳大学电子协会，是由深圳大学热爱电子技术及计算机软件技术的极客组成的学生技术社团。
      <br />
      <br />
      本站相关源码可在(镜像管理器)和(镜像站网页)获取。
      <br />
      <br />
      根据相关法律法规，本站不对XXX提供服务。
    </div>
    <div class="centerBottom">
      <div class="contactBottom">
        <div class="title">Contact Us</div>
        <div class="centerList">
          <ul>
            <li>
              <ElIcon style="top: 2px;">
                <Message />
              </ElIcon>
              <span>&nbsp;Mailing&nbsp;List</span>
            </li>
            <li>
              <ElIcon style="top: 2px;">
                <OtherIcon />
              </ElIcon>
              <span>&nbsp;#SZUEA&nbsp;at&nbsp;WeChat</span>
            </li>
            <li>
              <ElIcon style="top: 2px;">
                <GithubIcon />
              </ElIcon>
              <span> Github</span>
            </li>
            <li>
              <ElIcon style="top: 2px;">
                <SinaIcon />
              </ElIcon>
              <span> 新浪微博</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="sponsorBottom">
        <div class="title">Sponsor</div>
        <div class="psg">
          暂无赞助
        </div>
      </div>
    </div>
    <div class="rightLogo">
      <img src="@/assets/logo.png" alt="">
    </div>
  </div>
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
    width: 100px;
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
    margin-left: 50px;
  }

  .rightLogo img {
    width: 100px;
    height: 100px;
  }

  .centerBottom {
    width: 50%;
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
  padding: 1rem 2rem 2rem 2rem;
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
</style>
