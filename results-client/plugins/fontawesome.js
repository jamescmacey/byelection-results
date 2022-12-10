import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faHistory, faTimes, faCheck, faMapSigns, faQuestion, faChevronUp, faChevronDown, faExternalLinkAlt, faInfoCircle, faHourglass, faCircleHalfStroke, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHistory, faTimes, faCheck, faMapSigns, faQuestion, faChevronUp, faChevronDown, faExternalLinkAlt, faInfoCircle, faHourglass, faCircleHalfStroke, faCircleCheck, faCircleRegular)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})