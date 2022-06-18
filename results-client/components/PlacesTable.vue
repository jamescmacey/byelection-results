<template>
  <Card>
    <div v-if="focusPlaceId == null" class="table-responsive">
    <table id="places-table" class="table table-sm table-hover table-responsive">
        <thead>
            <tr>
                <th>
                    <h4>Voting places</h4>
                </th>
                <th>
                    Election day results
                </th>
                <th>
                    Advance results
                </th>
                <th>
                    Mobile results
                </th>
            </tr>
        </thead>
        <tbody>
             <PlaceEntry @view-place="viewPlace" v-for="placeId in uniquePlaces" :key="placeId" :placeId="placeId" :results="results.voting_place_results" :config="config" :votingPlaces="votingPlaces">
            </PlaceEntry>
        </tbody>
    </table>
    </div>
    <div v-else>
        <VotingPlaceResult :parties="parties" :candidates="candidates" :config="config" :votingPlaces="votingPlaces" :results="results.voting_place_results" :focusPlaceId="focusPlaceId"></VotingPlaceResult>
        <button @click="focusPlaceId=null" type="button" class="btn btn-theme2 rounded-0">Show all voting places</button>
    </div>
  </Card>
</template>

<style scoped>
#footer-row {
    outline: thin solid ;
}

</style>

<script>
import Card from './Card.vue'
import PlaceEntry from './PlaceEntry.vue'
import VotingPlaceResult from './VotingPlaceResult.vue'

export default {
  name: 'PlacesTable',
  components: {
    Card,
    PlaceEntry,
    VotingPlaceResult
  },
  data () {
    return {
        focusPlaceId: null,
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
    parties: {
        type: Array
    },
    candidates: {
        type: Array
    }
  },
  computed: {
    totalValidVotes () {
        var totalCast = this.results.total_votes_cast
        var informals = this.results.total_candidate_informals
        return (totalCast-informals)
    }
  },
  methods: {
    viewPlace(place) {
        this.focusPlaceId = place
    }
  }
}
</script>

<style scoped>

</style>
