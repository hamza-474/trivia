// Trivia v2 — Country Quiz (CS50x Week 8)
// Pick a country, then answer 5 questions drawn RANDOMLY from that
// country's bank of 10 (Mixed draws from all 60). Question order and
// option order are shuffled with Fisher–Yates on every game, so
// "Play Again" gives a genuinely different set/order. All state lives
// in JS — no page reloads. Works from file:// and GitHub Pages alike.

'use strict';

/* ---------------- Question bank ----------------
   Each entry: q = question, options = 4 choices,
   answer = the correct option text (exactly one match). */

var QUESTION_BANK = {
  'Pakistan': [
    { q: 'What is the capital city of Pakistan?', options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'], answer: 'Islamabad' },
    { q: 'What is the currency of Pakistan?', options: ['Pakistani rupee', 'Taka', 'Afghani', 'Rial'], answer: 'Pakistani rupee' },
    { q: 'Which language is the national language of Pakistan?', options: ['Punjabi', 'Urdu', 'Pashto', 'Sindhi'], answer: 'Urdu' },
    { q: 'Which is the largest city of Pakistan by population?', options: ['Lahore', 'Faisalabad', 'Karachi', 'Rawalpindi'], answer: 'Karachi' },
    { q: 'The Faisal Mosque, one of the largest mosques in the world, is in which Pakistani city?', options: ['Karachi', 'Lahore', 'Multan', 'Islamabad'], answer: 'Islamabad' },
    { q: 'Which animal is the national animal of Pakistan?', options: ['Snow leopard', 'Markhor', 'Bengal tiger', 'Asian elephant'], answer: 'Markhor' },
    { q: 'On which date does Pakistan celebrate its Independence Day?', options: ['14 August', '23 March', '25 December', '6 September'], answer: '14 August' },
    { q: 'Which is the longest river in Pakistan?', options: ['Jhelum', 'Chenab', 'Indus', 'Beas'], answer: 'Indus' },
    { q: 'Which sport is the national game of Pakistan?', options: ['Cricket', 'Field hockey', 'Squash', 'Polo'], answer: 'Field hockey' },
    { q: 'K2, located in Pakistan, is the world\u2019s ___ highest mountain.', options: ['Highest', 'Second highest', 'Third highest', 'Fifth highest'], answer: 'Second highest' }
  ],
  'United States': [
    { q: 'What is the capital city of the United States?', options: ['New York City', 'Washington, D.C.', 'Los Angeles', 'Chicago'], answer: 'Washington, D.C.' },
    { q: 'What is the currency of the United States?', options: ['US dollar', 'Euro', 'Pound sterling', 'Canadian dollar'], answer: 'US dollar' },
    { q: 'Which is the largest city of the United States by population?', options: ['Los Angeles', 'Houston', 'New York City', 'Phoenix'], answer: 'New York City' },
    { q: 'The Statue of Liberty stands in which US city?', options: ['Boston', 'New York City', 'Philadelphia', 'Miami'], answer: 'New York City' },
    { q: 'On which date does the United States celebrate Independence Day?', options: ['4 July', '1 January', '25 December', '31 October'], answer: '4 July' },
    { q: 'Which bird is the national bird of the United States?', options: ['Golden eagle', 'Bald eagle', 'Peregrine falcon', 'Wild turkey'], answer: 'Bald eagle' },
    { q: 'The Grand Canyon is located in which US state?', options: ['Utah', 'Nevada', 'Colorado', 'Arizona'], answer: 'Arizona' },
    { q: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'], answer: 'George Washington' },
    { q: 'Which is the longest river in the United States?', options: ['Mississippi River', 'Missouri River', 'Colorado River', 'Ohio River'], answer: 'Missouri River' },
    { q: 'How many states are there in the United States?', options: ['48', '49', '50', '52'], answer: '50' }
  ],
  'United Kingdom': [
    { q: 'What is the capital city of the United Kingdom?', options: ['London', 'Edinburgh', 'Cardiff', 'Dublin'], answer: 'London' },
    { q: 'What is the currency of the United Kingdom?', options: ['Euro', 'Pound sterling', 'British dollar', 'Crown'], answer: 'Pound sterling' },
    { q: 'Which river flows through London?', options: ['River Severn', 'River Trent', 'River Thames', 'River Mersey'], answer: 'River Thames' },
    { q: 'The United Kingdom is made up of how many countries?', options: ['2', '3', '4', '5'], answer: '4' },
    { q: 'Stonehenge, the famous prehistoric stone circle, is in which country of the UK?', options: ['Scotland', 'Wales', 'England', 'Northern Ireland'], answer: 'England' },
    { q: 'What is the main official language of the United Kingdom?', options: ['Welsh', 'English', 'Scottish Gaelic', 'Irish'], answer: 'English' },
    { q: 'Which is the largest island of the United Kingdom?', options: ['Ireland', 'Isle of Man', 'Great Britain', 'Isle of Wight'], answer: 'Great Britain' },
    { q: 'Edinburgh is the capital city of which UK country?', options: ['Wales', 'England', 'Northern Ireland', 'Scotland'], answer: 'Scotland' },
    { q: 'The University of Oxford is located in which city?', options: ['Cambridge', 'Oxford', 'York', 'Bath'], answer: 'Oxford' },
    { q: 'Which animal is a famous national symbol of the United Kingdom?', options: ['Lion', 'Red deer', 'Badger', 'Red squirrel'], answer: 'Lion' }
  ],
  'Japan': [
    { q: 'What is the capital city of Japan?', options: ['Kyoto', 'Osaka', 'Tokyo', 'Nagoya'], answer: 'Tokyo' },
    { q: 'What is the currency of Japan?', options: ['Won', 'Yuan', 'Yen', 'Ringgit'], answer: 'Yen' },
    { q: 'What is the official language of Japan?', options: ['Japanese', 'Mandarin', 'Korean', 'Ainu'], answer: 'Japanese' },
    { q: 'Which is the highest mountain in Japan?', options: ['Mount Kita', 'Mount Fuji', 'Mount Hotaka', 'Mount Tate'], answer: 'Mount Fuji' },
    { q: 'Which city was the capital of Japan before Tokyo?', options: ['Nara', 'Kyoto', 'Kobe', 'Hiroshima'], answer: 'Kyoto' },
    { q: 'Which is the largest island of Japan?', options: ['Hokkaido', 'Kyushu', 'Shikoku', 'Honshu'], answer: 'Honshu' },
    { q: 'What is the traditional Japanese garment called?', options: ['Hanbok', 'Kimono', 'Sari', 'Ao dai'], answer: 'Kimono' },
    { q: 'Japan\u2019s famous bullet trains are known by which name?', options: ['Shinkansen', 'Maglev One', 'Hayabusa Line', 'Kodama Express'], answer: 'Shinkansen' },
    { q: 'Cherry blossoms, celebrated every spring in Japan, are called\u2026', options: ['Ume', 'Sakura', 'Momiji', 'Hana'], answer: 'Sakura' },
    { q: 'Which traditional wrestling sport is Japan\u2019s national sport?', options: ['Judo', 'Karate', 'Sumo', 'Kendo'], answer: 'Sumo' }
  ],
  'France': [
    { q: 'What is the capital city of France?', options: ['Paris', 'Lyon', 'Marseille', 'Nice'], answer: 'Paris' },
    { q: 'What is the currency of France?', options: ['Franc', 'Euro', 'Pound sterling', 'Swiss franc'], answer: 'Euro' },
    { q: 'What is the official language of France?', options: ['Breton', 'Occitan', 'French', 'Catalan'], answer: 'French' },
    { q: 'Which famous iron tower is the symbol of Paris?', options: ['Leaning Tower of Pisa', 'Eiffel Tower', 'Tokyo Tower', 'Blackpool Tower'], answer: 'Eiffel Tower' },
    { q: 'Which is the longest river in France?', options: ['Seine', 'Rh\u00f4ne', 'Loire', 'Garonne'], answer: 'Loire' },
    { q: 'Which world-famous art museum in Paris is home to the Mona Lisa?', options: ['Mus\u00e9e d\u2019Orsay', 'Louvre', 'Pompidou Centre', 'Rodin Museum'], answer: 'Louvre' },
    { q: 'France celebrates its national day, Bastille Day, on which date?', options: ['14 July', '1 May', '11 November', '25 December'], answer: '14 July' },
    { q: 'Which is the highest mountain in France?', options: ['Mont Pourri', 'Mont Blanc', 'Aiguille du Midi', 'Grande Casse'], answer: 'Mont Blanc' },
    { q: 'Because of its shape, France is often nicknamed\u2026', options: ['The Boot', 'The Hexagon', 'The Emerald Isle', 'The Crescent'], answer: 'The Hexagon' },
    { q: 'The southern coast of France lies on which sea?', options: ['Baltic Sea', 'Black Sea', 'Mediterranean Sea', 'Red Sea'], answer: 'Mediterranean Sea' }
  ],
  'T\u00fcrkiye': [
    { q: 'What is the capital city of T\u00fcrkiye?', options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'], answer: 'Ankara' },
    { q: 'What is the currency of T\u00fcrkiye?', options: ['Turkish lira', 'Euro', 'Riyal', 'Dinar'], answer: 'Turkish lira' },
    { q: 'What is the official language of T\u00fcrkiye?', options: ['Arabic', 'Persian', 'Turkish', 'Kurdish'], answer: 'Turkish' },
    { q: 'Which is the largest city of T\u00fcrkiye by population?', options: ['Ankara', 'Istanbul', 'Antalya', 'Konya'], answer: 'Istanbul' },
    { q: 'The Hagia Sophia, the famous historic landmark, is in which Turkish city?', options: ['Ankara', 'Ephesus', 'Istanbul', 'Trabzon'], answer: 'Istanbul' },
    { q: 'Istanbul is unique because it spans which two continents?', options: ['Asia and Africa', 'Europe and Asia', 'Europe and Africa', 'Asia and Australia'], answer: 'Europe and Asia' },
    { q: 'Who was the founder and first President of the Republic of T\u00fcrkiye?', options: ['Mustafa Kemal Atat\u00fcrk', 'Recep Tayyip Erdo\u011fan', '\u0130smet \u0130n\u00f6n\u00fc', 'Sultan Mehmed II'], answer: 'Mustafa Kemal Atat\u00fcrk' },
    { q: 'Which region of T\u00fcrkiye is famous for its hot-air balloons and fairy-chimney rock formations?', options: ['Pamukkale', 'Cappadocia', 'Bodrum', 'Gallipoli'], answer: 'Cappadocia' },
    { q: 'Which is the highest mountain in T\u00fcrkiye?', options: ['Mount Erciyes', 'Mount S\u00fcphan', 'Mount Ararat', 'Ka\u00e7kar'], answer: 'Mount Ararat' },
    { q: 'What is the background colour of the flag of T\u00fcrkiye?', options: ['Blue', 'Green', 'Red', 'White'], answer: 'Red' }
  ]
};

var COUNTRIES = [
  { key: 'Pakistan', flag: '\uD83C\uDDF5\uD83C\uDDF0', tagline: 'Islamabad \u00b7 Indus \u00b7 Markhor' },
  { key: 'United States', flag: '\uD83C\uDDFA\uD83C\uDDF8', tagline: 'Washington, D.C. \u00b7 Dollar \u00b7 Grand Canyon' },
  { key: 'United Kingdom', flag: '\uD83C\uDDEC\uD83C\uDDE7', tagline: 'London \u00b7 Thames \u00b7 Stonehenge' },
  { key: 'Japan', flag: '\uD83C\uDDEF\uD83C\uDDF5', tagline: 'Tokyo \u00b7 Fuji \u00b7 Sakura' },
  { key: 'France', flag: '\uD83C\uDDEB\uD83C\uDDF7', tagline: 'Paris \u00b7 Eiffel Tower \u00b7 Louvre' },
  { key: 'T\u00fcrkiye', flag: '\uD83C\uDDF9\uD83C\uDDF7', tagline: 'Ankara \u00b7 Istanbul \u00b7 Cappadocia' },
  { key: 'Mixed', flag: '\uD83C\uDF0D', tagline: 'All countries \u00b7 a bit of everything' }
];

var QUESTIONS_PER_GAME = 5;

/* ---------------- Random helpers ---------------- */

// Fisher–Yates shuffle — returns a NEW array, input untouched.
function shuffle(array) {
  var result = array.slice();
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

// Draw `count` unique questions for a country (or from all banks for
// 'Mixed'), with each question's options shuffled. The correct answer
// text is preserved on the returned object so it survives shuffling.
function drawQuestions(countryKey, count) {
  var pool;
  if (countryKey === 'Mixed') {
    pool = [];
    Object.keys(QUESTION_BANK).forEach(function (key) {
      pool = pool.concat(QUESTION_BANK[key]);
    });
  } else {
    pool = QUESTION_BANK[countryKey].slice();
  }
  return shuffle(pool).slice(0, count).map(function (item) {
    return { q: item.q, options: shuffle(item.options), answer: item.answer };
  });
}

/* ---------------- Game (browser only) ---------------- */

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var startScreen = document.getElementById('start-screen');
    var quizScreen = document.getElementById('quiz-screen');
    var endScreen = document.getElementById('end-screen');
    var countryGrid = document.getElementById('country-grid');
    var quizHeading = document.getElementById('quiz-heading');
    var scoreDisplay = document.getElementById('score-display');
    var progressText = document.getElementById('progress-text');
    var progressBar = document.getElementById('progress-bar');
    var progressFill = document.getElementById('progress-fill');
    var questionText = document.getElementById('question-text');
    var optionsBox = document.getElementById('options');
    var feedback = document.getElementById('feedback');
    var nextBtn = document.getElementById('next-btn');
    var finalScore = document.getElementById('final-score');
    var finalMessage = document.getElementById('final-message');

    var state = { country: null, questions: [], index: 0, score: 0, answered: false };

    function show(screen) {
      [startScreen, quizScreen, endScreen].forEach(function (s) { s.hidden = s !== screen; });
    }

    // Build the country cards.
    COUNTRIES.forEach(function (country) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'country-card';
      btn.innerHTML = '<span class="flag" aria-hidden="true"></span>' +
        '<span class="country-name"></span>' +
        '<span class="country-tag"></span>';
      btn.querySelector('.flag').textContent = country.flag;
      btn.querySelector('.country-name').textContent = country.key === 'Mixed' ? 'Mixed / All Countries' : country.key;
      btn.querySelector('.country-tag').textContent = country.tagline;
      btn.addEventListener('click', function () { startGame(country.key); });
      countryGrid.appendChild(btn);
    });

    function startGame(countryKey) {
      state.country = countryKey;
      state.questions = drawQuestions(countryKey, QUESTIONS_PER_GAME);
      state.index = 0;
      state.score = 0;
      quizHeading.textContent = countryKey === 'Mixed' ? 'Mixed / All Countries' : countryKey;
      show(quizScreen);
      renderQuestion();
    }

    function renderQuestion() {
      var current = state.questions[state.index];
      state.answered = false;
      scoreDisplay.textContent = 'Score: ' + state.score;
      progressText.textContent = 'Question ' + (state.index + 1) + ' of ' + state.questions.length;
      progressBar.setAttribute('aria-valuenow', String(state.index + 1));
      progressFill.style.width = ((state.index + 1) / state.questions.length * 100) + '%';
      questionText.textContent = current.q;
      feedback.textContent = '';
      nextBtn.hidden = true;
      nextBtn.textContent = state.index === state.questions.length - 1 ? 'See Results' : 'Next Question';
      optionsBox.innerHTML = '';
      current.options.forEach(function (option) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', function () { choose(btn, option); });
        optionsBox.appendChild(btn);
      });
    }

    function choose(btn, option) {
      if (state.answered) { return; }
      state.answered = true;
      var current = state.questions[state.index];
      var buttons = optionsBox.querySelectorAll('.option-btn');
      buttons.forEach(function (b) {
        b.disabled = true;
        if (b.textContent === current.answer) {
          b.classList.add('correct');
        }
      });
      if (option === current.answer) {
        state.score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = '#16a34a';
      } else {
        btn.classList.add('incorrect');
        feedback.textContent = 'Incorrect — the correct answer is: ' + current.answer;
        feedback.style.color = '#dc2626';
      }
      scoreDisplay.textContent = 'Score: ' + state.score;
      nextBtn.hidden = false;
      nextBtn.focus();
    }

    nextBtn.addEventListener('click', function () {
      state.index++;
      if (state.index < state.questions.length) {
        renderQuestion();
      } else {
        finalScore.textContent = 'You scored ' + state.score + ' out of ' + state.questions.length;
        finalMessage.textContent =
          state.score === 5 ? 'Perfect score — outstanding! You really know ' + (state.country === 'Mixed' ? 'the world' : state.country) + '.' :
          state.score >= 3 ? 'Well done! A strong score — play again for a new set of questions.' :
          'Good try! Play again — the questions change every time, so keep exploring.';
        show(endScreen);
      }
    });

    document.getElementById('again-btn').addEventListener('click', function () { startGame(state.country); });
    document.getElementById('change-btn').addEventListener('click', function () { show(startScreen); });
  });
}

/* Exported for the Node logic test (ignored in the browser). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK: QUESTION_BANK, COUNTRIES: COUNTRIES, shuffle: shuffle, drawQuestions: drawQuestions };
}
