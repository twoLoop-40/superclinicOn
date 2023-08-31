"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@lib/utils";
import { useRouter } from "next/navigation";

const GoNext = ({ className }: { className?: string }) => {
  const router = useRouter();
  const onRightArrowClick = () => {
    router.forward();
  };
  return (
    <div
      onClick={onRightArrowClick}
      className={cn(
        "text-white font-bold cursor-pointer hover:text-gray-300",
        className
      )}
    >
      <ChevronRightIcon className='h-6 w-6' />
    </div>
  );
};

export default GoNext;
