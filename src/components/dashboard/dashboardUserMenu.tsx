"use client";

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
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function DashboardUserMenu({ role }: { role: UserRole }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogOut();

  const user = data?.data;
  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["user"] });

        toast.add({
          title: "Logged out",
          description: "You have logged out successfully.",
          type: "success",
        });

        router.replace("/login");
      },
      onError: (error) => {
        toast.add({
          title: "Logout failed",
          description:
            error.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  if (isLoading || !user) {
    return (
      <output
        className="flex size-9 items-center justify-center rounded-full border text-sm"
        aria-label="Loading user profile"
      >
        <UserRound className="size-4 text-muted-foreground" />
      </output>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border/80 px-2 transition-colors hover:bg-accent sm:pr-3"
        aria-label="Open profile menu"
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
        className="w-64 rounded-xl p-2 shadow-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-3 font-normal">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user.name || "My account"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
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
            onClick={() => router.push(dashboardRoute[role])}
            className="cursor-pointer gap-2 rounded-lg py-2.5"
          >
            <LayoutDashboard className="size-4 text-muted-foreground" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href={"/"}></Link>}
            className="cursor-pointer gap-2 rounded-lg py-2.5"
          >
            <UserRoundCheck className="size-4 text-muted-foreground" />
           Home 
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(profileRoute[role])}
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
  );
}
