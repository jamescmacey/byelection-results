<template>
  <tr>
    <PartyTag :config="config" :parties="parties" :candidateId="candidateId" :candidates="candidates"></PartyTag>
    <td class="ps-2">
      <strong>{{ candidateName }}</strong>
    </td>
    <td v-if="electionDayResults && (electionDayResults.total_issued_ballot_papers > 0)" class="text-end ps-3">
      {{ candidateVotesForResultSet(electionDayResults).toLocaleString('en-NZ') }}
    </td>
    <td v-if="advanceVotingResults && (advanceVotingResults.total_issued_ballot_papers > 0)" class="text-end ps-3">
      {{ candidateVotesForResultSet(advanceVotingResults).toLocaleString('en-NZ') }}
    </td>
    <td v-if="mobileResults && (mobileResults.total_issued_ballot_papers > 0)" class="text-end ps-3">
      {{ candidateVotesForResultSet(mobileResults).toLocaleString('en-NZ') }}
    </td>
    <td v-if="specialResults && (specialResults.total_issued_ballot_papers > 0)" class="text-end ps-3">
      {{ candidateVotesForResultSet(specialResults).toLocaleString('en-NZ') }}
    </td>
    <td class="text-end ps-3">
      {{ (candidateVotesForResultSet(electionDayResults) + candidateVotesForResultSet(advanceVotingResults) + candidateVotesForResultSet(mobileResults) + candidateVotesForResultSet(specialResults)).toLocaleString('en-NZ') }}
    </td>
  </tr>
</template>

<style scoped>
.pctborder {
  border-right: solid 1px #919191;
}

#last-election {
  color: #919191;
}
</style>

<script>
import PartyTag from './PartyTag.vue'

export default {
  name: 'CandidateEntryPlace',
  components: {
    PartyTag
  },
  props: {
    candidates: {
      type: Object,
    },
    candidateId: {
      type: Number
    },
    parties: {
      type: Object,
    },
    electionDayResults: {
      type: Object,
    },
    advanceVotingResults: {
      type: Object,
    },
    mobileResults: {
      type: Object,
    },
    specialResults: {
      type: Object,
    },
    config: {
      type: Object
    },
    showPrevious: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    candidateVotesForResultSet(resultSet) {
      if (!resultSet) {
        return 0
      }

      if (resultSet.total_issued_ballot_papers == 0) {
        return 0
      }

      var candidatesVotes = resultSet.candidate_votes
      var filtered = candidatesVotes.filter(c => c.id == this.candidateId)
      if (filtered.length == 0) {
        return 0
      } else {
        return filtered[0].votes
      }
    },
  },
  computed: {
    candidateName() {
      var filtered = this.candidates.filter(c => c.id == this.candidateId)
      if (filtered.length == 0) {
        return this.candidateId
      } else {
        return filtered[0].name
      }
    },
    partyName() {
      var filtered = this.candidates.filter(c => c.id == this.candidateId)
      if (filtered.length == 0) {
        return "-"
      }

      var partyId = filtered[0].party_id
      if (partyId == null) {
        return ("Independent")
      } else {
        var filtered = this.parties.filter(p => p.id == partyId)
        if (filtered.length == 0) {
          return "-"
        } else {
          return filtered[0].name
        }
      }      
    },
  }
}
</script>

<style scoped>

</style>
