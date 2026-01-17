import { BookOpen, Clock, Home } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Язык',
    description: 'Изначальные смыслы слов, сказок, песен, пословиц и поговорок'
  },
  {
    icon: Home,
    title: 'Уклад',
    description: 'Традиции, праздники, семейный лад — как жили предки'
  },
  {
    icon: Clock,
    title: 'История',
    description: 'Ненарушенная история славян и Руси — без чужих интерпретаций'
  }
];

export function AboutProject() {
  return (
    <section id="about" className="py-20 px-6 bg-yasna-warmBg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-sans font-medium tracking-widest-plus text-yasna-accent bg-white rounded-full">
            <div className="w-2 h-2 bg-yasna-accent rounded-full"></div>
            О ПРОЕКТЕ
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-yasna-primary mb-12">
            Что такое Ясна
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-yasna-textPrimary">
            <p className="text-xl font-serif">
              Ясна — русское учение о жизни.
            </p>
            <p>
              Это не наука и не религия. Это третий путь — способ понимать мир через язык,
              в котором сохранились знания наших предков.
            </p>
            <p>
              Мы изучаем архивы, восстанавливаем утерянные смыслы слов и преподаём то,
              что удалось сохранить.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-yasna hover:shadow-yasna-hover transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-yasna-primary group-hover:bg-yasna-primary transition-colors">
                    <Icon className="w-7 h-7 text-yasna-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-yasna-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-yasna-textMuted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <blockquote className="relative py-8 px-12 bg-white border-l-4 border-yasna-accent italic text-lg text-yasna-textPrimary leading-relaxed shadow-yasna font-serif">
            <p>
              «Русский язык — величайший дар, доставшийся нам от предков.
              В нём сохранились смыслы, образы и коды, которые мы возвращаем к жизни»
            </p>
          </blockquote>
        </div>

        <div className="text-center">
          <button className="px-8 py-3 border-2 border-yasna-primary text-yasna-primary hover:bg-yasna-primary hover:text-white font-sans font-semibold tracking-wide transition-all duration-300 rounded-lg">
            ПОДРОБНЕЕ О ПРОЕКТЕ
          </button>
        </div>
      </div>
    </section>
  );
}
