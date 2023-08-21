const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100 p-4'>
      {children}
    </div>
  );
};

export default Layout;
