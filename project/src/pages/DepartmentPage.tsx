import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { departmentDetails, departments } from '../data';

export function DepartmentPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const department = departments.find((dept) => dept.slug === slug);

  const pageData = useMemo(() => {
    if (!department) return null;

    const details = departmentDetails[department.slug];
    const fallbackAbout = [
      `${department.name} — направление Ясны.`,
      department.shortDescription,
      `Форматы участия: ${department.formats}.`
    ];

    const parsedFormats = department.formats
      .split('•')
      .map((format) => format.trim())
      .filter(Boolean)
      .map((title) => ({ title }));

    return {
      title: details?.title ?? department.name,
      subtitle: details?.subtitle ?? department.shortDescription,
      about: details?.about && details.about.length > 0 ? details.about : fallbackAbout,
      formats: details?.formats && details.formats.length > 0 ? details.formats : parsedFormats,
      topics: details?.topics ?? [],
      specialists: details?.specialists ?? [],
      materials: details?.materials ?? [],
      resources: details?.resources ?? []
    };
  }, [department]);

  if (!department || !pageData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Направление не найдено</h1>
          <p className="text-gray-600 mb-6">
            Проверьте ссылку или вернитесь на главную страницу, чтобы выбрать направление.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  const hasFormatDescriptions = pageData.formats.some((format) => Boolean(format.description));

  const handleJoinClick = () => {
    navigate(`/?department=${department.slug}#join`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-700 mb-12">
          <button onClick={() => navigate('/')} className="hover:text-blue-900 transition-colors">
            Главная
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-500">Направления</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{department.name}</span>
        </nav>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6 shadow-lg">
            <span className="text-4xl text-white">{department.icon}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageData.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">О направлении</h2>
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
            {pageData.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Чем занимаемся</h2>
          {hasFormatDescriptions ? (
            <div className="grid md:grid-cols-2 gap-6">
              {pageData.formats.map((format, index) => (
                <div key={`${format.title}-${index}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{format.title}</h3>
                  {format.description && (
                    <p className="text-gray-600 leading-relaxed">{format.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {pageData.formats.map((format, index) => (
                <span key={`${format.title}-${index}`} className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-sm border border-gray-200 font-medium">
                  {format.title}
                </span>
              ))}
            </div>
          )}
        </section>

        {pageData.topics.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ключевые темы</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <ul className="space-y-4">
                {pageData.topics.map((topic, index) => (
                  <li key={`${topic}-${index}`} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {pageData.specialists.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Кого ищем в команду</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm p-8">
              <p className="text-gray-700 mb-6 leading-relaxed">
                В команде направления есть место специалистам из разных областей. Мы будем рады принять:
              </p>
              <div className="flex flex-wrap gap-3">
                {pageData.specialists.map((specialist, index) => (
                  <span key={`${specialist}-${index}`} className="px-4 py-2 bg-white text-gray-800 rounded-full shadow-sm border border-gray-200 font-medium">
                    {specialist}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {pageData.materials.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Материалы направления</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {pageData.materials.map((material, index) => (
                <div key={`${material}-${index}`} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                  <p className="text-gray-800 group-hover:text-blue-900 transition-colors leading-relaxed">{material}</p>
                </div>
              ))}
            </div>
            {pageData.resources.length > 0 && (
              <a
                href={pageData.resources[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-900 hover:text-blue-700 font-semibold transition-colors"
              >
                Все материалы
                <ChevronRight className="w-5 h-5 ml-1" />
              </a>
            )}
          </section>
        )}

        {pageData.resources.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ресурсы</h2>
            <div className="flex flex-col gap-4">
              {pageData.resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{resource.label}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-900">{resource.url.replace('https://', '')}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 text-white">Присоединиться к направлению</h2>
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
