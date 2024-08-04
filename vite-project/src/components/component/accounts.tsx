/* eslint-disable @typescript-eslint/no-unused-vars */
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/XCl4bvI7dM3
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SVGProps, useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"
// import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu"
import { ArrowRightLeft, CirclePlusIcon,   FilePenIcon, FileText, Trash2Icon } from "lucide-react"
import { Dialog } from '@headlessui/react';



// Define the TypeScript interface for the account data
interface Account {
  id: number;
  account_name: string;
  broker_id: string;
  broker: string;
  created_at: string;
  client_code:string;
  brokerage_percentage: string;

}

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Omit<Account, 'id' | 'created_at'>>({
    account_name: '',
    broker_id: '',
    broker: '',
    client_code: '',
    brokerage_percentage: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [newAccountValues, setNewAccountValues] = useState({
  account_name: '',
  broker_id: '',
  broker: '',
  client_code: '',
  brokerage_percentage: '',


});


  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3000/accounts')
      .then(response => response.json())
      .then((data: Account[]) => setAccounts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const handleDelete = (id: number) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this account? This action cannot be undone.');

    if (isConfirmed) {
      // Send DELETE request to the API if confirmed
      fetch(`http://localhost:3000/accounts/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Update state to remove the deleted account
            setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id));
          } else {
            console.error('Failed to delete account');
          }
        })
        .catch(error => console.error('Error deleting account:', error));
    }
  };

  const handleNewAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccountValues(prevValues => ({ ...prevValues, [name]: value }));
  };
  
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    fetch('http://localhost:3000/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccountValues),
    })
      .then(response => response.json())
      .then(data => {
        setAccounts(prevAccounts => [...prevAccounts, data]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding account:', error));
  };
  
  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormValues({
      account_name: account.account_name,
      broker_id: account.broker_id,
      broker: account.broker,
      client_code: account.client_code,
      brokerage_percentage: account.brokerage_percentage,
    });
    setIsModalOpen(true);
  };
  
  

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    fetch(`http://localhost:3000/accounts/${editingAccount.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then(response => {
        if (response.ok) {
          setAccounts(prevAccounts =>
            prevAccounts.map(account =>
              account.id === editingAccount.id ? { ...account, ...formValues } : account
            )
          );
          setIsModalOpen(false);
        } else {
          console.error('Failed to update account');
        }
      })
      .catch(error => console.error('Error updating account:', error));
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
                  href="#"
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
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
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
                  {/* <PackageIcon className="h-5 w-5" /> */}
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Scripts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Scripts</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                   <ArrowRightLeft className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
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
                  Settings
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
                <BreadcrumbPage>Accounts</BreadcrumbPage>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddModalOpen(true)}>
                <CirclePlusIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add account</span>
              </Button>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>Manage your accounts and view details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Broker Id</TableHead>
                    <TableHead className="hidden sm:table-cell">Client Code</TableHead>
                    <TableHead className="hidden sm:table-cell">%</TableHead>
                    <TableHead className="hidden sm:table-cell">Account</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map(account => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.account_name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{account.broker_id}</TableCell>
                      <TableCell className="hidden sm:table-cell">{account.client_code}</TableCell>
                      <TableCell className="hidden sm:table-cell">{account.brokerage_percentage}</TableCell>
                      <TableCell className="hidden sm:table-cell"><Badge>{account.broker}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(account)}
                                >
                                  <FilePenIcon className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(account.id)}
                                >
                                  <Trash2Icon className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Add Account Modal */}
              {isAddModalOpen && (
        <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
              <h2 className="text-lg font-semibold">Add New Account</h2>
              <form onSubmit={handleAddSubmit} className="mt-4">
                <label className="block">
                  Account Name:
                  <input
                    type="text"
                    name="account_name"
                    value={newAccountValues.account_name}
                    onChange={handleNewAccountChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </label>
                <label className="block mt-2">
                  Broker ID:
                  <input
                    type="text"
                    name="broker_id"
                    value={newAccountValues.broker_id}
                    onChange={handleNewAccountChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </label>
                <label className="block mt-2">
                  Broker:
                  <input
                    type="text"
                    name="broker"
                    value={newAccountValues.broker}
                    onChange={handleNewAccountChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </label>
                <label className="block mt-2">
                  Client Code:
                  <input
                    type="text"
                    name="client_code"
                    value={newAccountValues.client_code}
                    onChange={handleNewAccountChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </label>
                <label className="block mt-2">
                  Brokerage %:
                  <input
                    type="number"
                    name="brokerage_percentage"
                    value={newAccountValues.brokerage_percentage}
                    onChange={handleNewAccountChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </label>
                <div className="mt-4 flex gap-2">
                  <Button type="submit">Add Account</Button>
                  <Button type="button" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
              {isModalOpen && editingAccount && (
  <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold">Edit Account</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block">
            Account Name:
            <input
              type="text"
              name="account_name"
              value={formValues.account_name}
              onChange={handleFormChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mt-2">
            Broker ID:
            <input
              type="text"
              name="broker_id"
              value={formValues.broker_id}
              onChange={handleFormChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mt-2">
            Broker:
            <input
              type="text"
              name="broker"
              value={formValues.broker}
              onChange={handleFormChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mt-2">
            Client Code:
            <input
              type="text"
              name="client_code"
              value={formValues.client_code}
              onChange={handleFormChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mt-2">
            Brokerage Percentage:
            <input
              type="text"
              name="brokerage_percentage"
              value={formValues.brokerage_percentage}
              onChange={handleFormChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <div className="mt-4 flex gap-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
)}

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
// export default Accounts;