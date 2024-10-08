import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Holding {
  scriptName: string;
  totalQuantity: number;
  totalPurchaseValue: number;
  avgHoldingCost: number;
  sector: string;
  transactions: Transaction[];
  filteredTransactions?: Transaction[];
  showHolding?: boolean;
}

interface Transaction {
  accountHolder: string;
  purchaseDate: string;
  quantity: number;
  purchaseValue: number;
}

const Holdings = () => {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    script: "All Scripts",
    accountHolder: "All Account Holders",
    date: "",
  });

  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [filteredHoldings, setFilteredHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const response = await fetch("http://localhost:3000/holdings");
      const data: Holding[] = await response.json();

      // Ensure numerical values are correct
      const parsedData = data.map((holding) => ({
        ...holding,
        totalQuantity: parseFloat(holding.totalQuantity.toString()),
        totalPurchaseValue: parseFloat(holding.totalPurchaseValue.toString()),
        avgHoldingCost: parseFloat(holding.avgHoldingCost.toString()),
        transactions: holding.transactions.map((transaction) => ({
          ...transaction,
          quantity: parseFloat(transaction.quantity.toString()),
          purchaseValue: parseFloat(transaction.purchaseValue.toString()),
        })),
      }));

      setHoldings(parsedData);
      applyFilters(parsedData); // Apply filters after fetching data
    } catch (error) {
      console.error("Error fetching holdings data:", error);
    }
  };

  const totalInvestment = filteredHoldings.reduce(
    (sum, holding) => sum + holding.totalPurchaseValue,
    0
  );

  const toggleExpand = (scriptName: string) => {
    setExpandedScript(expandedScript === scriptName ? null : scriptName);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      script: "All Scripts",
      accountHolder: "All Account Holders",
      date: "",
    });
    applyFilters(holdings); // Reset and apply filters to the original data
  };

  const applyFilters = (data: Holding[]) => {
    const filtered = data
      .map((holding) => {
        const isScriptMatch =
          filters.script === "All Scripts" ||
          holding.scriptName === filters.script;

        const filteredTransactions = holding.transactions.filter(
          (transaction) => {
            const isAccountHolderMatch =
              filters.accountHolder === "All Account Holders" ||
              transaction.accountHolder === filters.accountHolder;

            const isDateMatch =
              !filters.date ||
              new Date(transaction.purchaseDate).toISOString().slice(0, 10) ===
                filters.date;

            return isAccountHolderMatch && isDateMatch;
          }
        );

        const hasMatchingTransactions =
          filteredTransactions.length > 0 || filters.script === "All Scripts";

        return {
          ...holding,
          filteredTransactions,
          showHolding: isScriptMatch && hasMatchingTransactions,
        };
      })
      .filter((holding) => holding.showHolding);

    setFilteredHoldings(filtered);
    setIsFilterOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="flex justify-end mb-4">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Options</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Select
                      value={filters.script}
                      onValueChange={(value) =>
                        handleFilterChange("script", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Scripts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Scripts">All Scripts</SelectItem>
                        {Array.from(
                          new Set(holdings.map((h) => h.scriptName))
                        ).map((script) => (
                          <SelectItem key={script} value={script}>
                            {script}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={filters.accountHolder}
                      onValueChange={(value) =>
                        handleFilterChange("accountHolder", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Account Holders" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Account Holders">
                          All Account Holders
                        </SelectItem>
                        {Array.from(
                          new Set(
                            holdings.flatMap((h) =>
                              h.transactions.map((t) => t.accountHolder)
                            )
                          )
                        ).map((holder) => (
                          <SelectItem key={holder} value={holder}>
                            {holder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={filters.date}
                      onChange={(e) =>
                        handleFilterChange("date", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button onClick={() => applyFilters(holdings)}>
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Script Name</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Total Purchase Value</TableHead>
                  <TableHead>Avg. Holding Cost</TableHead>
                  <TableHead>Sector</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHoldings.map((holding) => (
                  <>
                    <TableRow key={holding.scriptName}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(holding.scriptName)}
                        >
                          {expandedScript === holding.scriptName ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>{holding.scriptName}</TableCell>
                      <TableCell>{holding.totalQuantity}</TableCell>
                      <TableCell>
                        ₹{holding.totalPurchaseValue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₹{holding.avgHoldingCost.toFixed(2)}
                      </TableCell>
                      <TableCell>{holding.sector}</TableCell>
                    </TableRow>
                    {expandedScript === holding.scriptName &&
                      holding.filteredTransactions && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Account Holder</TableHead>
                                  <TableHead>Purchase Date</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Purchase Value</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {holding.filteredTransactions.map(
                                  (transaction, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        {transaction.accountHolder}
                                      </TableCell>
                                      <TableCell>
                                        {new Date(
                                          transaction.purchaseDate
                                        ).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell>
                                        {transaction.quantity}
                                      </TableCell>
                                      <TableCell>
                                        ₹
                                        {transaction.purchaseValue.toLocaleString()}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      )}
                  </>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="summary">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Stock</th>
                  <th className="px-4 py-3 text-left font-medium">Account</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Total Shares
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredHoldings.map((holding) => (
                  <tr key={holding.scriptName}>
                    <td className="px-4 py-2">{holding.scriptName}</td>
                    <td className="px-4 py-2">
                      {holding.transactions.map((transaction, index) => (
                        <div key={index}>{transaction.accountHolder}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {holding.totalQuantity}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ₹{holding.totalPurchaseValue.toLocaleString()}
                    </td>
                    {/* <td className="px-4 py-2">
                      ₹{holding.avgHoldingCost.toFixed(2)}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Total Investment</h2>
                <p className="text-2xl font-bold">
                  ₹{totalInvestment.toLocaleString()}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Holdings;
