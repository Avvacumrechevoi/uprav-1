export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
            <div className="text-2xl md:text-3xl font-serif font-normal text-yasna-primary tracking-wide group-hover:text-yasna-accent transition-colors">Ясна</div>
            <div className="text-gray-300 text-xl md:text-2xl">|</div>
            <div className="flex flex-col">
              <div className="text-xs md:text-sm text-yasna-textMuted font-sans tracking-wide leading-tight">
                Русское учение
              </div>
              <div className="text-xs md:text-sm text-yasna-textMuted font-sans tracking-wide leading-tight">
                о жизни
              </div>
            </div>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-sans text-yasna-textPrimary hover:text-yasna-primary transition-colors">
              О проекте
            </a>
            <a href="#departments" className="text-sm font-sans text-yasna-textPrimary hover:text-yasna-primary transition-colors">
              Направления
            </a>
            <a href="#participate" className="text-sm font-sans text-yasna-textPrimary hover:text-yasna-primary transition-colors">
              Как участвовать
            </a>
            <a href="#join" className="text-sm font-sans text-yasna-primary font-semibold hover:text-yasna-accent transition-colors">
              Вступить
            </a>
          </nav>
          <a href="#join" className="md:hidden text-xs font-sans font-semibold px-3 py-2 bg-yasna-primary text-white rounded-lg hover:bg-yasna-accent transition-all duration-200">
            Вступить
          </a>
        </div>
      </div>
    </header>
  );
}
