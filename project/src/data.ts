import { Department, ParticipationPath } from './types';

export const departments: Department[] = [
  {
    name: 'Неглинка / 38 Меридиан',
    icon: '◈',
    shortDescription: 'Исследуем историю и географию, собираем целостную картину прошлого. Для тех, кто хочет понимать, а не просто знать.',
    formats: 'исследования • статьи • обсуждения • архивы',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496237/image_536_u1elrb.png',
    detailsUrl: '/napravleniya/neglinka'
  },
  {
    name: 'Извод',
    icon: '◇',
    shortDescription: 'Глубинные смыслы слов и событий. Очевидное становится видимым, когда смотришь внимательно.',
    formats: 'статьи-исследования • смысловые разборы • длинные тексты',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496662/image_538_ktl6nb.png',
    detailsUrl: '#'
  },
  {
    name: 'ЛитПроСвет',
    icon: '❧',
    shortDescription: 'Солнечная сторона литературы. Учимся видеть ценности, композицию и язык в текстах — и писать свои.',
    formats: 'читательский клуб • курсы письма • разборы • литературные игры',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768576250/LitProSvet_avatar_circle_1024_baaylk.png',
    detailsUrl: '#'
  },
  {
    name: 'Астроневод',
    icon: '☆',
    shortDescription: 'Космос и циклы времени. Астрономия на стыке науки и смысла — для тех, кто смотрит на небо с вопросами.',
    formats: 'исследования • статьи • наблюдения • разборы',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768495469/photo_2026-01-15_19.32.37_1_onixwe.png',
    detailsUrl: '#'
  },
  {
    name: 'Джива',
    icon: '❋',
    shortDescription: 'Здоровье как живая система. Ритмы, дыхание, сила жизни — целостный взгляд на тело и здоровье.',
    formats: 'практики • исследования • просвещение',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768497080/image_542_zboton.png',
    detailsUrl: '#'
  },
  {
    name: 'Праздники Словены Ясны',
    icon: '✧',
    shortDescription: 'Красота как мера. Возвращаем праздники, обряды и встречи — годовой круг, который наполняет жизнь смыслом.',
    formats: 'праздники • балы • встречи • годовой круг',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496924/image_540_gg2hjy.png',
    detailsUrl: '#'
  },
  {
    name: 'Ясные маршруты',
    icon: '↗',
    shortDescription: 'Натурные уроки. Москва, Петербург, города России — путешествия, в которых пространство становится учителем.',
    formats: 'прогулки • экскурсии • квесты • поездки',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768496330/photo_2026-01-15_19.58.18_1_hy9dtg.png',
    detailsUrl: '#'
  },
  {
    name: 'Ясна-Школа',
    icon: '▣',
    shortDescription: 'Обучение для тех, кто хочет глубже. Курсы, практикумы и подготовка к работе в любом направлении Ясны.',
    formats: 'курсы • семинары • практикумы • встречи',
    imageUrl: 'https://res.cloudinary.com/dpyb7glyf/image/upload/v1768497010/image_541_gxiuqa.png',
    detailsUrl: '#'
  },
  {
    name: 'Ясна. Архитектура',
    icon: '△',
    shortDescription: 'Пространство как язык. Формы, города, символы — читаем архитектуру как текст о человеке и культуре.',
    formats: 'исследования • разборы • экскурсии • статьи',
    detailsUrl: '#'
  }
];

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
