import { departments } from '../data';

export function Departments() {
  return (
    <section id="departments" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-[0.2em] text-blue-900 bg-blue-100 rounded-full">
            НАПРАВЛЕНИЯ
          </div>
          <h2 className="text-4xl font-light text-blue-900 mb-4">
            Структура проекта
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Девять направлений работы — от языка до путешествий
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-5xl mb-4 text-blue-900 group-hover:scale-110 transition-transform duration-300">
                {dept.icon}
              </div>
              <h3 className="text-xl font-medium text-blue-900 mb-3 leading-snug">
                {dept.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {dept.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
