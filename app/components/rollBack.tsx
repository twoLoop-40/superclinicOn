"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const RollBack = () => {
  const router = useRouter();
  const onLeftArrowClick = () => {
    router.back();
  };
  const onRightArrowClick = () => {
    router.forward();
  };
  return (
    <>
      <div
        onClick={onLeftArrowClick}
        className='text-white font-bold absolute left-3 cursor-pointer hover:text-gray-300'
      >
        <ChevronLeftIcon className='h-6 w-6' />
      </div>
      <div
        onClick={onRightArrowClick}
        className='text-white font-bold absolute left-8 cursor-pointer hover:text-gray-300'
      >
        <ChevronRightIcon className='h-6 w-6' />
      </div>
    </>
  );
};

export default RollBack;
