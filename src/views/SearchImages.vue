<template>
  <div class="container search-images">
    <form class=" w-100 p-3 mb-3">
      <div class="input-group">
        <input class="form-control" placeholder="#tag" type="text" v-model="tag">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" @click.prevent="findImages"
                  :disabled="!tag">Search
          </button>
        </div>
      </div>
    </form>
    <b-pagination :per-page="9" :total-rows="this.totalPages"
                  @input="search(page)" class="mt-3 mb-3 d-inline-flex" size="md"
                  v-if="page > 0 && this.totalPages>1"
                  v-model="page"></b-pagination>
    <div v-if="loading" class="spinner-border text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="row mb-4">
      <div class="col-6 col-md-4">
        <ImageCard :image="image" :key="image.id" v-b-modal.previewImageModal
                   v-for="image in images[0]" v-on:imageSelected="showTheModal"/>
      </div>
      <div class="col-6 col-md-4">
        <ImageCard :image="image" :key="image.id" v-b-modal.previewImageModal
                   v-for="image in images[1]" v-on:imageSelected="showTheModal"/>
      </div>
      <div class="col-6 col-md-4">
        <ImageCard :image="image" :key="image.id" v-b-modal.previewImageModal
                   v-for="image in images[2]" v-on:imageSelected="showTheModal"/>
      </div>
    </div>

    <div>

      <b-modal id="previewImageModal" size="xl" :title="image_to_Preview.title" hide-footer>
        <template>
          <img :src="image_to_Preview.url_n">
        </template>
      </b-modal>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';
import ImageCard from '../components/ImageCard.vue';

export default {
  name: 'SearchImages',
  components: {
    ImageCard,
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalPages: 1,
      tag: '',
      image_to_Preview: {
        title: '',
        url_n: '',
      },
      images: [],
    };
  },
  methods: {
    search(thePage) {
      this.loading = true;
      this.fetchImages(thePage)
        .then((response) => {
          this.images[0] = response.data.photos.photo.splice(0, 3);
          this.images[1] = response.data.photos.photo.splice(0, 3);
          this.images[2] = response.data.photos.photo.splice(0, 3);
          this.loading = false;
        });
    },
    fetchImages(thePage) {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.search',
          api_key: config.api_key,
          tags: this.tag,
          extras: 'url_n, owner_name, date_taken, views',
          page: thePage,
          format: 'json',
          per_page: 9,
          nojsoncallback: 1,
        },
      });
    },
    getTotalOfImages() {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.search',
          api_key: config.api_key,
          tags: this.tag,
          format: 'json',
          per_page: 1000,
          nojsoncallback: 1,
        },
      });
    },
    showTheModal(img) {
      this.image_to_Preview = img;
    },
    async findImages(evt) {
      evt.preventDefault();
      try {
        this.page = 1;
        await this.search(this.page);
        await this.getTotalOfImages();
        this.getTotalOfImages()
          .then((response) => {
            this.totalPages = response.data.photos.photo.length;
          });
      } catch (ex) {
        console.log(ex);
      }
    },
  },
};
</script>

<style scoped>
  .spinner-border {
    position: absolute;
    top: 150px;
  }

  .pagination a {
    cursor: pointer;
  }

  .modal-body img {
    width: 100%;
    max-height: 75vh;
    min-height: 50vh;
    object-fit: contain;
  }
</style>
