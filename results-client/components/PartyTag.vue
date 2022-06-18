<template>
    <td class="rounded-2 text-center" :style="{backgroundColor: partyColourOpacity, color: textColour, borderLeftColor: partyColour}">
        <span id="party-code" :style="{color: textColour}" class="px-2">{{ partyCode }}</span>
    </td>
</template>

<style scoped>
td {
    border-left-style: solid;
    border-left-width: 3px;
}

</style>

<script>
export default {
  name: 'PartyTag',
  props: {
    parties: {
      type: Object,
    },
    config: {
      type: Object,
    },
    candidateId: {
        type: Number
    },
    candidates: {
        type: Object
    }
  },
  computed: {
    candidateName() {
      var filtered = this.candidates.filter(c => c.id == this.candidateId)
      if (filtered.length == 0) {
        return this.result.id
      } else {
        return filtered[0].name
      }
    },
    partyId() {
        var filtered = this.candidates.filter(c => c.id == this.candidateId)
        if (filtered.length == 0) {
            return null
        }
        return filtered[0].party_id
    },
    partyCode() {
        if (this.partyoverride != null) {
            return this.partyOverride.abbreviation
        }
        if (this.partyId == null) {
            return ("Ind.")
        } else {
            var filtered = this.parties.filter(p => p.id == this.partyId)
            if (filtered.length == 0) {
                return "Ind."
            } else {
                return filtered[0].abbreviation
            }
        }
    },
    partyOverride() {
        if (this.partyId == null) {
            return null
        }

        var filtered = this.config.parties.filter(p => p.p_no == this.partyId)        
        if (filtered.length == 0) {
            return null
        } else {
            return filtered[0]
        }

    },
    partyColour() {
        if (this.partyId == null || this.partyOverride == null) {
            return "#919191"
        } else {
            return this.partyOverride.colour
        }
    },
    partyColourOpacity() {
        return this.partyColour + "CC"
    },
    textColour() {
        // If a leading # is provided, remove it
        var hexcolor = this.partyColour
        if (hexcolor.slice(0, 1) === '#') {
            hexcolor = hexcolor.slice(1);
        }

        // Convert to RGB value
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);

        // Get YIQ ratio
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        // Check contrast
        return (yiq >= 128) ? 'black' : 'white';
    }
  }
}
</script>

<style scoped>

</style>
