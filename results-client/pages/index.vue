<template>

  <div id="parent-container" class="container-fluid min-vh-100 d-flex flex-column p-0">
    <div v-if="(electionStarted && staticsLoaded && resultsLoaded && isAlive)">
      <Navbar :electionYear="electionYear" :electionLocationType="electionLocationType"></Navbar>
      <div class="container-fluid px-3 px-lg-5 pb-5 pt-1 pt-lg-3" >
        <div class="row">
          <div class="col-12 col-xl-4">
            <Card class="col-12">
              <h4>Count progress</h4>
              <div class="progress rounded-0">
                <div class="progress-bar rounded-0" role="progressbar" :style="progressBarStyle" :aria-valuenow="results.percent_voting_places_counted" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              {{ results.total_voting_places_counted }} voting places counted ({{ results.percent_voting_places_counted }}%)
            </Card>
            <CandidateTable class="col-12" :candidates="candidates" :parties="parties" :results="results" :config="config"></CandidateTable>
          </div>
          <div class="col-12 col-xl-8">
            <PlacesTable class="col-12" :candidatesSortOrder="candidatesSortOrder" :config="config" :results="results" :votingPlaces="votingPlaces" :uniquePlaces="uniquePlaces" :specialPlaces="specialPlaces" :candidates="candidates" :parties="parties">

            </PlacesTable>
            <Card class="col-12 d-lg-none d-xl-none d-md-none text-center">
              <a class="footer-link" href="https://wheretheystand.nz/" target="_blank"><h3 id="footer-logo" class="text-center">WhereTheyStand</h3></a> 
              <a class="" href="https://wheretheystand.nz/docs/wheretheystand-election-results-privacy-and-terms/">Privacy and Terms</a>
              <p>Last updated {{ lastUpdatedText }}</p>
            </Card>
          </div>
        </div>

        <div class="navbar fixed-bottom navbar-light bg-light d-none d-lg-flex d-xl-flex d-md-flex">
          <div class="container-fluid">
            <a target="_blank" href="https://wheretheystand.nz/" class="navbar-brand text-theme1 pe-3 border-end border-primary border-1">WhereTheyStand</a>
            <ul class="nav me-auto">
              <li class="nav-item">
                <a class="nav-link" target="_blank" href="https://wheretheystand.nz/terms">Privacy and Terms</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" target="_blank" href="#">Last updated {{ lastUpdatedText }}</a>
              </li>
            </ul>
            <span class="navbar-brand text-dark border-start ps-3 border-dark border-1">
              {{ clock }}
            </span>
          </div>
        </div>
      </div>
    </div>




    <div class="container p-5" v-else>
      <LoadingPage :electionName="electionName" :remainingTime="remainingTime" :electionStarted="electionStarted" :lastCheckedIsAliveText="lastCheckedIsAliveText" :isAlive="isAlive"></LoadingPage>
    </div>
   
    
    <div class="text-dark text-center" id="footer" v-if="(!staticsLoaded || !resultsLoaded)">
      <div id="footer-name" class="col-12 mb-3">
        <a class="footer-link" href="https://wheretheystand.nz/" target="_blank"><h3 id="footer-logo" class="text-center">WhereTheyStand</h3></a> 
        <a class="footer-link" href="https://wheretheystand.nz/terms">Privacy and Terms</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer-name {
  position : absolute;
  bottom   : 0;
}

#footer-logo, .navbar-brand {
  font-family: 'Mulish', 'sans-serif';
}

.footer-link, .footer-link:link, .footer-link:hover {
  color: inherit;
  text-decoration: inherit;
}

#parent-container {
  /*background: linear-gradient(230deg, #58787f 0%, rgb(52, 148, 148) 50%); background-size: cover;*/
  background-color: rgb(238, 234, 224);
}

</style>

<script>
import Card from '../components/Card.vue'
import moment from 'moment-timezone';
import CandidateTable from '../components/CandidateTable.vue'
import PlacesTable from '../components/PlacesTable.vue'
import LoadingPage from '../components/LoadingPage.vue'

