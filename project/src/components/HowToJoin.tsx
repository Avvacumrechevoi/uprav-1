import React from 'react';
import { Compass, Mail, Key, ArrowRight } from 'lucide-react';

const HowToJoin: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Выберите направление',
      icon: Compass,
      description: 'Изучите описания и найдите то, что откликается. Можно выбрать несколько.'
    },
    {
      number: '02',
      title: 'Оставьте заявку',
      icon: Mail,
      description: 'Мы свяжемся, расскажем подробнее о направлении и ответим на вопросы.'
    },
    {
      number: '03',
      title: 'Получите доступ',
      icon: Key,
      description: 'К закрытым материалам, встречам и сообществу выбранного направления.'
    }
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('join');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="how-to-join" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-yasna-accent rounded-full mb-6">
            <div className="w-2 h-2 bg-yasna-accent rounded-full"></div>
            <span className="text-sm font-sans font-medium text-yasna-accent uppercase tracking-widest-plus">
              Участие
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-normal text-yasna-primary mb-4">
            Три шага к участию
          </h2>

          <p className="text-xl text-yasna-textMuted max-w-2xl mx-auto">
            От выбора направления до участия — три шага
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.number}>
                  <div className="relative">
                    <div className="bg-white rounded-xl p-8 shadow-yasna hover:shadow-yasna-hover transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-7xl font-sans font-bold text-yasna-lightBg">
                          {step.number}
                        </span>
                        <div className="p-3 bg-yasna-lightBg rounded-xl">
                          <Icon className="w-6 h-6 text-yasna-primary" strokeWidth={1.5} />
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif font-medium text-yasna-primary mb-4">
                        {step.title}
                      </h3>

                      <p className="text-yasna-textMuted leading-relaxed flex-grow">
                        {step.description}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <>
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-6 h-6 text-yasna-accent" strokeWidth={2} />
                        </div>

                        <div className="md:hidden flex justify-center my-4">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-8 bg-yasna-accent"></div>
                            <ArrowRight className="w-5 h-5 text-yasna-accent transform rotate-90" strokeWidth={2} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-yasna-primary text-white font-sans font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
          >
            ВЫБРАТЬ НАПРАВЛЕНИЕ И ВСТУПИТЬ
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-sm text-yasna-textMuted">
            Обычно отвечаем в течение 2–3 дней
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
