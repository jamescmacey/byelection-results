<template>
  <div class="container-fluid min-vh-100 d-flex flex-column p-0" :style="backgroundStyle">
    <div class="container">
       <div class="row justify-content-md-center">
      <Card class="col-md-5 col-12 text-center mt-5">
        <h2>2022 Tauranga by-election</h2>
        <hr>
        <div class="col-12 text-start">
          <h5>Election results will be available here from 7pm NZST.</h5>
          <p>You can also view official election results at <a target="_blank" href="https://electionresults.govt.nz">electionresults.govt.nz</a>, but you'll need to keep refreshing the page for these to show. Election results on this website are provided by the Electoral Commission through their official feed, and may be subject to a slight delay; but you won't need to keep refreshing this page to update results.</p>
          <p>The Electoral Commission's targets for the release of preliminary results are:
            <ul>
              <li>
                Results from 50 per cent of voting places by 9pm NZST
              </li>
              <li>
                Results from 95 per cent of voting places by 10.30pm NZST
              </li>
            </ul>
          </p>
        </div>

      </Card>
    </div>
    </div>
   
    
    <div class="flex-grow-1 text-light text-center" id="footer">
      <div id="footer-name" class="col-12 mb-3">
        <a class="footer-link" href="https://wheretheystand.nz/" target="_blank"><h3 id="footer-logo" class="text-center">WhereTheyStand</h3></a> 
        <a class="footer-link">Privacy and Terms for election.wheretheystand.nz</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer-name {
  position : absolute;
  bottom   : 0;
}

#footer-logo {
  font-family: 'Mulish', 'sans-serif';
}

.footer-link, .footer-link:link, .footer-link:hover {
  color: inherit;
  text-decoration: inherit;
}

</style>

<script>
import Card from '../components/Card.vue'

export default {
  components: {
    Card
  },
  data() {
    return {
      electionStarted: false
    }
  },
  computed: {
    backgroundStyle() {
      if (this.electionStarted) {
        return "background-color: white;"
      } else {
        return "background: linear-gradient(230deg, #58787f 0%, rgb(52, 148, 148) 50%); background-size: cover;"
      }
    }
  },
  mounted() {
    setInterval
  }
}
</script>
