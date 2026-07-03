import { Link } from "@tanstack/react-router";
import { LayoutDashboard, PlusCircle, ArrowLeftRight } from "lucide-react";
import clsx from "clsx";
import { useBankName } from "@/hooks/useAccount";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/open-account", label: "Open Account", icon: PlusCircle },
  { to: "/transfer", label: "Transfer", icon: ArrowLeftRight },
];

export function Header() {
  const { data } = useBankName();
  const bankName = data?.bankName;
  const description = data?.description;

  return (
    <header className="sticky top-0 z-40 border-b-4 border-gold bg-navy-gradient">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="12"
              stroke="#D4A853"
              strokeWidth="2.5"
            />
            <path
              d="M14 32V16L24 23L34 16V32"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="32" r="3" fill="#D4A853" />
            <path
              d="M24 19L24 23"
              stroke="#D4A853"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-[4px] text-gold uppercase">
              {bankName || "PRESTIGE"}
              {/* Akanbi Digital Solutions */}
            </p>
            <p className="text-[10px] tracking-[2px] text-white/50">
              {description || "BANKING SUITE · NIGERIA"}
              {/* Simple Digital banking with ADS */}
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 transition-colors",
                "hover:bg-white/10 hover:text-white",
              )}
              activeProps={{ className: "!text-gold bg-white/5" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
