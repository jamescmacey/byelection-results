<template>
  <div>
    <h6>{{ remainingAddress }}</h6>
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
                <th class="ps-3 text-end" v-if="electionDayResults && (electionDayResults.total_issued_ballot_papers > 0)">
                    Election day votes
                </th>
                <th class="ps-3 text-end" v-if="advanceVotingResults && (advanceVotingResults.total_issued_ballot_papers > 0)">
                    Advance voting votes
                </th>
                <th class="ps-3 text-end" v-if="mobileResults && (mobileResults.total_issued_ballot_papers > 0)">
                    Mobile votes
                </th>
                <th class="ps-3 text-end" v-if="specialResults && (specialResults.total_issued_ballot_papers > 0)">
                    Special votes
                </th>
                <th class="ps-3 text-end">
                    Total votes
                </th>
            </tr>
        </thead>
        <tbody>
            <CandidateEntryPlace v-for="c in candidatesSortOrder" :key="c" :candidateId="c" :electionDayResults="electionDayResults" :advanceVotingResults="advanceVotingResults" :mobileResults="mobileResults" :specialResults="specialResults" :totalResults="totalResults"  :candidates="candidates" :parties="parties" :config="config">
            </CandidateEntryPlace>
            <tr>
                <td>
                  

                </td>
                <td class="ps-2">
                    Informal votes
                </td>
                <td class="ps-3 text-end" v-if="electionDayResults && (electionDayResults.total_issued_ballot_papers > 0)">
                  {{ electionDayResults.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>

                <td class="ps-3 text-end" v-if="advanceVotingResults && (advanceVotingResults.total_issued_ballot_papers > 0)">
                  {{ advanceVotingResults.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>

                <td class="ps-3 text-end" v-if="mobileResults && (mobileResults.total_issued_ballot_papers > 0)">
                  {{ mobileResults.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>

                <td class="ps-3 text-end" v-if="specialResults && (specialResults.total_issued_ballot_papers > 0)">
                  {{ specialResults.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>

                <td class="ps-3 text-end">
                  {{ overallTotalInformals.toLocaleString('en-NZ') }}
                </td>
            </tr>



            <tr id="footer-row">
                <td>

                </td>
                <td class="ps-2">
                    <strong>Total</strong>
                </td>
                <th class="ps-3 text-end" v-if="electionDayResults && (electionDayResults.total_issued_ballot_papers > 0)">
                  {{ electionDayResults.total_issued_ballot_papers.toLocaleString('en-NZ') }}
                </th>
                <th class="ps-3 text-end" v-if="advanceVotingResults && (advanceVotingResults.total_issued_ballot_papers > 0)">
                  {{ advanceVotingResults.total_issued_ballot_papers.toLocaleString('en-NZ') }}
                </th>
                <th class="ps-3 text-end" v-if="mobileResults && (mobileResults.total_issued_ballot_papers > 0)">
                  {{ mobileResults.total_issued_ballot_papers.toLocaleString('en-NZ') }}
                </th>
                <th class="ps-3 text-end" v-if="specialResults && (specialResults.total_issued_ballot_papers > 0)">
                  {{ specialResults.total_issued_ballot_papers.toLocaleString('en-NZ') }}
                </th>
                <th class="ps-3 text-end">
                  {{ overallTotalIssuedBallotPapers.toLocaleString('en-NZ') }}
                </th>
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
    outline: thin solid;
    outline-offset: -1px;
}

#header-2020 {
    color: #919191
}

</style>

<script>
import Card from './Card.vue'
import CandidateEntryPlace from './CandidateEntryPlace.vue'

export default {
  name: 'VotingPlaceResult',
  components: {
    Card,
    CandidateEntryPlace
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
    },
    candidatesSortOrder: {
      type: Array
    }
  },
  methods: {
  },
  computed: {
    electionDayResults() {
      var filtered = this.results.filter(c => (c.id == this.focusPlaceId && c.voting_place_id < 100))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    advanceVotingResults() {
      var filtered = this.results.filter(c => (c.id == this.focusPlaceId && c.voting_place_id < 300 && c.voting_place_id >= 200))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    mobileResults() {
      var filtered = this.results.filter(c => (c.id == this.focusPlaceId && c.voting_place_id < 400 && c.voting_place_id >= 300))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    specialResults() {
      var filtered = this.results.filter(c => (c.id == this.focusPlaceId && c.voting_place_id < 500 && c.voting_place_id >= 400))
      if ((filtered.length) > 0) {
        return filtered[0]
      } else {
        return null
      }
    },
    overallTotalInformals() {
      var tot = 0
      if (this.electionDayResults && this.electionDayResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.electionDayResults.total_candidate_informals
      }
      if (this.advanceVotingResults && this.advanceVotingResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.advanceVotingResults.total_candidate_informals
      }
      if (this.mobileResults && this.mobileResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.mobileResults.total_candidate_informals
      }
      if (this.specialResults && this.specialResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.specialResults.total_candidate_informals
      }

      return tot
    },
    overallTotalIssuedBallotPapers() {
      var tot = 0
      if (this.electionDayResults && this.electionDayResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.electionDayResults.total_issued_ballot_papers
      }
      if (this.advanceVotingResults && this.advanceVotingResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.advanceVotingResults.total_issued_ballot_papers
      }
      if (this.mobileResults && this.mobileResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.mobileResults.total_issued_ballot_papers
      }
      if (this.specialResults && this.specialResults.total_issued_ballot_papers >= 0) {
        tot = tot + this.specialResults.total_issued_ballot_papers
      }

      return tot
    },
    remainingAddress() {
      var filtered = this.votingPlaces.filter(c => c.id == this.focusPlaceId)
      if (filtered.length == 0) {
        return this.focusPlaceId
      } else {
        return filtered[0].address.split(",").slice(1).join(",")
      }
    }
  },
}
</script>

<style scoped>

</style>
