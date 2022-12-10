<template>
  <mapbox-marker @click="$emit('clicked-marker',placeId)" v-if="displayMarker"
    :lngLat="latLong"
    :color="markerColour">
  </mapbox-marker>
</template>

<style scoped>
.btn-sm {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

<script>

export default {
  name: 'PlaceMarker',
  emits: ['clicked-marker'],
  props: {
    config: {
      type: Object,
    },
    results: {
      type: Array,
    },
    votingPlaces: {
      type: Array
    },
    placeId: {
      type: Number
    },
    type: {
      type: String,
      default: "place"
    }
  },
  computed: {
    displayName() {
      var filtered = this.votingPlaces.filter(c => c.id == this.placeId)
      if (filtered.length == 0) {
        return this.place.id
      } else {
        return filtered[0].address.split(",")[0]
      }
    },
    displayMarker() {
      var filtered = this.votingPlaces.filter(c => c.id == this.placeId)
      if (filtered.length == 0) {
        return false
      } else {
        if (filtered[0].latitude != null && filtered[0].longitude != null) {
          return true
        }
        else {
          return false
        }
      }
    },
    latLong() {
      var filtered = this.votingPlaces.filter(c => c.id == this.placeId)
      if (filtered.length == 0) {
        return [0,0]
      } else {
        if (filtered[0].latitude != null && filtered[0].longitude != null) {
          return [filtered[0].longitude, filtered[0].latitude]
        }
        else {
          return [0,0]
        }
      }
    },
    markerColour() {
      var openModes = 0
      var countedModes = 0

      if (this.electionDayResults) {
        openModes++
      }
      if (this.mobileResults) {
        openModes++
      }
      if (this.advanceVotingResults) {
        openModes++
      }
      if (this.specialResults) {
        openModes++
      }

      if (this.electionDayResults && this.electionDayResults.total_issued_ballot_papers) {
        countedModes++
      }
      if (this.mobileResults && this.mobileResults.total_issued_ballot_papers) {
        countedModes++
      }
      if (this.advanceVotingResults && this.advanceVotingResults.total_issued_ballot_papers) {
        countedModes++
      }
      if (this.specialResults && this.specialResults.total_issued_ballot_papers) {
        countedModes++
      }

      if (openModes == 0) {
        return "#adb5bd"
      } else if (openModes == countedModes) {
        return "#198754"
      } else if (countedModes == 0) {
        /*return "#dc3545"*/
        return "#adb5bd"
      } else {
        return "#fd7e14"
      }
    },
    electionDayResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId && c.voting_place_id < 100))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    advanceVotingResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId && c.voting_place_id < 300 && c.voting_place_id >= 200))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    mobileResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId && c.voting_place_id < 400 && c.voting_place_id >= 300))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    specialResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId && c.voting_place_id < 500 && c.voting_place_id >= 400))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
  }
}
</script>

<style scoped>

</style>
