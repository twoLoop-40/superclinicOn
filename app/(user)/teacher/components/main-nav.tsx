"use client";
import { optionalExcute } from "@lib/excuteFromCondition";
import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MainNavProps = {
  className?: string;
};
export const MainNav = ({ className }: MainNavProps) => {
  const pathname = usePathname();
  const muteText = optionalExcute(
    () => "text-muted-foreground",
    () => "font-bold text-indigo-500"
  );

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href='/teacher'
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          muteText(pathname !== "/teacher")()
        )}
      >
        오늘의 미션
      </Link>
      <Link
        href='/teacher/students'
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          muteText(pathname !== "/teacher/students")()
        )}
      >
        학생관리
      </Link>
      <Link
        href='/teacher/classes'
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          muteText(pathname !== "/teacher/classes")()
        )}
      >
        수업관리
      </Link>
    </nav>
  );
};

export default MainNav;
