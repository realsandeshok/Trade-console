
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { SVGProps, useState } from "react"
import { JSX } from "react/jsx-runtime"

export function Auth() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f0f0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto">
            <MountainIcon className="h-12 w-12 text-[#4CAF50]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#333333]">
            Welcome to Acme Stocks
          </h2>
          <p className="mt-2 text-center text-sm text-[#666666]">
            Invest in the future with our cutting-edge platform.
          </p>
        </div>
        <Tabs defaultValue="login" className="space-y-4">
          <TabsList className="grid grid-cols-2 rounded-lg bg-[#e0e0e0] p-1 h-12">
            <TabsTrigger value="login" className="rounded-md py-2 text-sm font-medium">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="rounded-md py-2 text-sm font-medium">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4">
              <div>
                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4 text-[#666666]" />
                  <Label htmlFor="email" className="block text-sm font-medium text-[#666666]">
                    Email address
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <LockIcon className="mr-2 h-4 w-4 text-[#666666]" />
                  <Label htmlFor="password" className="block text-sm font-medium text-[#666666]">
                    Password
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-1 right-1 h-7 w-7"
                    onClick={togglePasswordVisibility}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" className="h-4 w-4 rounded text-[#4CAF50] focus:ring-[#4CAF50]" />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-[#666666]">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="font-medium text-[#4CAF50] hover:text-[#3e8e41]" prefetch={false}>
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#4CAF50] text-white hover:bg-[#3e8e41] focus:ring-[#4CAF50]">
                Sign in
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-[#666666]">
                  Full Name
                </Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4 text-[#666666]" />
                  <Label htmlFor="email" className="block text-sm font-medium text-[#666666]">
                    Email address
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <LockIcon className="mr-2 h-4 w-4 text-[#666666]" />
                  <Label htmlFor="password" className="block text-sm font-medium text-[#666666]">
                    Password
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-1 right-1 h-7 w-7"
                    onClick={togglePasswordVisibility}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <LockIcon className="mr-2 h-4 w-4 text-[#666666]" />
                  <Label htmlFor="confirm-password" className="block text-sm font-medium text-[#666666]">
                    Confirm Password
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="block w-full appearance-none rounded-md border border-[#ccc] bg-[#f0f0f0] px-3 py-2 text-[#333333] placeholder-[#999999] focus:border-[#4CAF50] focus:outline-none focus:ring-[#4CAF50] sm:text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-1 right-1 h-7 w-7"
                    onClick={togglePasswordVisibility}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#4CAF50] text-white hover:bg-[#3e8e41] focus:ring-[#4CAF50]">
                Sign up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EyeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function LockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
