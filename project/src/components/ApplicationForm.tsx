import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { departments } from '../data';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    departments: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const deptParam = searchParams.get('department');
    if (!deptParam) return;
    const matchedDepartment = departments.find((dept) => dept.slug === deptParam);
    if (!matchedDepartment) return;

    setFormData(prev => ({
      ...prev,
      departments: [matchedDepartment.name]
    }));
  }, [searchParams]);

  const handleCheckboxChange = (deptName: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(deptName)
        ? prev.departments.filter(d => d !== deptName)
        : [...prev.departments, deptName]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact) {
      setSubmitStatus('error');
      setErrorMessage('Пожалуйста, заполните имя и контакт');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            name: formData.name,
            contact: formData.contact,
            departments: formData.departments,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        contact: '',
        departments: [],
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="py-20 px-6 bg-yasna-darkBg scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-sans font-medium tracking-widest-plus text-yasna-accent bg-white/10 rounded-full">
            <div className="w-2 h-2 bg-yasna-accent rounded-full"></div>
            ВСТУПЛЕНИЕ
          </div>
          <h2 className="text-4xl font-serif font-normal text-white mb-4">
            Стать участником Ясны
          </h2>
          <p className="text-lg text-white/80">
            Заполните форму — мы свяжемся с вами и расскажем о ближайших шагах
          </p>
        </div>

        <form id="application" onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl rounded-xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-sans font-medium text-yasna-textPrimary mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Как к вам обращаться"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yasna-primary focus:ring-2 focus:ring-yasna-primary/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-sans font-medium text-yasna-textPrimary mb-2">
                Контакт
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="Telegram, почта или телефон"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yasna-primary focus:ring-2 focus:ring-yasna-primary/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-yasna-textPrimary mb-3">
                Интересующие направления
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {departments.map((dept, index) => (
                  <label
                    key={index}
                    className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-yasna-accent hover:bg-yasna-lightBg cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.departments.includes(dept.name)}
                      onChange={() => handleCheckboxChange(dept.name)}
                      className="mt-1 w-4 h-4 text-yasna-primary border-gray-300 rounded focus:ring-yasna-primary"
                    />
                    <span className="text-sm text-yasna-textPrimary leading-relaxed">
                      {dept.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-sans font-medium text-yasna-textPrimary mb-2">
                С чем вы приходите
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Что хотите исследовать, чем можете быть полезны, что привело вас к Ясне"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yasna-primary focus:ring-2 focus:ring-yasna-primary/20 outline-none transition-all resize-none"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-yasna-primary hover:bg-yasna-accent text-white font-sans font-semibold tracking-wide rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
