import { RadialMap } from './RadialMap';

export function Hero() {
  return (
    <section id="departments" className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 md:px-6 bg-yasna-lightBg min-h-[100svh] flex items-center scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-[clamp(28px,4.5vw,56px)] font-serif font-normal text-yasna-primary mb-3 md:mb-5 leading-tight px-2">
            Выберите направление — и станьте частью команды
          </h1>
          <p className="text-[clamp(14px,2.1vw,20px)] text-yasna-textPrimary max-w-3xl mx-auto leading-relaxed px-4">
            8 направлений: история, язык, литература, здоровье, астрономия, праздники, путешествия, обучение. Найдите своё.
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <RadialMap />
        </div>

        <div className="text-center mb-4 md:mb-6">
          <p className="text-[clamp(12px,1.8vw,16px)] text-yasna-textMuted px-4">
            Нажмите на интересующее направление в круге и оставьте заявку.
          </p>
          <p className="text-[clamp(12px,1.8vw,16px)] text-yasna-textMuted px-4 mt-3">
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
