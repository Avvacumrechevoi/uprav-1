import { participationPaths } from '../data';

export function ParticipationPaths() {
  return (
    <section id="participate" className="py-20 px-6 bg-yasna-lightBg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-sans font-medium tracking-widest-plus text-yasna-primary bg-white rounded-full">
            <div className="w-2 h-2 bg-yasna-primary rounded-full"></div>
            ФОРМАТЫ
          </div>
          <h2 className="text-4xl font-serif font-normal text-yasna-primary mb-4">
            Как можно участвовать
          </h2>
          <p className="text-lg text-yasna-textMuted max-w-2xl mx-auto">
            Четыре формата — от изучения материалов до работы в команде
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {participationPaths.map((path, index) => (
            <div
              key={index}
              className="group p-8 bg-white hover:bg-yasna-primary rounded-xl shadow-yasna hover:shadow-yasna-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-6 text-yasna-primary group-hover:text-yasna-accent transition-colors duration-300">
                {path.icon}
              </div>
              <h3 className="text-xl font-serif font-medium text-yasna-primary group-hover:text-white mb-4 transition-colors duration-300">
                {path.title}
              </h3>
              <p className="text-yasna-textMuted group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                {path.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
