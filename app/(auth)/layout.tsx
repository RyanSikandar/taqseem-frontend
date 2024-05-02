const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center px-8 py-2 bg-[#EEEEEE]">{children}</div>
  );
};

export default AuthLayout;