export default {
  head: {
    title: "Port Waikato by-election results — WhereTheyStand",
    meta: [
      {name: "twitter:image", content: "https://storage.googleapis.com/wheretheystand-nz/elections/cards/by2023_results.png"},
      {name: "twitter:card", content: "summary_large_image"},
      {name: "twitter:image:alt", content: "WhereTheyStand"},
      {name: "twitter:title", content: "Election results — WhereTheyStand"},
      {name: "twitter.description", content: "See Port Waikato by-election results as they become available."},
      {name: "og:image:alt", content: "WhereTheyStand"},
      {name: "og:site_name", content: "WhereTheyStand"},
      {name: "og:locale", content: "en_NZ"},
      {name: "og:title", content: "WhereTheyStand"},
      {name: "og:image", content: "https://storage.googleapis.com/wheretheystand-nz/elections/cards/by2023_results.png"},
      {name: "og:description", content: "See Port Waikato by-election results as they become available."},
      {charset: "utf-8"},
      {name: "theme-color", content: "#58787f"}
    ],
    link: [
      {rel: "apple-touch-icon", sizes: "180x180", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/apple-touch-icon.png"},
      {rel: "icon", type:"image/png", sizes: "32x32", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/favicon-32x32.png"},
      {rel: "icon", type:"image/png", sizes: "16x16", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/favicon-16x16.png"},
      {rel: "manifest", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/site.webmanifest"},
      {rel: "mask-icon", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/safari-pinned-tab.svg"},
      {rel: "shortcut icon", href: "https://storage.googleapis.com/wheretheystand-nz/nzpm_app/favicons/favicon.ico"},
    ]
  },
  components: {
    Card,
    CandidateTable,
    PlacesTable,
    LoadingPage
  },
  data() {
    return {
      electionStarted: false,
      goLive: moment("2023-11-24T19:00:00+13:00"),
      remainingTime: "--h --m --s",
      countdownInterval: null,
      refreshInterval: null,
      staticsLoaded: false,
      resultsLoaded: false,
      loadingIncrement: 0,
      refreshIntervalTimeMilliseconds: 20000,
      results: {},
      election: {},
      tickerActive: false,
      ticker: {},
      clock: "--:--",
      candidates: [],
      parties: [],
      electorates: [],
      votingPlaces: [],
      statistics: {},
      config: {},
      lastUpdatedTime: moment(),
      lastUpdatedText: "never",
      electionName: "2023 Port Waikato by-election",
      electionYear: "2023",
      electionLocationType: "Port Waikato by-election",
      candidatesSortOrder: [],
      isAlive: true,
      lastCheckedIsAlive: moment(),
      lastCheckedIsAliveText: "never"
    }
  },
  computed: {
    progressBarStyle () {
      return ("width: " + this.results.percent_voting_places_counted + "%")
    },
    uniquePlaces () {
      var places = []
      this.results.voting_place_results.forEach(vp => {
        if((places.indexOf(vp.id) < 0) && (vp.voting_place_id < 400)) {
          places.push(vp.id)
        }
      });
      return places
    },
    specialPlaces () {
      var places = []
      this.results.voting_place_results.forEach(vp => {
        if((places.indexOf(vp.id) < 0) && (vp.voting_place_id >= 400)) {
          places.push(vp.id)
        }
      });
      return places
    },
  },
  mounted() {
    var secs =  this.goLive.diff(moment().tz("Pacific/Auckland"), 'seconds')
    if(secs > 0) {
      this.countdownInterval = setInterval(function () {
        var secs =  this.goLive.diff(moment().tz("Pacific/Auckland"), 'seconds')
        if (secs >= 216000) {
          this.remainingTime = moment.utc(secs*1000).format('DD[d] HH[h] mm[m] ss[s]');
        } else {
          this.remainingTime = moment.utc(secs*1000).format('HH[h] mm[m] ss[s]');
        }

        if (secs <= 0) {
          this.electionStarted = true;
          this.startRefreshInterval()
          clearInterval(this.countdownInterval);
        }
      }.bind(this), 1000);
    } else {
      this.electionStarted = true;
      this.startRefreshInterval();
    }
  },
  methods: {
    startRefreshInterval () {
      this.getIsAlive();
      if (this.isAlive == true) {
          this.getStatics();
          this.getResults();
      } else {
        this.isAliveInterval = setInterval(function () {
              this.getIsAlive();
              if (this.isAlive == true) {
                clearInterval(this.isAliveInterval);
                this.getStatics();
                this.getResults();
              }
        }.bind(this), 10000);
      }

      this.refreshInterval = setInterval(function () {
        if (this.isAlive) {
          this.getStatics();
          this.getResults();
        }
      }.bind(this), this.refreshIntervalTimeMilliseconds)

      setInterval(function () {
        this.clock = moment().tz("Pacific/Auckland").format("HH:mm")

        var secs =  moment().tz("Pacific/Auckland").diff(this.lastUpdatedTime, 'seconds')

        if (secs == 1) {
          this.lastUpdatedText = "1 second ago"
        } else if (secs == 0) {
          this.lastUpdatedText = "now"
        } else {
          this.lastUpdatedText = secs + " seconds ago"
        }

        secs =  moment().tz("Pacific/Auckland").diff(this.lastCheckedIsAlive, 'seconds')

        if (secs == 1) {
          this.lastCheckedIsAliveText = "1 second ago"
        } else if (secs == 0) {
          this.lastCheckedIsAliveText = "now"
        } else {
          this.lastCheckedIsAliveText = secs + " seconds ago"
        }
        
      }.bind(this), 1000)
    },
    async getIsAlive () {
      if (!this.isAlive) {
        var data = await $fetch('https://api.election.wheretheystand.nz/legacy/hamilton/is-alive/')
        this.lastCheckedIsAlive = moment().tz("Pacific/Auckland")
        if (data.is_alive == true) {
          this.isAlive = true
        } 
      }        
    },
    async getStatics () {
      this.loadingIncrement = this.loadingIncrement + 1;
      var data = await $fetch('https://api.election.wheretheystand.nz/legacy/hamilton/config-data/')
      this.candidates = data.candidates
      this.parties = data.parties
      this.electorates = data.electorates
      this.votingPlaces = data.voting_places
      this.statistics = data.statistics
      this.config = data.config

      this.staticsLoaded = true;
      this.loadingIncrement = this.loadingIncrement - 1;
    }, 
    async getResults () {
      this.loadingIncrement = this.loadingIncrement + 1;
      var data = await $fetch('https://api.election.wheretheystand.nz/legacy/hamilton/results/')
      this.election = data.election
      this.results = data.results[0]
      this.results.candidate_votes.sort((a, b) => { 
        if (a.votes < b.votes) {
          return 1
        } else if (b.votes < a.votes) {
          return -1
        } else {
          return 0
        }
        })
      var newCandidatesSortOrder = []
      this.results.candidate_votes.map(x => newCandidatesSortOrder.push(x.id))
      this.candidatesSortOrder = newCandidatesSortOrder
      this.resultsLoaded = true;
      this.lastUpdatedTime = moment().tz("Pacific/Auckland")
      this.loadingIncrement = this.loadingIncrement - 1;
    }
  }
}
</script>
