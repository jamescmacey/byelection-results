<template>
  <tr>
    <td><strong>{{ displayName }}</strong></td> 
    <td v-if="type == 'place'">
      <span v-if="electionDayResults && electionDayResults.total_issued_ballot_papers > 0">
        <button @click="$emit('view-place',electionDayResults.voting_place_id)" class="btn btn-theme2 btn-sm rounded-0">View results</button>
      </span>
      <span v-else-if="electionDayResults && electionDayResults.total_issued_ballot_papers == 0">-</span>
      <span v-else-if="electionDayResults == null">-</span>
    </td> 
    <td v-if="type == 'place'">
      <span v-if="advanceVotingResults && advanceVotingResults.total_issued_ballot_papers > 0">
        <button @click="$emit('view-place',advanceVotingResults.voting_place_id)" class="btn btn-theme2 btn-sm rounded-0">View results</button>
      </span>
      <span v-else-if="advanceVotingResults && advanceVotingResults.total_issued_ballot_papers == 0">-</span>
      <span v-else-if="advanceVotingResults == null">-</span>
    </td> 
    <td v-if="type == 'place'">
      <span v-if="mobileResults && mobileResults.total_issued_ballot_papers > 0">
        <button @click="$emit('view-place',mobileResults.voting_place_id)" class="btn btn-theme2 btn-sm rounded-0">View results</button>
      </span>
      <span v-else-if="mobileResults && mobileResults.total_issued_ballot_papers == 0">-</span>
      <span v-else-if="mobileResults == null">-</span>
    </td> 
    <td v-if="type == 'special'">
      <span v-if="specialResults && specialResults.total_issued_ballot_papers > 0">
        <button @click="$emit('view-place',specialResults.voting_place_id)" class="btn btn-theme2 btn-sm rounded-0">View results</button>
      </span>
      <span v-else-if="specialResults && specialResults.total_issued_ballot_papers == 0">-</span>
      <span v-else-if="specialResults == null">-</span>
    </td>
  </tr>
</template>

<style scoped>
.btn-sm {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

<script>

export default {
  name: 'PlaceEntry',
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
