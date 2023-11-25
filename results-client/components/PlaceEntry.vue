<template>
  <div class="col-12 pt-2 place-entry">
    <div @click="toggleIfAllowed()" :class="{'clickable-region':(countingStatusOverall != 'none' && !forceExpand)}">
      <h5 class="col-12">
        <FontAwesomeIcon v-if="countingStatusOverall == 'none'" class="status-circle status-none me-2"
          title="No votes counted" :icon="['far', 'circle']">
        </FontAwesomeIcon>
        <FontAwesomeIcon v-if="countingStatusOverall == 'partial'" class="status-circle status-partial me-2"
          title="Partially counted" :icon="['fas', 'circle-half-stroke']">
        </FontAwesomeIcon>
        <FontAwesomeIcon v-if="countingStatusOverall == 'complete'" class="status-circle status-complete me-2"
          title="All ordinary votes counted" :icon="['fas', 'circle-check']">
        </FontAwesomeIcon>

        <strong>{{ displayName }}</strong> 
        
        <FontAwesomeIcon v-if="(countingStatusOverall != 'none') && (!forceExpand) && (isExpanded)" class="ms-3 chevron text-muted"
          title="Collapse table" :icon="['fas', 'chevron-up']">
        </FontAwesomeIcon> 
        <FontAwesomeIcon v-if="(countingStatusOverall != 'none') && (!forceExpand) && (!isExpanded)" class="ms-3 chevron text-muted"
          title="Show table" :icon="['fas', 'chevron-down']">
        </FontAwesomeIcon>
      </h5>
      <div class="col-12">
        <span class="text-muted me-3 status" v-if="electionDayResults">
          <FontAwesomeIcon v-if="electionDayResults.total_issued_ballot_papers > 0" title="Counted"
            :icon="['fas', 'check']"></FontAwesomeIcon>
          <FontAwesomeIcon v-else title="Counting" :icon="['fas', 'hourglass']"></FontAwesomeIcon>
          Results
        </span>
        <span class="text-muted me-3 status" v-if="advanceVotingResults">
          <FontAwesomeIcon v-if="advanceVotingResults.total_issued_ballot_papers > 0" title="Counted"
            :icon="['fas', 'check']"></FontAwesomeIcon>
          <FontAwesomeIcon v-else title="Counting" :icon="['fas', 'hourglass']"></FontAwesomeIcon>
          Results (set B)
        </span>
        <div class="text-muted me-3 status" v-if="mobileResults">
          <FontAwesomeIcon v-if="mobileResults.total_issued_ballot_papers > 0" title="Counted" :icon="['fas', 'check']">
          </FontAwesomeIcon>
          <FontAwesomeIcon v-else title="Counting" :icon="['fas', 'hourglass']"></FontAwesomeIcon>
          Results (set C)
        </div>
        <div class="text-muted me-3 status" v-if="specialResults">
          <FontAwesomeIcon v-if="specialResults.total_issued_ballot_papers > 0" title="Counted"
            :icon="['fas', 'check']">
          </FontAwesomeIcon>
          <FontAwesomeIcon v-else title="Counting" :icon="['fas', 'hourglass']"></FontAwesomeIcon>
          Results (set D)
        </div>
      </div>
    </div>

    <hr v-if="!hideHr">

    <VotingPlaceResult v-if="((countingStatusOverall != 'none') && isExpanded) || ((countingStatusOverall != 'none') && forceExpand)" :parties="parties"
      :candidates="candidates" :config="config" :votingPlaces="votingPlaces" :results="results"
      :focusPlaceId="this.placeId" :candidatesSortOrder="candidatesSortOrder"></VotingPlaceResult>


  </div>
</template>

<style scoped>
.place-entry:hover {
  background-color: var(--bs-light);
}

.status-circle {
  size: 0.6em;
}

.status-complete {
  color: var(--bs-green)
}

.status-partial {
  color: var(--bs-orange)
}

.status-none {
  color: var(--bs-gray)
}

.chevron {
  font-size: 0.8em;
}

.btn-sm {
  padding-top: 0px;
  padding-bottom: 0px;
}

.fa-check {
  color: var(--bs-green);
}

.svg-inline--fa {
  display: inline;
}

.clickable-region {
  cursor: pointer;
}
</style>

<script>
import VotingPlaceResult from './VotingPlaceResult.vue'


export default {
  name: 'PlaceEntry',
  components: [VotingPlaceResult],
  emits: ['view-place'],
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
    },
    candidates: {
      type: Object
    },
    parties: {
      type: Object
    },
    candidatesSortOrder: {
      type: Array
    },
    hideHr: {
      type: Boolean,
      default: false
    },
    forceExpand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleIfAllowed() {
      if ((this.countingStatusOverall != 'none') && !this.forceExpand) {
        this.isExpanded = !this.isExpanded
      }
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
    electionDayResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    advanceVotingResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId))
      if ((filtered.length) > 1) {
        return filtered[1]
      } else {
        return null
      }
    },
    mobileResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId))
      if ((filtered.length) > 2) {
        return filtered[2]
      } else {
        return null
      }
    },
    specialResults() {
      var filtered = this.results.filter(c => (c.id == this.placeId))
      if ((filtered.length) > 3) {
        return filtered[3]
      } else {
        return null
      }
    },
    hasResults() {
      if (this.electionDayResults && (this.electionDayResults.total_issued_ballot_papers > 0)) {
        return true
      } else if (this.advanceVotingResults && (this.advanceVotingResults.total_issued_ballot_papers > 0)) {
        return true
      } else if (this.mobileResults && (this.mobileResults.total_issued_ballot_papers > 0)) {
        return true
      } else if (this.specialResults && (this.specialResults.total_issued_ballot_papers > 0)) {
        return true
      }
      return false
    },
    countingStatusOverall() {
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
        return "none"
      } else if (openModes == countedModes) {
        return "complete"
      } else if (countedModes == 0) {
        return "none"
      } else {
        return "partial"
      }
    },
  }
}
</script>

<style scoped>

</style>
