"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"



export const description = "An interactive area chart"

// const dummyEnrollmentsData = [
//   { date: "2024-04-01", enrollments: 20 },
//   { date: "2024-04-02", enrollments: 35 },
//   { date: "2024-04-03", enrollments: 25},
//   { date: "2024-04-04", enrollments: 40 },
//   { date: "2024-04-05", enrollments: 30 },
//   { date: "2024-04-06", enrollments: 45},
//   { date: "2024-04-07", enrollments: 50},
//   { date: "2024-04-08", enrollments: 38},
//   { date: "2024-04-09", enrollments: 42},
//   { date: "2024-04-10", enrollments: 48 },
//   { date: "2024-04-11", enrollments: 55 },
//   { date: "2024-04-12", enrollments: 60},
//   { date: "2024-04-13", enrollments: 52 },
//   { date: "2024-04-14", enrollments: 65 },
//   { date: "2024-04-15", enrollments: 70 },


// ]

const chartConfig = {
  enrollments : {
    label: "Enrollments",
    color: "var(--chart-1)",
  },

} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  data :{date:string; enrollments: number}[];

}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentNumber = React.useMemo(() => data.reduce((acc, curr) => acc + curr.enrollments, 0), [data])



  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
        <span className="hidden @[540px]/card:block">Total Enrollments for the last 30 days: {totalEnrollmentNumber}</span>
        <span className="@[540px]/card:hidden">
          Last 30 days: {totalEnrollmentNumber}

        </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={data} margin={{
            left:12,
            right:12
          }
          }>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} interval={"preserveStartEnd"} tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }} />
            <ChartTooltip content={<ChartTooltipContent className="w-[150px]" labelFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }}  />} />
            <Bar  dataKey="enrollments" fill="var(--color-enrollments)"  />


          </BarChart>


          </ChartContainer>


        </CardContent>

    </Card>
  )
}
