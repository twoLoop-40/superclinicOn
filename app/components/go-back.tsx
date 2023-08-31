"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { cn } from "@lib/utils";
import { useRouter } from "next/navigation";

const GoBack = ({ className }: { className?: string }) => {
  const router = useRouter();
  const onLeftArrowClick = () => {
    router.back();
  };
  return (
    <div
      onClick={onLeftArrowClick}
      className={cn("font-bold cursor-pointer hover:text-gray-300", className)}
    >
      <ChevronLeftIcon className='h-6 w-6' />
    </div>
  );
};

export default GoBack;
