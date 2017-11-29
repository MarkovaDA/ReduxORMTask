export const  bootstrap = (schema) => {
  //тестовые данные для работы системы
  const state = schema.getEmptyState();

  const session = schema.withMutations(state);

  const { Category, Employee, Estimate, Position, Skill} = session;

  const positions = [
    {title: 'HR-Менеджер'},
    {title: 'Системный администратор'},
    {title: 'Младший инженер-программист'},
    {title: 'инженер-программист'},
    {title: 'старший инженер-программист'},
    {title: 'тестировщик'}
   ];

  positions.forEach((item) => {
   Position.create(item);
  });

  const estimates = [
    {value: 3, description: 'удовлетворительно'},
    {value: 4, description: 'хорошо'},
    {value: 5, description: 'отлично'}
  ];

  estimates.forEach((item) => {
    Estimate.create(item);
  });

  const categories = [
    {title:'Java'},
    {title: 'Spring'},
    {title: 'Hibernate'},
    {title: 'iBatis'},
    {title: 'Oracle'},
    {title: 'JavaScript'},
    {title: 'ReactJS'},
    {title: 'Riot'},
    {title: 'Angular'},
    {title: 'Redux'},
  ];

  categories.forEach((item) => {
    Category.create(item);
  });


  for(let i=0; i < categories.length; i++) {
    for(let j=0; j < estimates.length; j++) {
      Skill.create({
        category: i,
        estimate: j
      });
    }
  }
  const employees = [
    'Мухин Демьян',
    'Бобылёв Анатолий',
    'Гаврилова Галина',
    'Белова Виктория',
    'Ларионова Евгения',
    'Никонов Авксентий',
    'Герасимов Герман',
    'Карпов Михаил',
    'Селезнёв Улеб',
    'Исаева Елена',
    'Исаев Гордей',
    'Воронов Бронислав',
    'Блохин Эдуард',
    'Лыткина Анжелика',
    'Воробьёв Куприян',
    'Медведьев Владислав',
    'Смирнов Макар',
    'Носова Жанна',
    'Сазонов Евгений',
    'Тарасова Октябрина',
    'Галкин Эдуард',
    'Никитина Ульяна',
    'Бурова София',
    'Зиновьев Александр',
    'Рогов Агафон',
    'Баранов Алексей',
    'Соболева Людмила',
    'Михайлова Вероника',
    'Белозёрова Кира',
    'Самойлов Кондрат',
    'Трофимова Светлана',
    'Кабанов Виктор',
    'Фадеев Антон',
    'Кондратьева Лукия',
    'Фомичёв Эдуард',
    'Воронова Вероника',
    'Лаврентьева Октябрина',
    'Филиппова Элеонора',
    'Назарова Оксана',
    'Павлова Иванна',
    'Наумов Дмитрий',
    'Овчинникова Октябрина',
    'Дьячкова Василиса',
    'Воронцова Анжелика',
    'Ситникова Венера',
    'Исаков Алексей',
    'Лобанова Марфа',
    'Сысоев Всеволод',
    'Гаврилова Дарья',
    'Русаков Илья',
    'Петухов Григорий',
    'Мартынова Валентина',
    'Гаврилов Владимир',
    'Матвеева Анжелика',
    'Королёв Агафон',
    'Потапова Нина',
    'Зыкова Венера',
    'Казакова Евпраксия',
    'Горшкова Евдокия',
    'Муравьёва Анна'
  ];

  employees.forEach((item) => {
    const fio = item.split(' ');

    let employee = Employee.create({
      surname: fio[0],
      name: fio[1],
    });
    //число занимаемых должностей
    const positionCount = randomIntFromInterval(1,3);
    const step = estimates.length;

    //рандомным образом распределяем должности
    for(let i = 0 ; i < positionCount; i++) {
      employee.positions.add(session.Position.at(i));
    }
    //кол-во скилов от 2 до 10
    const skillCount = randomIntFromInterval(3, categories.length);
    const ids = [];
    //рандомным образом распределяем скилы
    for(let j=0; j < skillCount; j++) {
      const skillId = randomIntFromInterval(j*step + 1, (j+1)*step - 1);
      employee.skills.add(session.Skill.at(skillId));
    }
    //console.log(employee.skills.toRefArray());
  });

  return {
    orm: state,
    app: {}
  };
};

const randomIntFromInterval = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
};