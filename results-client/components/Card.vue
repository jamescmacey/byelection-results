<template>
  <div class="wts-card" :class="{'wts-card-missing': missing, 'wts-card-gradient': gradient}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    missing: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.wts-card {
  margin: 10px 0px;
  padding: 15px 15px;
  background-color: white;
  border-radius: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.wts-card.wts-card-missing {
  background-color: transparent;
  border-radius: 0px;
  border-style: dashed;
  border-color: #d8d8d8;
  box-shadow: none;
}

.wts-card.wts-card-gradient {
  border-radius: 0px;
  background-color: transparent;
  background-image: linear-gradient(90deg, #ffffff36, #ffffff36), linear-gradient(145deg, rgb(52, 148, 148), rgb(88, 120, 127) 100%);
  color: white;
}

.wts-card a.no-format {
  padding: 0;
}
</style>
