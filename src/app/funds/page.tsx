import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";

const revenueData = [
  { month: "October 2023", views: "10,500", revenue: "$42.00", status: "Paid" },
  { month: "September 2023", views: "8,200", revenue: "$32.80", status: "Paid" },
  { month: "August 2023", views: "9,100", revenue: "$36.40", status: "Paid" },
  { month: "July 2023", views: "7,600", revenue: "$30.40", status: "Paid" },
];

export default function FundsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl mb-8">
          Your Funds
        </h1>
        <Card className="mb-8 bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDollarSign className="h-6 w-6" />
              <span>Earnings Summary</span>
            </CardTitle>
            <CardDescription>
              Your current estimated earnings. You receive 40% of the total ad revenue.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-baseline gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-4xl font-bold">$141.60</p>
            </div>
            <div className="ml-auto">
              <Button>Withdraw Funds</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue History</CardTitle>
            <CardDescription>
              A detailed history of your monthly earnings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Revenue (40%)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell>{row.views}</TableCell>
                    <TableCell>{row.revenue}</TableCell>
                    <TableCell>
                      <span className="text-green-600 dark:text-green-400">{row.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
