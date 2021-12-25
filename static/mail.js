// шаблон начала письма
const intro = ['$a_intro$', '$b_intro$ '];
// шаблон тела письма
const text = ['$a_text$', '$b_text$'];
// шаблон концовки письма
const outro = ['$a_outro$', '$b_outro$'];
// задаём набор фраз и слов для всех шаблонов сразу
const text_obj = {
  //структуру письма пока оставляем пустой
  structure: [
    ''
  ],
  // текст для начала
  a_intro: ['Адри, привет!', 'Приветик!'],
  b_intro: ['Спасибо, что заглянула)', 'Хей!', 'Добро пожаловать.'],
  // варианты основного текста
  a_text: ['Я хочу чтобы ты никогда не забывала о том, какая ты прелесть.', 'Я благодарю тебя за все время, которое ты общаешься со мной.', 'У тебя доброе сердце <3', 'Твои глаза прекрасны)', 'Я люблю твою улыбку.', 'Ты всегда поможешь.', 'Спасибо что веришь в меня, ты чудесна.'],
  b_text: ['У тебя прекрасное тело ;)', 'Ты заствляешь меня улыбаться!!!', 'У тебя все получиться.', 'Я всегда готов тебе помочь', 'Улыбнись!', 'Не унывай!', 'Оставайся таким же солнышком!', 'Я рад что встретил тебя <3', 'Ты красивая!'],
  // текст для концовки
  a_outro: ['Помни, что ты не одна.', 'Ты всегда можешь зайти сюда заново.', 'Не грусти, а если что заходи сюда!'],
  b_outro: ['Я всегда рядом', 'Я в тебя верю!', 'Все будет хорошо'],
};

// убираем знаки доллара после замены шаблонного слова на реальный текст
function parse_keywords(string) {
  // задаём шаблон поиска таких слов
  let pattern = /\$\w+\$/g;
  // проверяем, есть ли в строке нужные нам слова
  let keyword = string.match(pattern);
  // если есть
  if (keyword) {
    // пока не закончатся все такие слова в строке…
    for (let i = keyword.length - 1; i >= 0; i--) {
      // убираем значок доллара
      keyword[i] = keyword[i].replace(/\$/g, '');
    }
  }
  // возвращаем слово без знаков доллара
  return keyword;
}
// генератор случайных чисел в диапазоне от минимального до максимального
function randz(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// выбираем случайный элемент массива
function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// меняем одно слово на другое
function replace_keyword(source, keyword, variant) {
  return (source.replace('$' + keyword + '$', variant));
}
//подставляем случайным образом готовые слова вместо шаблонных слов со знаком доллара
function bake(object) {
  // переменная, в которой на выходе получится готовый текст
  let result = randomize(object['structure']);
  // пока есть шаблонные слова со знаком доллара
  do {
    // выбираем их
    keywords = parse_keywords(result);
    // если они точно есть, то
    if (keywords) {
      // пока они не закончатся
      for (let i = keywords.length - 1; i >= 0; i--) {
        // случайным образом подставляем вместо шаблонных слов с долларом слова из наборов
        if (object.hasOwnProperty(keywords[i])) {
          result = replace_keyword(result, keywords[i], randomize(object[keywords[i]]));
        }
      }
    }
  } while (keywords);
  // возвращаем готовый результат
  return result;
}
// собираем письмо в одно целое
function generate_structure() {
  // случайным образом определяем тон письма — официальный (0) или неформальный (1)
  const mood = randz(0, 1);
  // результат помещаем в переменную вместе с тегами
  result = '<h2 id="id2" class="block">' + intro[mood] + '</h1>\n';
  result += '<p id="id3" class="block">' + text[mood] + '</p>\n';
  result += '<p id="id4" class="block">' + outro[mood] + '</p>\n';
  // возвращаем результат — одну строку с HTML-разметкой
  return result;
}
// подставляем текст с тегами в нужне место на странице
function send(text) {
  document.getElementById('text_here').innerHTML = text;
}
// что мы делаем по нажатию на кнопку
function get_text() {
  // заводим переменную для структуры текста
  const currentObject = text_obj;
  // наполняем структуру текстом с шаблонными словами
  currentObject.structure[0] = generate_structure();
  // меняем шаблонные слова на нормальный текст
  result = bake(currentObject);
  // выводим результат
  send(result);
}