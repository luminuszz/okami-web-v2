import { useQueries } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { fetchWorksWithFilter } from '@/api/fetch-for-works-with-filter'
import { getUserDetails } from '@/api/get-user-details'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function WorksInfoChart() {
  const analytics = useQueries({
    queries: [
      {
        queryKey: ['works', 'unread'],
        queryFn: () => fetchWorksWithFilter('unread'),
      },
      {
        queryKey: ['works', 'read'],
        queryFn: () => fetchWorksWithFilter('read'),
      },
      {
        queryKey: ['user-details'],
        queryFn: getUserDetails,
      },
    ],
    combine: (result) => {
      const [unread, read, user] = result
      return {
        unread: unread.data?.length,
        read: read.data?.length,
        finished: user.data?.finishedWorksCount,
        isLoading: unread.isLoading || read.isLoading || user.isLoading,
      }
    },
  })

  const data = [
    { name: 'Obras lidas', value: analytics.read, color: colors.cyan[500] },
    {
      name: 'Obras não lidas',
      value: analytics.unread,
      color: colors.amber[500],
    },
    {
      name: 'Obras finalizadas',
      value: analytics.finished,
      color: colors.emerald[500],
    },
  ]

  return (
    <Card className="xs:col-span-1 lg:col-span-5">
      <CardHeader className="flex  flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Dados Analíticos
          </CardTitle>
          <CardDescription>Dados dos seu banco de obras</CardDescription>
        </div>

        <div>
          <BarChart className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {analytics.isLoading ? (
          <div className="flex items-center justify-center">
            <Skeleton className="size-96 rounded-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={100}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  const currentCell = data[index]

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${currentCell.name}: ${currentCell.value}`}
                    </text>
                  )
                }}
              >
                {data.map((data) => (
                  <Cell
                    key={data.name}
                    fill={data.color}
                    name={data.name}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
