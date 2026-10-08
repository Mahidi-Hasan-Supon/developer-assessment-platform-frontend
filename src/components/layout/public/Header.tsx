"use client";
import Logo from "@/asserts/svg/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogOut } from "@/hook";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
  const queryClient = useQueryClient();
  const routes = [
    { name: "Home", url: "/" },
    { name: "Problem", url: "/problems" },
    { name: "Assessment", url: "/assessment" },
    { name: "About us", url: "/about-us" },
    { name: "Contract", url: "/contract" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    CANDIDATE: "/candidate",
    COMPANY: "/company",
    ADMIN: "/admin",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogOut();
  console.log("data", data?.data);
  const user = data?.data;
  const role: UserRole = !!data?.data && data?.data.role;
  console.log(role);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        console.log(res);
        toast.add({
          title: "Tata",
          description: "Logout successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        console.log(err);
        toast.add({
          title: "Logout error",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-0">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <Logo />
            <span>DevAssess</span>
          </div>
        </Link>

        <nav className="flex items-center justify-center order-3 md:order-none w-full md:w-auto mt-3 md:mt-0 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm font-medium">
          {routes.map((route) => (
            <Link
              href={route.url}
              key={route.url}
              className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap py-1 px-1.5 sm:px-0"
            >
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {!isLoading && !user && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
              className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            >
              Login
            </Button>
          )}
          {!isLoading && user && (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-muted-foreground max-w-[100px] lg:max-w-[150px] truncate">
                {user?.name || "User"}
              </span>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
