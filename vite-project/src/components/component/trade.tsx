/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/m9evnqB3tmQ
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SVGProps, useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"
import { FileText, ArrowRightLeft } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
interface Scripts {
  id: number;
  name: string;
}

interface accounts{
  id:number;
  account_name:string;
  broker:string;
  brokerage_percentage:string;

}

interface transactions {
  id: number;
  script_name: string;
  quantity: string;
  market_cost: string;
  brokerage: string;
  purchase_date: string;
  account_name: string;
  // Add other fields as necessary
};


export function Trade() {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<accounts[]>([]);
  const [scripts, setScripts] = useState<Scripts[]>([]);
  const [transactions, setTransactions] = useState<transactions[]>([]);

  const [formData, setFormData] = useState({
    type: '',
    script: '',
    quantity: '',
    cost: '',
    brokerage: '',
    date: '',
    account: ''
  });

  // Fetch accounts from the API
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch('http://localhost:3000/accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    }
    fetchAccounts();
  }, []);


  useEffect(() => {
    async function fetchScripts() {
      try {
        const response = await fetch('http://localhost:3000/scripts');
        const data = await response.json();
        setScripts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    }
    fetchScripts();
  }, []);


  // fetch transactions
  useEffect(() => {
    // Fetch transactions
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/transactions/');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle account selection
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAccount = accounts.find(account => account.account_name === e.target.value);
    setFormData({
      ...formData,
      account: selectedAccount?.account_name || '',
      brokerage: selectedAccount?.brokerage_percentage || ''  // Set brokerage based on selected account
    });
  };
  const handleScriptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedScript = scripts.find(script => script.name === e.target.value);
    setFormData({
      ...formData,
      script: selectedScript?.name || '',  // Set the script name based on the selected script
    });
  };
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script_name: formData.script,
          quantity: formData.quantity,
          market_cost: formData.cost,
          brokerage: formData.brokerage,
          purchase_date: formData.date,
          account_id: accounts.find(account => account.account_name === formData.account)?.id
        }),
      });
  
      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }
  
      const data = await response.json();
      // Handle the response as needed, e.g., show a success message, update UI, etc.
      console.log('Transaction added:', data);
  
      // Close the dialog after successful submission
      setOpen(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      // Handle the error appropriately, e.g., show an error message
    }
  };

  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/portfolio"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/accounts"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  {/* <PackageIcon className="h-5 w-5" /> */}
                  <UsersIcon className="h-5 w-5" />
                  <span className="sr-only">Accounts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Accounts</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/scripts"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <FileText className="h-5 w-5" />

                  <span className="sr-only">Scripts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Scripts</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href=""
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ArrowRightLeft className="h-5 w-5" />
                  <span className="sr-only">Trade</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Trade</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LineChartIcon className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeftIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                  <UsersIcon className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <PackageIcon className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <UsersIcon className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <LineChartIcon className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" prefetch={false}>
                    Transactions
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Transactions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm" onClick={() => setOpen(true)}>Buy</Button>
            <Button size="sm">Sell</Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View and manage your transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Brokerage</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Total Purchase Value</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Account Holder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {transactions.map(transaction => {
                  const marketCost = parseInt(transaction.market_cost);
                  const brokerage = parseInt(transaction.brokerage);
                  const quantity = parseInt(transaction.quantity);
              
                  // Calculate total cost with brokerage
                  const totalCostWithBrokerage = marketCost + (marketCost * brokerage / 100);
                  const totalValue = totalCostWithBrokerage * quantity;
                  
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">Buy</TableCell>
                      <TableCell>{transaction.script_name}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>₹{marketCost} </TableCell>
                      <TableCell>{brokerage}%</TableCell>
                      <TableCell>₹{totalCostWithBrokerage}</TableCell>
                      <TableCell>₹{totalValue}</TableCell>
                      <TableCell>{transaction.purchase_date.slice(0,10)}</TableCell>
                      <TableCell>{transaction.account_name}</TableCell>
                    </TableRow>
                  )
                })}
                </TableBody>
              </Table>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Buy Share</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="space-y-4">
                      <select
                        name="Scripts"
                        value={formData.script}
                        onChange={handleScriptChange}
                        required
                        className="w-full border p-2"
                      >
                        <option value="">Select Script</option>
                        {scripts.map(script => (
                          <option key={script.id} value={script.name}>
                            {script.name} 
                          </option>
                        ))}
                      </select>  

                      <Input
                       
                        placeholder="Enter quantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                       
                        placeholder="Enter cost"
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        required
                      />

                      {/* Dropdown for selecting account */}
                      
                      <select
                        name="account"
                        value={formData.account}
                        onChange={handleAccountChange}
                        required
                        className="w-full border p-2"
                      >
                        <option value="">Select an account</option>
                        {accounts.map(account => (
                          <option key={account.id} value={account.account_name}>
                            {account.account_name} ({account.broker})
                          </option>
                        ))}
                      </select>

                      {/* Show brokerage automatically based on selected account */}
                      <Input
                       
                        placeholder="Brokerage percentage"
                        type="number"
                        name="brokerage"
                        value={formData.brokerage}
                        readOnly
                      />

                      <Input
                       
                        placeholder="Enter date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <DialogFooter className="p-3">
                      <Button type="submit" size="sm">Submit</Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LineChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}


function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function PanelLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
