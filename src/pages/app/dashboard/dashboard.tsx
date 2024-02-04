import { Helmet } from 'react-helmet-async'

import { FinishedWorksAmountCard } from './finished-works-amount-card'
import { ReadWorksAmountCard } from './read-works-amount.card'
import { RecentSyncList } from './recent-sync-list'
import { TotalWorksCard } from './total-works-card'
import { UnreadWorksAmountCard } from './unread-works-amount-card'
import { WorksInfoChart } from './works-info-chart'
import { WorksUpdated } from './works-updated'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <main className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>

        <section className="grid grid-cols-4 gap-4">
          <TotalWorksCard />
          <UnreadWorksAmountCard />
          <ReadWorksAmountCard />
          <FinishedWorksAmountCard />
        </section>

        <section className="grid grid-cols-9 gap-4">
          <WorksInfoChart />
          <RecentSyncList />
        </section>
      </main>
    </>
  )
}
