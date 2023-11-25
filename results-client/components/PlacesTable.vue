<template>
  <Card>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{active: (viewMode == 'map')}" aria-current="Map view" @click="mapView()">Map</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: (viewMode == 'table')}" aria-current="Table view"
          @click="tableView()">Table</a>
      </li>
    </ul>
    <mapbox-map v-if="(uniquePlaces.length > 0)" v-show="viewMode == 'map'"
      accessToken="pk.eyJ1IjoiamFtZXNjbWFjZXkiLCJhIjoiY2xiN2VhYzVqMGE5YTN2bnhuM3l6d3pxbyJ9.CN_c4Tf7wXMtxyLKWrtvJg"
      height="500px" mapStyle="mapbox://styles/jamescmacey/clpdh34om004801ol0sxucb2d"
      :customAttribution="['Representation Commission', 'Stats NZ', 'Electoral Commission']">
      <PlaceMarker @clicked-marker="clickedMarker" v-for="placeId in uniquePlaces" :key="placeId" :placeId="placeId"
        :results="results.voting_place_results" :config="config" :votingPlaces="votingPlaces" type="place">
      </PlaceMarker>


    </mapbox-map>
    <div v-if="(viewMode =='map') && (mapFocusPlaceId != null)" class="pt-4">
      <PlaceEntry :placeId="mapFocusPlaceId" :forceExpand="true"
            :results="results.voting_place_results" :config="config" :votingPlaces="votingPlaces" type="place" :candidates="candidates" :parties="parties" :candidatesSortOrder="candidatesSortOrder">
      </PlaceEntry>
    </div>
    <div v-if="focusPlaceId == null" v-show="viewMode == 'table'" class="mx-0 row">
          <PlaceEntry class="col-xl-6" v-for="placeId in uniquePlaces" :key="placeId" :placeId="placeId"
            :results="results.voting_place_results" :config="config" :votingPlaces="votingPlaces" type="place" :candidates="candidates" :parties="parties" :candidatesSortOrder="candidatesSortOrder">
          </PlaceEntry>
      <div v-if="specialPlaces.length">
          <PlaceEntry class="col-xl-6" v-for="placeId in specialPlaces" :key="placeId" :placeId="placeId"
            :results="results.voting_place_results" :config="config" :votingPlaces="votingPlaces" type="special" :candidates="candidates" :parties="parties" :candidatesSortOrder="candidatesSortOrder">
          </PlaceEntry>
      </div>
    </div>
    <div v-else>
      <!--<VotingPlaceResult :parties="parties" :candidates="candidates" :config="config" :votingPlaces="votingPlaces"
        :results="results.voting_place_results" :focusPlaceId="focusPlaceId"></VotingPlaceResult>-->
      <button @click="focusPlaceId = null" type="button" class="btn btn-theme2 rounded-0">Show all voting places</button>
    </div>
  </Card>
</template>

<style scoped>
#footer-row {
  outline: thin solid;
}
</style>

<script>
import Card from './Card.vue'
import PlaceEntry from './PlaceEntry.vue'
import PlaceMarker from './PlaceMarker.vue'

export default {
  name: 'PlacesTable',
  components: {
    Card,
    PlaceEntry,
    PlaceMarker,
  },
  data() {
    return {
      focusPlaceId: null,
      viewMode: "map",
      mapFocusPlaceId: null,
    }
  },
  props: {
    votingPlaces: {
      type: Array
    },
    results: {
      type: Object,
    },
    config: {
      type: Object
    },
    uniquePlaces: {
      type: Array
    },
    specialPlaces: {
      type: Array
    },
    parties: {
      type: Array
    },
    candidates: {
      type: Array
    },
    candidatesSortOrder: {
      type: Array
    }
  },
  computed: {
    totalValidVotes() {
      var totalCast = this.results.total_votes_cast
      var informals = this.results.total_candidate_informals
      return (totalCast - informals)
    }
  },
  methods: {
    viewPlace(place) {
      this.focusPlaceId = place
    },
    mapView() {
      this.viewMode = "map"
    },
    tableView() {
      this.viewMode = "table"
    },
    clickedMarker(place) {
      this.mapFocusPlaceId = place
    }
  }
}
</script>

<style scoped>

</style>
