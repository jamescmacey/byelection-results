<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-theme1">
    <div class="container-fluid">
      <h1 class="navbar-brand" id="wheretheystand">WhereTheyStand</h1>
      <h4 class="navbar-brand">{{ electionYear }} <span id="election-location-and-type">{{ electionLocationType }}</span></h4>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}

#wheretheystand {
  font-family: "Mulish", "Open Sans", sans-serif;
  font-size: 1.5rem;
}

.navbar-brand {
  padding: 0 30px;
  font-weight: 400;
}

#election-location-and-type {
  font-weight: 600;
}

.navbar-brand .sub {
  font-weight: 400;
  font-size: 50%;
}

.navbar-nav .sub {
  font-weight: 400;
  font-size: 75%;
}

.navbar-toggle {
  margin-top: 23px;
  padding: 9px 10px !important;
}

.navbar-nav>li>a {
  /* (80px - line-height of 27px) / 2 = 26.5px */
  line-height: 27px;
  color: rgba(146, 146, 146, 1);
}
</style>

<script>
export default {
  name: 'Navbar',
  props: ["electionLocationType", "electionYear"]
}
</script>