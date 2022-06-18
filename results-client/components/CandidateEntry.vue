<template>
  <tr>
    <PartyTag :config="config" :parties="parties" :candidateId="result.id" :candidates="candidates"></PartyTag>
    <td class="ps-2">
      <strong>{{ candidateName }}</strong>
    </td>
    <td class="text-end ps-3">
      {{ result.votes.toLocaleString('en-NZ') }}
    </td>
    <td id="percentage" :class="{pctborder: showPrevious}" class="text-end ps-2 pe-4">
      {{ percentage.toFixed(1) }}%
    </td>
    <td v-if="showPrevious" id="last-election" class="ps-4 text-end">
      {{ lastElection }}
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
  name: 'CandidateEntry',
  components: {
    PartyTag
  },
  props: {
    candidates: {
      type: Object,
    },
    parties: {
      type: Object,
    },
    result: {
      type: Object,
    },
    config: {
      type: Object
    },
    totalValidVotes: {
      type: Number
    },
    showPrevious: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    candidateName() {
      var filtered = this.candidates.filter(c => c.id == this.result.id)
      if (filtered.length == 0) {
        return this.result.id
      } else {
        return filtered[0].name
      }
    },
    percentage() {
      if (this.totalValidVotes == 0) {
        return 0
      } else {
        return ((this.result.votes / this.totalValidVotes) * 100)
      }
    },
    lastElection() {
      if (this.result.id in this.config.previous_results) {
        var previous_result = this.config.previous_results[this.result.id]
        if (previous_result.was_different_candidate) {
          return previous_result.percent_of_valid.toFixed(1) + "%" + "*"
        } else {
          return previous_result.percent_of_valid.toFixed(1) + "%"
        }
      } else {
        return "DNS"
      }
    },
    partyName() {
      var filtered = this.candidates.filter(c => c.id == this.result.id)
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

      
    }
  }
}
</script>

<style scoped>

</style>
