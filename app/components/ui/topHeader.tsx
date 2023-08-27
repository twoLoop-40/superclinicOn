import RollBack from "@components/rollBack";
import Link from "next/link";

type TopHeaderProps = {
  title: string;
};
const TopHeader = ({ title }: TopHeaderProps) => {
  return (
    <header className='w-screen z-10 relative'>
      <nav aria-label='Top'>
        {/* Top navigation */}
        <div className='bg-gray-700 '>
          <div className='mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
            <RollBack />
            <p className='flex-1 text-center text-sm font-medium text-white lg:flex-none'>
              {title}
            </p>

            <div className='flex flex-1 items-center justify-end space-x-6'>
              <Link
                href='/logout'
                className='text-sm font-medium text-white hover:text-gray-100'
              >
                로그아웃
              </Link>

              <span className='h-6 w-px  bg-gray-400' aria-hidden='true' />
              <Link
                href='/login'
                className='text-sm font-medium text-white hover:text-gray-100'
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopHeader;
