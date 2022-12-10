<template>
  <Card>
    <h4>Candidate results</h4>
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
                <th class="ps-2 text-end pe-4">
                    %
                </th>
                <th id="header-2020" class="ps-4 text-end">
                    2020
                </th>
            </tr>
        </thead>
        <tbody>
            <CandidateEntry v-for="r in results.candidate_votes" :key="r.id" :result="r" :candidates="candidates" :parties="parties" :config="config" :totalValidVotes="totalValidVotes">
            </CandidateEntry>
            <tr>
                <td>

                </td>
                <td class="ps-2">
                    Informal votes
                </td>
                <td class="ps-3 text-end" v-if="results.total_candidate_informals >= 0">
                    {{ results.total_candidate_informals.toLocaleString('en-NZ') }}
                </td>
            </tr>
            <tr id="footer-row">
                <td>

                </td>
                <td class="ps-2">
                    <strong>Total</strong>
                </td>
                <td class="ps-3 text-end" v-if="results.total_votes_cast >= 0">
                    {{ results.total_votes_cast.toLocaleString('en-NZ') }}
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <p class="text-muted"><strong>DNS</strong>: Did not stand in 2020; <strong>*</strong> denotes where the candidate did not stand in 2020, but the candidate's party stood a different candidate and the 2020 candidate's result is shown; <strong>†</strong> denotes where the candidate stood in 2020 for a different party than in this election.</p>
    
  </Card>
</template>

<style scoped>
#candidate-table {
    border-collapse: separate;
    border-spacing: 0 5px;
}

#footer-row {
    outline: thin solid ;
    outline-offset: -2px;
}

#header-2020 {
    color: #919191
}

</style>

<script>
import Card from './Card.vue'
import CandidateEntry from './CandidateEntry.vue'

export default {
  name: 'CandidateTable',
  components: {
    Card,
    CandidateEntry
  },
  props: {
    candidates: {
      type: Object,
    },
    parties: {
      type: Object,
    },
    results: {
      type: Object,
    },
    config: {
        type: Object
    }
  },
  computed: {
    totalValidVotes () {
        var totalCast = this.results.total_votes_cast
        var informals = this.results.total_candidate_informals
        return (totalCast-informals)
    }
  }
}
</script>

<style scoped>

</style>
