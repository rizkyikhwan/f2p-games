<template>
  <main class="detail-news" :class="{ 'dark-mode' : darkMode }">
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent p-0">
          <li class="breadcrumb-item">
            <router-link :to="{name: 'Home'}" class="link" :class="{ 'dark-mode' : darkMode }">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{name: 'News'}" class="link" :class="{ 'dark-mode' : darkMode }">News</router-link>
          </li>
          <li class="breadcrumb-item active font-weight-bolder">{{ news.title }}</li>
        </ol>
      </nav>
      <h3 class="title">{{ news.title }}</h3>
      <h5 class="text-muted">{{ news.short_description }}</h5>
      <div class="row">
        <div class="col-md-8 mb-3">
          <div class="flex-column justify-content-center">
            <img
              :src="news.main_image"
              :alt="news.title"
              class="img-fluid rounded shadow"
            />
            <div class="article-content" v-html="news.article_content"></div>
            <span class="font-weight-bolder">
              <a 
                :href="news.article_url" 
                class="link source-link" 
                :class="{ 'dark-mode' : darkMode }"
                target="__blank"
              >
                Source Article <font-awesome-icon :icon="['fas', 'link']"></font-awesome-icon>
              </a>
            </span>
          </div>
        </div>
        <div class="col-md-4 d-none d-md-block">
          <SideList :darkMode="darkMode" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SideList from "@/section/News/SideList.vue";

export default {
  props: ["darkMode"],
  components: {
    SideList,
  },
  mounted() {
    // Embed script twitter
    const embeddedTwitter = document.createElement("script");
    embeddedTwitter.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.body.appendChild(embeddedTwitter);

    // Remove thumbnail
    const imgThumb = document.querySelector("p > img")
    if (imgThumb) {
      imgThumb.remove();
    }

    // add class to yt
    const iframe = document.querySelectorAll("p > iframe");
    for (let i = 0; i < iframe.length; i++) {
      if (iframe) {
        iframe[i].classList.add("container-fluid", "mb-4");
      }
    }

  },
  computed: {
    news() {
      return this.$store.state.news;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.detail-news {
  padding-top: 50px;
  transition: 0.2s ease-in-out;

  &.dark-mode {
    color: $grayLight;
  }

  .title {
    font-family: "Saira", sans-serif;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .article-content {
    text-align: justify;
  }
}

.active {
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.source-link:hover {
  text-decoration: underline;
}
</style>
