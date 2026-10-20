"use client";

import Logo from "@/asserts/svg/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMe, useLogOut } from "@/hook";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
  UserRoundCheck,
  House,
  ClipboardCheck,
  Info,
  Mail,   
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./themeToggle";

const routes = [
  { name: "Home", url: "/", icon: House },
  { name: "Assessment", url: "/assessments", icon: ClipboardCheck },
  { name: "About us", url: "/about-us", icon: Info },
  { name: "Contact", url: "/contract", icon: Mail },
  { name: "Blog", url: "/blog", icon: BookOpen },
  { name: "Privacy Policy", url: "/privacy-policy", icon: ShieldCheck },
];

const dashboardRoute: Record<UserRole, string> = {
  CANDIDATE: "/candidate",
  COMPANY: "/company",
  ADMIN: "/admin",
};

const profileRoute: Record<UserRole, string> = {
  CANDIDATE: "/candidate/profile",
  COMPANY: "/company/profile",
  ADMIN: "/admin/profile",
};

const roleLabel: Record<UserRole, string> = {
  CANDIDATE: "Candidate",
  COMPANY: "Company",
  ADMIN: "Administrator",
};

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogOut();

  const user = data?.data;
  const role = user?.role as UserRole | undefined;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["user"] });

        toast.add({
          title: "Logged out",
          description: "You have logged out successfully.",
          type: "success",
        });
      },
      onError: (err) => {
        toast.add({
          title: "Logout failed",
          description: err.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  // const handleLogout = () => {
  //   logout(undefined, {
  //     onSuccess: () => {
  //       // Query cache clear kore diben
  //       queryClient.clear();

  //       toast.add({
  //         title: "Logged out",
  //         description: "You have logged out successfully.",
  //         type: "success",
  //       });

  //       // 👈 Etata add kore din: Instant hard reload & redirect to login
  //       window.location.href = "/login";
  //     },
  //     onError: (err: any) => {
  //       toast.add({
  //         title: "Logout failed",
  //         description: err.message || "Something went wrong. Please try again.",
  //         type: "error",
  //       });
  //     },
  //   });
  // };

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex min-h-16 flex-wrap items-center justify-between gap-x-4 px-4 py-3 sm:px-6 md:flex-nowrap md:py-0 lg:px-8">
        {/* Logo: unchanged */}
        <Link
          href="/"
          aria-label="DevAssess home"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-foreground"
        >
          <Logo />
          <span>DevAssess</span>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center justify-start gap-1 overflow-x-auto py-2 text-xs font-medium sm:justify-center sm:text-sm md:order-none md:w-auto md:py-0"
        >
          {routes.map((route) => {
            const isActive =
              route.url === "/"
                ? pathname === "/"
                : pathname === route.url ||
                  pathname.startsWith(`${route.url}/`);

            const Icon = route.icon;

            return (
              <Link
                href={route.url}
                key={route.url}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 transition-all duration-200 sm:gap-2 sm:px-3.5 ${
                  isActive
                    ? "bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {!isLoading && !user && (
            <Button
              variant="default"
              className="h-9 px-4"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Login
            </Button>
          )}

          {!isLoading && user && role && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="h-10 gap-2 rounded-full border-border/80 px-2 sm:pr-3"
                    aria-label="Open profile menu"
                  />
                }
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {initial}
                </span>

                <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                  {user.name || "My account"}
                </span>

                <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 rounded-xl border-border/80 p-2 shadow-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2 py-3 font-normal">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name || "My account"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {roleLabel[role]}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={<Link href={dashboardRoute[role]} />}
                    className="cursor-pointer gap-2 rounded-lg py-2.5"
                  >
                    <LayoutDashboard className="size-4 text-muted-foreground" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link href={profileRoute[role]} />}
                    className="cursor-pointer gap-2 rounded-lg py-2.5"
                  >
                    <UserRoundCheck className="size-4 text-muted-foreground" />
                    My Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="cursor-pointer gap-2 rounded-lg py-2.5 text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
