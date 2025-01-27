import {
  LayoutGrid,
  LucideIcon,
  LandPlot,
  UsersRound,
  AreaChart,
  FormInput,
  GitPullRequest,
  Building2,
  ScanBarcode,
  User2Icon,
  User,
  Users,
  Banknote,
} from "lucide-react";

export type Role = "admin" | "superadmin" | "enumerator";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  roles?: Role[];
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  roles?: Role[];
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const menuConfig: Menu[] = [
  {
    href: "/",
    label: "Home",
    icon: LayoutGrid,
    roles: ["admin"],
  },
 {
    href: "/users",
    label: "Users",
    icon: UsersRound,
    roles: ["admin"],
    submenus: [],
  },
    {
    href: "/individual",
    label: "Individual",
    icon: User,
    roles: ["admin"],
  },
 {
    href: "/family",
    label: "Families",
    icon:Users,
    roles: ["admin"],
  },
 {
    href: "/businesses",
    label: "Businesses",
    icon:Banknote,
    roles: ["admin"],
  },

];

export function getMenuList(pathname: string, userRole: Role): Group[] {
  const filteredMenus = menuConfig.filter(
    (menu) => !menu.roles || menu.roles.includes(userRole),
  );

  return [
    {
      groupLabel: "",
      menus: filteredMenus,
    },
  ];
}
