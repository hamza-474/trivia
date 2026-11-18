// Trivia — CS50x Week 8
// Part 1: multiple choice. Clicking the correct button turns it green,
// clicking a wrong button turns it red, with text feedback either way.
// Part 2: free response. The answer is checked case-insensitively
// against "islamabad" — the same logic as the original submission,
// with polished feedback colours (#16a34a green / #dc2626 red).

document.addEventListener('DOMContentLoaded', function () {
  var correct = document.querySelector('.correct');
  correct.addEventListener('click', function () {
    correct.style.backgroundColor = '#16a34a';
    correct.style.color = '#ffffff';
    document.querySelector('#feedback1').textContent = 'Correct!';
  });

  var incorrects = document.querySelectorAll('.incorrect');
  for (var i = 0; i < incorrects.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        btn.style.backgroundColor = '#dc2626';
        btn.style.color = '#ffffff';
        document.querySelector('#feedback1').textContent = 'Incorrect';
      });
    })(incorrects[i]);
  }

  document.querySelector('#check').addEventListener('click', function () {
    var input = document.querySelector('#answer');
    if (input.value.trim().toLowerCase() === 'islamabad') {
      input.style.backgroundColor = '#16a34a';
      input.style.color = '#ffffff';
      document.querySelector('#feedback2').textContent = 'Correct!';
    } else {
      input.style.backgroundColor = '#dc2626';
      input.style.color = '#ffffff';
      document.querySelector('#feedback2').textContent = 'Incorrect';
    }
  });

  // Allow pressing Enter in the text field to check the answer.
  document.querySelector('#answer').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      document.querySelector('#check').click();
    }
  });
});
