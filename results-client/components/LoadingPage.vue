<template>
       <div class="row justify-content-md-center">
      <Card class="col-lg-5 col-md-7 col-12 text-center mt-5">
        <h2>{{ electionName }}</h2>
        <hr>
        <div v-if="!electionStarted">
          <div class="col-12 text-start">
            <h5>Election results will be available here from 7pm NZDT on 25 November.</h5>
            <p>You can also view official election results at <a target="_blank" href="https://electionresults.govt.nz">electionresults.govt.nz</a>, but you'll need to keep refreshing the page for these to show. Election results on this website are provided by the Electoral Commission through their official feed, and may be subject to a slight delay; but you won't need to keep refreshing this page to update results.</p>
            <p>The Electoral Commission's targets for the release of preliminary results are:
              <ul>
                <li>
                  Results from 50 per cent of voting places by 21.00 NZDT
                </li>
                <li>
                  Results from 95 per cent of voting places by 22.30 NZDT
                </li>
              </ul>
            </p>
            <p><strong>If this message appears after 7pm on election night, simply refresh the page.</strong></p>
          </div>
          <hr>
          <h5 class="text-uppercased">Voting closes in:</h5>
          <h2>{{ remainingTime }}</h2>
        </div>
        <div v-else-if="(!isAlive)">
          Waiting for the election to start. Last checked {{ lastCheckedIsAliveText }}.
        </div>
        <div v-else>
          Results should appear soon. If nothing happens within the next 10 seconds, refresh this page.
        </div>
      </Card>
    </div>
</template>

<script>
export default {
    props: {
        electionName: {
            default: "Election name unset",
        },
        remainingTime:  {
            default: "-"
        },
        electionStarted: {
            type: Boolean,
            default: false
        },
        lastCheckedIsAliveText: {
          type: String
        },
        isAlive: {
          type: Boolean
        }

    }
}

</script>
