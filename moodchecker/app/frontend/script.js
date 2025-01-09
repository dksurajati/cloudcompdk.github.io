const API_URL = '/api/moods';

const moodHistory = document.getElementById('mood-history');
const saveButton = document.getElementById('save-button');
const moodNote = document.getElementById('mood-input');

const loadMoods = async () => {
  const response = await fetch(API_URL);
  const moods = await response.json();
  moodHistory.innerHTML = '';
  moods.forEach(({ mood, note, date }) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mood}</strong> - ${note} <em>(${new Date(date).toLocaleString()})</em>`;
    moodHistory.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', loadMoods);

saveButton.addEventListener('click', async () => {
  const selectedMoodElement = document.querySelector('.mood.selected');
  if (!selectedMoodElement) {
    alert('Please select a mood!');
    return;
  }
  const newMood = {
    mood: selectedMoodElement.dataset.mood,
    note: moodNote.value,
    date: new Date().toISOString(),
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMood),
  });

  moodNote.value = '';
  selectedMoodElement.classList.remove('selected');
  loadMoods();
});

function selectMood(element) {
  document.querySelectorAll('.mood').forEach(mood => mood.classList.remove('selected'));
  element.classList.add('selected');
}
