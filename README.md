# Trivia — Interactive Quiz

Trivia is a small interactive quiz web page built with plain HTML, CSS and JavaScript for Harvard's CS50x (Week 8). It asks two questions — one multiple-choice and one free-response — and gives instant visual feedback in the browser: a correct answer turns green, a wrong answer turns red, with a short "Correct!" / "Incorrect" message under each question. There is no server and no build step; everything runs on the page.

**Live demo (original CS50x version):** https://hamza-474.github.io/cs50x-projects/week8/trivia/

## Questions

1. **Multiple choice** — "In CS50 Week 1, which programming language did you first use to print 'hello, world'?" (Scratch / **C** / Python / SQL)
2. **Free response** — "What is the capital city of Pakistan?" (**Islamabad** — checked case-insensitively, surrounding spaces ignored)

## How to run

Open `index.html` in any modern browser, or serve the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: header, the two question sections, footer |
| `styles.css` | All styling, including the indigo/violet/amber palette |
| `script.js` | Answer checking and feedback for both questions |

## Design

The palette is an analogous-complementary scheme: an indigo `#4f46e5` → violet `#7c3aed` gradient header (neighbouring hues on the colour wheel), with a complementary amber `#f59e0b` accent on the Check Answer button and section dividers. Feedback keeps the conventional green `#16a34a` / red `#dc2626`. Full colour notes are in `../NOTES.md` of the Week 8 prep folder.

## Author

Hamza Madni — Harvard CS50x, Week 8 (HTML, CSS, JavaScript).
GitHub: [hamza-474](https://github.com/hamza-474)
