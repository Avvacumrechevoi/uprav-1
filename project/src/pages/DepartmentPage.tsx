import { useNavigate } from 'react-router-dom';
import { ChevronRight, Globe, ExternalLink } from 'lucide-react';

export function DepartmentPage() {
  const navigate = useNavigate();

  const formats = [
    {
      title: 'Исследования',
      description: 'Изучаем белые пятна истории: названия рек, земель, народов. Работаем с картами, источниками, языком'
    },
    {
      title: 'Статьи и публикации',
      description: 'Регулярные материалы в Telegram-канале — разборы, находки, открытия'
    },
    {
      title: 'География через язык',
      description: 'Почему Волга — это Русь, Азия — от реки Аза, а Белоруссия — от Белой Руси'
    },
    {
      title: 'Обсуждения',
      description: 'Закрытые встречи участников направления — делимся находками, разбираем вопросы'
    }
  ];

  const topics = [
    'Три Руси: Великая Русь (Волга), Малая Русь (Днепр), Белая Русь (Западная Двина)',
    'Русская география: «белые» и «чёрные» реки, стороны света',
    'Происхождение названий: Азия, Арья, Манчжурия, Кавказ',
    'Валдайская возвышенность как исток трёх рек и русского мира',
    'Топонимика и логика исторического развития'
  ];

  const specialists = [
    'Картографов',
    'Геральдистов',
    'Переводчиков с древних языков',
    'Астрономов',
    'Геодезистов',
    'Архивариусов',
    'Лингвистов'
  ];

  const materials = [
    '«Волга — не река, а страна. Что скрывают названия»',
    '«Почему Белое море и Чёрное море так называются»',
    '«Три Руси: Великая, Малая и Белая — это реки»',
    '«Азия — от реки Аза. Как Волга дала имя континенту»',
    '«Манчжурия — это Маныч Восточный»',
    '«Русская география: восток, запад, чёрная и белая стороны»'
  ];

  const handleJoinClick = () => {
    navigate('/?section=application&department=neglinka');
    setTimeout(() => {
      const form = document.getElementById('application');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <button onClick={() => navigate('/')} className="hover:text-blue-900 transition-colors">
            Главная
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Направления</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Неглинка / 38 Меридиан</span>
        </nav>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6 shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Неглинка / ИЦ «38 Меридиан»
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Проясняем историю и географию. Формируем образ будущего на основе изучения прошлого.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">О направлении</h2>
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              Исследовательский центр «38 Меридиан» изучает историю и географию методом Ясны — через язык, логику развития и связи между названиями, реками, землями и народами.
            </p>
            <p>
              Для всё большего числа людей очевидно, что в современной научной истории много нестыковок и белых пятен. Особенно неприятно, что в той истории нет нас — русских, таких, в которых мы бы узнали сами себя.
            </p>
            <p>
              Мы исследуем естественный ход развития с давних времён, опираясь на логику исторического развития, сведения разных областей знаний и композицию. Многое уже разгадано, но есть ещё много непознанного и неожиданного.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Чем занимаемся</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formats.map((format, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{format.title}</h3>
                <p className="text-gray-600 leading-relaxed">{format.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ключевые темы</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <ul className="space-y-4">
              {topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Кого ищем в команду</h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm p-8">
            <p className="text-gray-700 mb-6 leading-relaxed">
              В центре «38 Меридиан» трудятся специалисты из разных областей. Мы будем рады принять в команду:
            </p>
            <div className="flex flex-wrap gap-3">
              {specialists.map((specialist, index) => (
                <span key={index} className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-sm border border-gray-200 font-medium">
                  {specialist}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Материалы направления</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                <p className="text-gray-800 group-hover:text-blue-900 transition-colors leading-relaxed">{material}</p>
              </div>
            ))}
          </div>
          <a
            href="https://t.me/neglinka78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-900 hover:text-blue-700 font-semibold transition-colors"
          >
            Все материалы
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ресурсы</h2>
          <a
            href="https://t.me/neglinka78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Telegram</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-900">t.me/neglinka78</div>
              </div>
            </div>
          </a>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Присоединиться к направлению</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Дорогу осилит идущий — знающий свою настоящую историю. Оставьте заявку, и мы расскажем, как стать участником исследований.
            </p>
            <button
              onClick={handleJoinClick}
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Оставить заявку
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
