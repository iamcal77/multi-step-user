import { createRouter, createWebHistory } from 'vue-router'
import PersonalDetails from '../components/steps/PersonalDetails.vue'
import BusinessDetails from '../components/steps/BusinessDetails.vue'
import VerificationSummary from '../components/steps/VerificationSummary.vue'

const routes = [
  {
    path: '/',
    name: 'PersonalDetails',
    component: PersonalDetails,
  },
  {
    path: '/business-details',
    name: 'BusinessDetails',
    component: BusinessDetails,
  },
  {
    path: '/verification-summary',
    name: 'VerificationSummary',
    component: VerificationSummary,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
