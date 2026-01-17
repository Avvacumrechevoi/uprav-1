import { Link } from 'react-router-dom';
import { Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacts" className="bg-yasna-darkBg py-16 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <div className="text-3xl font-serif font-normal text-white mb-2">Ясна</div>
            <p className="text-white/70 text-sm font-sans">
              Русское учение о жизни
            </p>
          </div>

          <div className="flex flex-col space-y-3 mt-6 md:mt-0">
            <a
              href="https://youtube.com/@russkaya_yasna?si=cpW2LJeBfAg63-gL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 font-sans text-white/80 hover:text-yasna-accent transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </a>
            <a
              href="https://vk.ru/yasnaslovo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 font-sans text-white/80 hover:text-yasna-accent transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.8 7.2c.2.5.2 1.8.2 1.8s0 1.3-.2 1.8c-.2.5-.5.9-1 1.1-.5.2-12.8.2-12.8.2s-12.3 0-12.8-.2c-.5-.2-.8-.6-1-1.1C4 10.3 4 9 4 9s0-1.3.2-1.8c.2-.5.5-.9 1-1.1C5.7 6 18 6 18 6s12.3 0 12.8.2c.5.1.8.5 1 1z"/>
              </svg>
              <span>VK</span>
            </a>
            <a
              href="https://vkvideo.ru/@yasnaslovo?sh=6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 font-sans text-white/80 hover:text-yasna-accent transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.95 10.24l-3.32 3.32c-.4.4-.94.61-1.48.61-.54 0-1.08-.21-1.48-.61l-1.1-1.1-.01.01-1.1 1.1c-.4.4-.94.61-1.48.61-.54 0-1.08-.21-1.48-.61l-3.32-3.32c-.81-.81-.81-2.13 0-2.95.81-.81 2.13-.81 2.95 0l1.84 1.84 1.84-1.84.01-.01 1.84-1.84c.81-.81 2.13-.81 2.95 0 .4.4.62.94.62 1.48s-.22 1.08-.62 1.48l-1.84 1.84 1.84 1.84c.81.82.81 2.14 0 2.96z"/>
              </svg>
              <span>VK Видео</span>
            </a>
            <a
              href="https://dzen.ru/russkaya_yasna"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 font-sans text-white/80 hover:text-yasna-accent transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.8 7.2c.2.5.2 1.8.2 1.8s0 1.3-.2 1.8c-.2.5-.5.9-1 1.1-.5.2-12.8.2-12.8.2s-12.3 0-12.8-.2c-.5-.2-.8-.6-1-1.1C4 10.3 4 9 4 9s0-1.3.2-1.8c.2-.5.5-.9 1-1.1C5.7 6 18 6 18 6s12.3 0 12.8.2c.5.1.8.5 1 1z"/>
              </svg>
              <span>Дзен</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mb-8">
          <nav className="flex flex-wrap justify-center gap-8 font-sans text-white/70">
            <Link to="/#about" className="hover:text-yasna-accent transition-colors">О проекте</Link>
            <Link to="/#departments" className="hover:text-yasna-accent transition-colors">Направления</Link>
            <Link to="/#how-to-join" className="hover:text-yasna-accent transition-colors">Как участвовать</Link>
            <Link to="/#contacts" className="hover:text-yasna-accent transition-colors">Контакты</Link>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-sans text-white/60 space-y-2 md:space-y-0">
          <p>&copy; 2025 Ясна-Центр</p>
          <Link to="/privacy" className="hover:text-yasna-accent transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
