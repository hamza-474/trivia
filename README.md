🌐 Live demo: https://hamza-474.github.io/trivia/

# Trivia — Country Quiz (v2)

Trivia is now a country quiz. Instead of two fixed questions, you first choose a country — Pakistan, the United States, the United Kingdom, Japan, France or Türkiye, or a Mixed round drawn from all of them — and then answer **5 questions picked at random** from that country's bank of 10 general-knowledge questions (60 in total) about its capital, currency, language, landmarks, geography and national symbols. Nothing is in a fixed order: the 5 questions are drawn randomly and the four answer options are shuffled every game, so pressing "Play Again" gives you a genuinely different quiz each time. Answers get instant feedback — green for correct, red for wrong with the right answer shown — your score is tracked as you go, and a results screen at the end offers a new random round or a change of country. It is built with plain HTML, CSS and JavaScript for Harvard's CS50x (Week 8): no server, no build step, everything runs on the page.

## How it works

1. **Choose a country** on the start screen (or **Mixed / All Countries**).
2. **5 random questions** are drawn from that country's bank of 10 (Mixed: from all 60), with shuffled answer options.
3. **Click an answer** — it turns green if correct, red if wrong, and the correct answer is highlighted either way.
4. **Next** moves on, with a progress bar and running score.
5. **End screen** shows your score out of 5, with **Play Again** (a new random set, same country) and **Change Country**.

## Question bank

| Country | Questions |
| --- | --- |
| Pakistan | 10 |
| United States | 10 |
| United Kingdom | 10 |
| Japan | 10 |
| France | 10 |
| Türkiye | 10 |
| **Total** | **60** |

## How to run

Open `index.html` in any modern browser (it works from `file://`), or serve the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: start (country picker), quiz and end screens |
| `styles.css` | All styling, including the indigo/violet/amber palette |
| `script.js` | The 60-question bank, random draw + shuffle logic, and game flow |

## Design

The palette is unchanged from the original Trivia: an analogous-complementary scheme — an indigo `#4f46e5` → violet `#7c3aed` gradient header (neighbouring hues on the colour wheel), with a complementary amber `#f59e0b` accent on primary buttons, dividers and the progress bar. Feedback keeps the conventional green `#16a34a` / red `#dc2626`. Full colour notes are in `../NOTES.md` of the Week 8 prep folder.

## Author

Hamza Madni — Harvard CS50x, Week 8 (HTML, CSS, JavaScript).
GitHub: [hamza-474](https://github.com/hamza-474)
