type HeaderProps = {
  breadcrumb: string[];
  greeting: string;
};

export function Header({ breadcrumb, greeting }: HeaderProps) {
  return (
    <header className="mb-4 sm:mb-5">
      <div className="mb-4 flex items-center gap-2 text-base sm:mb-5 sm:text-[20px] md:text-[28px]">
        <span className="font-semibold text-slate-800">{breadcrumb[0]}</span>
        <span className="text-slate-400">/</span>
        <span className="text-slate-500">{breadcrumb[1]}</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-800 sm:text-[28px] md:text-[34px]">
        {greeting} <span aria-hidden="true">👋</span>
      </h1>
    </header>
  );
}
