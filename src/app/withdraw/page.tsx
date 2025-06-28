import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Banknote, Wallet } from "lucide-react";

export default function WithdrawPage() {
  const availableBalance = 11800;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <Banknote className="h-8 w-8 text-primary" />
              Withdraw Funds
            </CardTitle>
            <CardDescription>
              Transfer your earnings to your bank account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 rounded-lg bg-muted flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-muted-foreground"/>
                    <span className="text-muted-foreground">Available Balance:</span>
                </div>
                <span className="font-bold text-lg">₹{availableBalance.toLocaleString('en-IN')}</span>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (INR)</Label>
                <Input id="amount" type="number" placeholder="e.g., 5000.00" step="0.01" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="bank-account">Bank Account</Label>
                <Input id="bank-account" placeholder="Enter your bank account number" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="routing-number">Routing Number</Label>
                <Input id="routing-number" placeholder="Enter your routing number" />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Confirm Withdrawal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
