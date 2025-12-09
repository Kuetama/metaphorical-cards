// === Настройки ===
const DECKS_STORAGE_KEY = 'metaphorDecks';

// Глобальные переменные
let decks = {};
let currentDeckId = null;
let shuffledDeck = [];
let isBackVisible = true;
let isShowingAll = false;

// === Встроенная колода (офлайн, с base64-placeholder) ===
const DEFAULT_DECK = {
  id: 'default',
  name: '✨ Ассоциативные образы',
  cards: [
    {
      id: 1,
      title: 'Гора',
      image: 'mak/IMG_0498.jpg',
      description: 'Символ цели, вызова и преодоления. Что ты готов(-а) покорить?'
    },
    {
      id: 2,
      title: 'Зеркало',
      image: 'mak/IMG_0499.jpg',
      description: 'Самопознание, честность, внутренний взгляд. Что отражает твоё зеркало?'
    },
    {
      id: 3,
      title: 'Ключ',
      image: 'mak/IMG_0500.jpg',
      description: 'Возможность, решение, доступ. К какой двери он подходит?'
    },
    {
      id: 4,
      title: 'Лестница',
      image: 'mak/IMG_9598.jpg',
      description: 'Рост, развитие, поступательное движение. Куда ты поднимаешься?'
    }
  ]
};

// === Инициализация ===
document.addEventListener('DOMContentLoaded', () => {
  loadDecksFromStorage();
  renderDeckSelector();
  setupEventListeners();
  loadDeck('default');
});

// === Хранилище ===
function loadDecksFromStorage() {
  const saved = localStorage.getItem(DECKS_STORAGE_KEY);
  if (saved) {
    decks = JSON.parse(saved);
  }
  decks.default = DEFAULT_DECK;
}

function saveDecksToStorage() {
  const userDecks = {};
  for (const key in decks) {
    if (key !== 'default') userDecks[key] = decks[key];
  }
  localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(userDecks));
}

// === UI ===
function renderDeckSelector() {
  const select = document.getElementById('deckSelect');
  select.innerHTML = '';
  for (const id in decks) {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = decks[id].name;
    select.appendChild(option);
  }
}

function setupEventListeners() {
  document.getElementById('loadDeckBtn').addEventListener('click', () => {
    const id = document.getElementById('deckSelect').value;
    loadDeck(id);
  });

  document.getElementById('deleteDeckBtn').addEventListener('click', deleteCurrentDeck);
  document.getElementById('uploadDeck').addEventListener('change', handleFileUpload);
  document.getElementById('shuffle').addEventListener('click', shuffleDeck);
  document.getElementById('drawOne').addEventListener('click', () => drawCards(1));
  document.getElementById('drawThree').addEventListener('click', () => drawCards(3));
  document.getElementById('showAll').addEventListener('click', showAllCards);
  document.getElementById('clearField').addEventListener('click', clearField);
  document.getElementById('toggleBack').addEventListener('click', toggleCardBack);
  document.getElementById('modalClose').addEventListener('click', closeModal);
}

// === Основная логика ===
function loadDeck(deckId) {
  if (!decks[deckId]) return;
  currentDeckId = deckId;
  shuffledDeck = shuffleArray(decks[deckId].cards);
  isShowingAll = false;
  displayCards([]);
  document.getElementById('deckInfo').textContent = `Колода: ${decks[deckId].name}`;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleDeck() {
  if (!currentDeckId) {
    alert('Сначала выберите колоду!');
    return;
  }

  shuffledDeck = shuffleArray(decks[currentDeckId].cards);

  if (isShowingAll) {
    displayCards([...shuffledDeck]);
    document.getElementById('deckInfo').textContent = `Колода "${decks[currentDeckId].name}" перемешана!`;
  } else {
    document.getElementById('deckInfo').textContent = `Колода перемешана. Нажмите "Показать все", чтобы увидеть порядок.`;
  }
}

function drawCards(count) {
  if (!currentDeckId || shuffledDeck.length === 0) {
    alert('Нет активной колоды!');
    return;
  }
  isShowingAll = false;
  const drawn = shuffledDeck.slice(0, count);
  displayCards(drawn);
}

function showAllCards() {
  if (!currentDeckId) {
    alert('Сначала выберите колоду!');
    return;
  }
  isShowingAll = true;
  displayCards([...shuffledDeck]);
  document.getElementById('deckInfo').textContent = `Показаны все карты: ${decks[currentDeckId].name}`;
}

function clearField() {
  isShowingAll = false;
  displayCards([]);
  document.getElementById('deckInfo').textContent = currentDeckId 
    ? `Колода: ${decks[currentDeckId].name} (поле очищено)` 
    : 'Колода не выбрана';
}

function toggleCardBack() {
  isBackVisible = !isBackVisible;
  document.getElementById('toggleBack').textContent = 
    isBackVisible ? '🃏 Рубашка: ВКЛ' : '🃏 Рубашка: ВЫКЛ';
  
  if (window.currentDisplayedCards) {
    displayCards([...window.currentDisplayedCards]);
  }
}

function displayCards(cards) {
  window.currentDisplayedCards = cards;
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    if (isBackVisible) {
      el.innerHTML = `<div class="card-back">Карта</div>`;
    } else {
      el.innerHTML = `<img src="${card.image}" alt="${card.title}" loading="lazy">`;
    }
    el.addEventListener('click', () => showModal(card));
    container.appendChild(el);
  });
}

function showModal(card) {
  document.getElementById('modalTitle').textContent = card.title;
  document.getElementById('modalImage').src = card.image;
  document.getElementById('modalDesc').textContent = card.description;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// === Загрузка колод ===
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!data.name || !Array.isArray(data.cards) || data.cards.length === 0) {
        throw new Error('Неверный формат');
      }
      const id = 'deck_' + Date.now();
      decks[id] = { id, ...data };
      saveDecksToStorage();
      renderDeckSelector();
      document.getElementById('deckSelect').value = id;
      loadDeck(id);
    } catch (err) {
      alert('❌ Ошибка: файл должен быть корректным JSON с полями "name" и "cards".');
    }
  };
  reader.readAsText(file);
}

function deleteCurrentDeck() {
  if (!currentDeckId || currentDeckId === 'default') {
    alert('Нельзя удалить встроенную колоду.');
    return;
  }
  if (!confirm(`Удалить колоду "${decks[currentDeckId].name}"?`)) return;

  delete decks[currentDeckId];
  saveDecksToStorage();
  renderDeckSelector();
  const keys = Object.keys(decks);
  loadDeck(keys[0] || 'default');
}