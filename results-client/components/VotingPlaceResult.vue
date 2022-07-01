<template>
  <div>
    <h4>{{ displayName }}</h4>
    <h5>{{ remainingAddress }}</h5>
    <h6>{{ votingResultsType }}</h6>
    <div class="table-responsive">
    <table id="candidate-table">
        <thead>
            <tr>
                <th>
                    Party
                </th>
                <th class="ps-2">
                    Candidate
                </th>
                <th class="ps-3 text-end">
                    Votes
                </th>
            </tr>
        </thead>
        <tbody>
            <CandidateEntry v-for="r in sortedVotes" :key="r.id" :result="r" :candidates="candidates" :parties="parties" :config="config" :totalValidVotes="totalValidVotes" :showPrevious="false">
            </CandidateEntry>
            <tr>
                <td>
                  

                </td>
                <td class="ps-2">
                    Informal votes
                </td>
                <td class="ps-3 text-end" v-if="result.total_candidate_informals >= 0">
                    {{ result.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>
            </tr>
            <tr id="footer-row">
                <td>

                </td>
                <td class="ps-2">
                    <strong>Total</strong>
                </td>
                <td class="ps-3 text-end" v-if="result.total_issued_ballot_papers >= 0">
                    {{ result.total_issued_ballot_papers.toLocaleString('en-NZ') }}
                </td>
            </tr>
        </tbody>
    </table>    
    </div>
  </div>
</template>

<style scoped>
#candidate-table {
    border-collapse: separate;
    border-spacing: 0 5px;
}

#footer-row {
    outline: thin solid ;
}

#header-2020 {
    color: #919191
}

</style>

<script>
import Card from './Card.vue'
import CandidateEntry from './CandidateEntry.vue'

export default {
  name: 'VotingPlaceResult',
  components: {
    Card,
    CandidateEntry
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
    parties: {
      type: Array
    },
    candidates: {
      type: Array
    },
    focusPlaceId: {
      type: Number
    }
  },
  computed: {
    totalValidVotes () {
        var totalCast = this.result.total_issued_ballot_papers
        var informals = this.result.total_candidate_informals
        return (totalCast-informals)
    },
    result () {
      return this.results.filter(c => (c.voting_place_id == this.focusPlaceId))[0]
    },
    displayName() {
      var filtered = this.votingPlaces.filter(c => c.id == this.result.id)
      if (filtered.length == 0) {
        return this.focusPlaceId
      } else {
        return filtered[0].address.split(",")[0]
      }
    },
    remainingAddress() {
      var filtered = this.votingPlaces.filter(c => c.id == this.result.id)
      if (filtered.length == 0) {
        return this.focusPlaceId
      } else {
        return filtered[0].address.split(",").slice(1).join(",")
      }
    },
    votingResultsType() {
      if (this.focusPlaceId < 100) {
        return "Election day results only"
      } else if (this.focusPlaceId < 300) {
        return "Advance voting results only"
      } else if (this.focusPlaceId < 400) {
        return "Mobile voting results only"
      } else {
        return "Special votes"
      }
    },
    sortedVotes() {
      var candidateVotes = this.result.candidate_votes
      candidateVotes.sort((a, b) => { 
        if (a.votes < b.votes) {
          return 1
        } else if (b.votes < a.votes) {
          return -1
        } else {
          return 0
        }
        })
      return candidateVotes
    }
  },
}
</script>

<style scoped>

</style>
