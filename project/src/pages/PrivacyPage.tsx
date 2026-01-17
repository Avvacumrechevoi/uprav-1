export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-gray-700 leading-relaxed mb-8">
            Мы бережно относимся к личным данным участников и используем их только для связи по заявке и
            организации участия в направлениях Ясны.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Какие данные мы собираем</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Имя, которое вы указываете в форме.</li>
                <li>Контакт для связи (Telegram, почта или телефон).</li>
                <li>Выбранные направления и сообщение о вашем интересе.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Для чего мы используем данные</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Чтобы связаться с вами после отправки заявки.</li>
                <li>Чтобы уточнить детали участия и подобрать направление.</li>
                <li>Чтобы вести учёт заявок и улучшать процесс вступления.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Как мы храним и защищаем данные</h2>
              <p className="text-gray-700 leading-relaxed">
                Данные хранятся в защищённой базе и доступны только команде, отвечающей за обработку заявок.
                Мы не передаём их третьим лицам без вашего согласия.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Связь с нами</h2>
              <p className="text-gray-700 leading-relaxed">
                Если у вас есть вопросы по обработке данных, напишите нам через форму заявки — мы ответим и
                поможем разобраться.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
