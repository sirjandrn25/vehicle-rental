"use client";
import {
  AppWindow,
  ArrowDownWideNarrow,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Coins,
  Command,
  CreditCard,
  DollarSign,
  Filter,
  LayoutDashboard,
  LogOut,
  Minus,
  MoreHorizontal,
  PackageSearch,
  Pencil,
  Plus,
  ReplaceAll,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  User2,
  Users,
  X,
} from "lucide-react";

export const UserIcon = User2;
export const DashboardIcon = LayoutDashboard;
export const LogoutIcon = LogOut;
export const SettingsIcon = Settings;

export const IconAssets = {
  person: User2,
  billing: AppWindow,
  store: ShoppingBag,
  dollor: DollarSign,
  chevron_right: ChevronsRight,
  shopping_cart: ShoppingCart,
  plus: Plus,
  minus: Minus,
  close: X,
  trash_solid: Trash2,
  cash_on_delivery: Coins,
  credit_card: CreditCard,
  edit_pencil: Pencil,
  more_horizontal: MoreHorizontal,
  users: Users,
  check: Check,
  filter: Filter,
  sort: ArrowDownWideNarrow,
  command: Command,
  placeholder: ReplaceAll,

  single_chevron_left: ChevronLeft,
  single_chevron_right: ChevronRight,
  dashboard: LayoutDashboard,
  products: PackageSearch,
  settings: Settings,
};

export type IconAssetsType = keyof typeof IconAssets;

export type iconType = {
  source?: IconAssetsType;
  size?: number;
  className?: string;
  onClick?: () => void;
};
