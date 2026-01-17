import { InteractiveCircle } from './InteractiveCircle';

export function Hero() {
  return (
    <section id="departments" className="pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 bg-yasna-lightBg min-h-screen flex items-center scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-yasna-primary mb-4 md:mb-6 leading-tight px-2">
            Выберите направление — и станьте частью команды
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-yasna-textPrimary max-w-3xl mx-auto leading-relaxed px-4">
            9 направлений: история, язык, литература, здоровье, астрономия, архитектура, праздники, путешествия, обучение. Найдите своё.
          </p>
        </div>

        <div className="mb-8 md:mb-12">
          <InteractiveCircle />
        </div>

        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm md:text-base text-yasna-textMuted px-4">
            Нажмите на интересующее направление в круге и оставьте заявку.
          </p>
          <p className="text-sm md:text-base text-yasna-textMuted px-4 mt-3">
            Не знаете, что выбрать?{' '}
            <a href="#join" className="text-yasna-primary hover:text-yasna-accent underline font-medium transition-colors">
              Поможем подобрать
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
