import { Department, DepartmentDetail, ParticipationPath } from './types';

export const departments: Department[] = [
  {
    name: 'Неглинка / 38 Меридиан',
    slug: 'neglinka',
    icon: '◈',
    shortDescription: 'Исследуем историю и географию, собираем целостную картину прошлого. Для тех, кто хочет понимать, а не просто знать.',
    formats: 'исследования • статьи • обсуждения • архивы',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496237/image_536_u1elrb.png',
    detailsUrl: '/napravleniya/neglinka'
  },
  {
    name: 'Извод',
    slug: 'izvod',
    icon: '◇',
    shortDescription: 'Глубинные смыслы слов и событий. Очевидное становится видимым, когда смотришь внимательно.',
    formats: 'статьи-исследования • смысловые разборы • длинные тексты',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496662/image_538_ktl6nb.png',
    detailsUrl: '/napravleniya/izvod'
  },
  {
    name: 'ЛитПроСвет',
    slug: 'litprosvet',
    icon: '❧',
    shortDescription: 'Солнечная сторона литературы. Учимся видеть ценности, композицию и язык в текстах — и писать свои.',
    formats: 'читательский клуб • курсы письма • разборы • литературные игры',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768576250/LitProSvet_avatar_circle_1024_baaylk.png',
    detailsUrl: '/napravleniya/litprosvet'
  },
  {
    name: 'Астроневод',
    slug: 'astronevod',
    icon: '☆',
    shortDescription: 'Космос и циклы времени. Астрономия на стыке науки и смысла — для тех, кто смотрит на небо с вопросами.',
    formats: 'исследования • статьи • наблюдения • разборы',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768495469/photo_2026-01-15_19.32.37_1_onixwe.png',
    detailsUrl: '/napravleniya/astronevod'
  },
  {
    name: 'Джива',
    slug: 'jiva',
    icon: '❋',
    shortDescription: 'Здоровье как живая система. Ритмы, дыхание, сила жизни — целостный взгляд на тело и здоровье.',
    formats: 'практики • исследования • просвещение',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768497080/image_542_zboton.png',
    detailsUrl: '/napravleniya/jiva'
  },
  {
    name: 'Праздники Словены Ясны',
    slug: 'prazdniki',
    icon: '✧',
    shortDescription: 'Красота как мера. Возвращаем праздники, обряды и встречи — годовой круг, который наполняет жизнь смыслом.',
    formats: 'праздники • балы • встречи • годовой круг',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496924/image_540_gg2hjy.png',
    detailsUrl: '/napravleniya/prazdniki'
  },
  {
    name: 'Ясные маршруты',
    slug: 'yasnye-marshruty',
    icon: '↗',
    shortDescription: 'Натурные уроки. Москва, Петербург, города России — путешествия, в которых пространство становится учителем.',
    formats: 'прогулки • экскурсии • квесты • поездки',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496330/photo_2026-01-15_19.58.18_1_hy9dtg.png',
    detailsUrl: '/napravleniya/yasnye-marshruty'
  },
  {
    name: 'Ясна-Школа',
    slug: 'yasna-shkola',
    icon: '▣',
    shortDescription: 'Обучение для тех, кто хочет глубже. Курсы, практикумы и подготовка к работе в любом направлении Ясны.',
    formats: 'курсы • семинары • практикумы • встречи',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768497010/image_541_gxiuqa.png',
    detailsUrl: '/napravleniya/yasna-shkola'
  },
  {
    name: 'Ясна. Архитектура',
    slug: 'yasna-architecture',
    icon: '△',
    shortDescription: 'Пространство как язык. Формы, города, символы — читаем архитектуру как текст о человеке и культуре.',
    formats: 'исследования • разборы • экскурсии • статьи',
    detailsUrl: '/napravleniya/yasna-architecture'
  }
];

export const departmentDetails: Record<string, DepartmentDetail> = {
  neglinka: {
    title: 'Неглинка / ИЦ «38 Меридиан»',
    subtitle: 'Проясняем историю и географию. Формируем образ будущего на основе изучения прошлого.',
    about: [
      'Исследовательский центр «38 Меридиан» изучает историю и географию методом Ясны — через язык, логику развития и связи между названиями, реками, землями и народами.',
      'Для всё большего числа людей очевидно, что в современной научной истории много нестыковок и белых пятен. Особенно неприятно, что в той истории нет нас — русских, таких, в которых мы бы узнали сами себя.',
      'Мы исследуем естественный ход развития с давних времён, опираясь на логику исторического развития, сведения разных областей знаний и композицию. Многое уже разгадано, но есть ещё много непознанного и неожиданного.'
    ],
    formats: [
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
    ],
    topics: [
      'Три Руси: Великая Русь (Волга), Малая Русь (Днепр), Белая Русь (Западная Двина)',
      'Русская география: «белые» и «чёрные» реки, стороны света',
      'Происхождение названий: Азия, Арья, Манчжурия, Кавказ',
      'Валдайская возвышенность как исток трёх рек и русского мира',
      'Топонимика и логика исторического развития'
    ],
    specialists: [
      'Картографов',
      'Геральдистов',
      'Переводчиков с древних языков',
      'Астрономов',
      'Геодезистов',
      'Архивариусов',
      'Лингвистов'
    ],
    materials: [
      '«Волга — не река, а страна. Что скрывают названия»',
      '«Почему Белое море и Чёрное море так называются»',
      '«Три Руси: Великая, Малая и Белая — это реки»',
      '«Азия — от реки Аза. Как Волга дала имя континенту»',
      '«Манчжурия — это Маныч Восточный»',
      '«Русская география: восток, запад, чёрная и белая стороны»'
    ],
    resources: [
      {
        label: 'Telegram',
        url: 'https://t.me/neglinka78'
      }
    ]
  }
};

export const participationPaths: ParticipationPath[] = [
  {
    title: 'Материалы',
    icon: '◯',
    description: 'Статьи, видео, публикации. Изучать в своём темпе, формировать понимание'
  },
  {
    title: 'Обучение',
    icon: '◻',
    description: 'Курсы и семинары Ясна-Школы. Осваивать методы, получать знания системно'
  },
  {
    title: 'Встречи',
    icon: '◇',
    description: 'Обсуждения, события, праздники. Общаться с единомышленниками вживую'
  },
  {
    title: 'Работа в команде',
    icon: '✦',
    description: 'Исследования, создание материалов. Вносить свой вклад в одно из направлений'
  }
];
