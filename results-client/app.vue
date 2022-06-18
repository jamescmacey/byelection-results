<template>
    <NuxtPage />
</template>

<style>
body {
  background-color: #58787f;
}

</style>

<script>
export default {
  head() {
    return {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
        },
      ]
    }
  }
}
</script>
