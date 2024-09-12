import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCallback, useMemo, useState } from "react";
import {
  Cat,
  GameController,
  HandWaving,
  Ranking,
  Spade,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserDetails } from "@/query/functions/User.function";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

interface Props {
  children: React.ReactNode;
}

type SideBarRoute = {
  id: number;
  name: string;
  keyword: string;
  route: string;
  icon: React.ReactNode;
  isActive: boolean;
};

const SidebarRoutes: SideBarRoute[] = [
  {
    id: 1,
    name: "Dashboard",
    keyword: "dashboard",
    route: "/dashboard",
    icon: <Home />,
    isActive: true,
  },
  {
    id: 2,
    name: "Game",
    keyword: "game",
    route: "/instruction",
    icon: <GameController className="h-6 w-6" />,
    isActive: false,
  },
  {
    id: 3,
    name: "Leaderboard",
    keyword: "leaderboard",
    route: "/leaderboard",
    icon: <Ranking className="h-6 w-6" />,
    isActive: false,
  },
];

export function Layout({ children }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLogOut, setLogout] = useState<boolean>(false);

  const user = useUserDetails();

  const _routes = useMemo(() => {
    const currRoute = pathname.split("/")[1] || "";
    return SidebarRoutes.map((route) => {
      return {
        ...route,
        isActive: route.keyword === currRoute,
      };
    });
  }, [pathname]);

  const _logOut = useCallback(() => {
    Cookies.remove("access-token");
    navigate("/");
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block sticky top-0 h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Cat className="h-6 w-6 text-primary" weight="bold" />
              <span className="text-xl">KittenBoom</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid gap-y-4 items-start px-2 text-sm font-medium lg:px-4">
              {_routes?.map((item) => (
                <Link
                  to={item.route}
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                    item.isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="flex">
                <div className="flex items-center gap-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {user?.data?.username?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user?.data?.username}</CardTitle>
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    onClick={() => setLogout((prev) => !prev)}
                  >
                    <HandWaving />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Cat className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {_routes?.map((item) => (
                  <Link
                    to={item.route}
                    key={item.id}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                      item.isActive ? "bg-muted text-foreground" : ""
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader className="flex">
                    <div className="flex items-center gap-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {user?.data?.username?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{user?.data?.username}</CardTitle>
                      <Button
                        size={"icon"}
                        variant={"secondary"}
                        onClick={() => setLogout((prev) => !prev)}
                      >
                        <HandWaving />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex w-full justify-end">
            <Link to={`/instruction`}>
              <Button className="flex gap-x-2">
                <Spade className="h-4 w-4" />
                <span>Play Game</span>
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      <Dialog open={isLogOut}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Off</DialogTitle>
            <DialogDescription>Do you want to sign off?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={_logOut}>
              Sign Out
            </Button>
            <Button
              variant="secondary"
              onClick={() => setLogout((prev) => !prev)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
