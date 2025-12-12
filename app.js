let savedDecks = JSON.parse(localStorage.getItem('metaphorDecks')) || [];
let currentDeck = null;
let isBackVisible = true;
let shuffledDeck = [];


const defaultDeck = {
  name: "Комнаты души",
  backImage: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/back.webp",
  cards: [
    { title: "Гора", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/1.webp", description: "Символ цели." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/2.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/3.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/4.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/5.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/6.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/7.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/8.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/9.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/10.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/11.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/12.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/13.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/14.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/15.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/16.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/17.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/18.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/19.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/20.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/21.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/22.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/23.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/24.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/25.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/26.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/27.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/28.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/29.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/30.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/31.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/32.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/33.webp", description: "Решение и доступ." },
    { title: "Ключ", image: "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/34.webp", description: "Решение и доступ." }
  ]
};

// app.js
// import { defaultDeck } from './default-deck.js';


if (savedDecks.length === 0) {
  savedDecks = [defaultDeck];
  localStorage.setItem('metaphorDecks', JSON.stringify(savedDecks));
}

function renderDeckList() {
  const container = document.getElementById("decksList");
  if (!container) return;

container.innerHTML = savedDecks.map((deck, index) => `
  <div class="deck-item">
    <span class="deck-name">${deck.name}</span>
    <br>
    <button class="glow-on-hover">Выбрать</button>
    ${index > 0 ? '<button class="delete-btn danger">Удалить</button>' : ''}
  </div>
`).join('');

  // Назначаем обработчики
  container.querySelectorAll('.glow-on-hover').forEach((btn, i) => {
    btn.onclick = () => selectDeck(i);
  });
  container.querySelectorAll('.delete-btn').forEach((btn, i) => {
    btn.onclick = () => deleteDeck(i + 1); // +1 because index 0 is skipped
  });
}



function selectDeck(index) {
  currentDeck = savedDecks[index];
  shuffledDeck = [...currentDeck.cards].sort(() => Math.random() - 0.5);
  document.getElementById("deckInfo").textContent = `Активна: ${currentDeck.name}`;
  showAllCards();
}

function deleteDeck(index) {
  if (index === 0) return;
  if (!confirm("Удалить колоду?")) return;
  savedDecks.splice(index, 1);
  localStorage.setItem('metaphorDecks', JSON.stringify(savedDecks));
  renderDeckList();
  if (currentDeck === savedDecks[index]) {
    currentDeck = null;
    clearTable();
  }
}

function showAllCards() {
  if (!currentDeck) return;
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  shuffledDeck.forEach(card => {
    if (isBackVisible) {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.style.position = "relative";
      cardEl.style.perspective = "1000px";

      const inner = document.createElement("div");
      inner.style.transition = "transform 0.6s";
      inner.style.transformStyle = "preserve-3d";
      inner.style.position = "absolute";
      inner.style.width = "100%";
      inner.style.height = "100%";
      inner.style.top = "0";
      inner.style.left = "0";

const front = document.createElement("div");
front.style.position = "absolute";
front.style.width = "100%";
front.style.height = "100%";
front.style.backfaceVisibility = "hidden";
front.style.borderRadius = "8px";
front.style.overflow = "hidden";

const backImg = document.createElement("img");
// Используем рубашку из текущей колоды
backImg.src = currentDeck.backImage || "https://raw.githubusercontent.com/Kuetama/metaphorical-cards/refs/heads/main/koloda1/back.webp";
backImg.alt = "Рубашка";
backImg.style.width = "100%";
backImg.style.height = "100%";
backImg.style.objectFit = "cover";

front.appendChild(backImg);



      const back = document.createElement("div");
      back.style.position = "absolute";
      back.style.width = "100%";
      back.style.height = "100%";
      back.style.backfaceVisibility = "hidden";
      back.style.transform = "rotateY(180deg)";
      back.style.borderRadius = "8px";
      back.style.overflow = "hidden";
      back.innerHTML = `<img src="${card.image}" alt="${card.title}" style="width:100%;height:100%;object-fit:cover;">`;

      inner.appendChild(front);
      inner.appendChild(back);
      cardEl.appendChild(inner);

      cardEl.onclick = () => {
        if (!cardEl.dataset.flipped) {
          cardEl.dataset.flipped = "true";
          inner.style.transform = "rotateY(180deg)";
          setTimeout(() => showCardModal(card), 300);
        } else {
          showCardModal(card);
        }
      };

      container.appendChild(cardEl);
    } else {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `<img src="${card.image}" alt="${card.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      el.onclick = () => showCardModal(card);
      container.appendChild(el);
    }
  });
}

function showCardModal(card) {
  document.getElementById("modalTitle").textContent = card.title;
  document.getElementById("modalImage").src = card.image;
  document.getElementById("modalDesc").textContent = card.description;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function showRandomCard() {
  if (!currentDeck) return alert("Нет активной колоды!");
  const card = currentDeck.cards[Math.floor(Math.random() * currentDeck.cards.length)];
  showCardModal(card);
}

function showThreeRandomCards() {
  if (!currentDeck) return alert("Нет активной колоды!");
  const cards = currentDeck.cards;
  const unique = [...new Set(Array.from({length: 100}, () => Math.floor(Math.random() * cards.length)))].slice(0, 3);
  let html = unique.map(i => {
    const c = cards[i];
    return `<div style="display:inline-block;margin:10px;text-align:center;max-width:180px;">
      <img src="${c.image}" style="width:100%;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">
      <div>${c.title}</div>
      <div>${c.description}</div>
    </div>`;
  }).join('');
  document.getElementById("modalTitle").textContent = "Три карты";
  document.getElementById("modalImage").style.display = "none";
  document.getElementById("modalDesc").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}


function shuffleOnTable() {
  const container = document.getElementById("cardsContainer");
  const cards = Array.from(container.children);
  if (cards.length === 0) return alert("Нет карт!");

  // Блокируем повторный запуск во время анимации
  if (container.classList.contains('shuffling')) return;
  container.classList.add('shuffling');

  // 1. Запоминаем текущие позиции (First)
  const firstRects = cards.map(card => card.getBoundingClientRect());

  // 2. Создаём новый случайный порядок (но не меняем DOM ещё!)
  const shuffled = [...cards].sort(() => Math.random() - 0.5);

  // 3. Применяем новый порядок в DOM
  container.replaceChildren(...shuffled);

  // 4. Получаем новые позиции (Last)
  const lastRects = cards.map(card => card.getBoundingClientRect());

  // 5. Инвертируем: сдвигаем визуально, чтобы карточки остались "на месте"
  cards.forEach((card, i) => {
    const dx = firstRects[i].left - lastRects[i].left;
    const dy = firstRects[i].top - lastRects[i].top;
    card.style.transform = `translate(${dx}px, ${dy}px)`;
    card.style.transition = 'none';
  });

  // Принудительный reflow
  container.offsetHeight;

  // 6. Запускаем анимацию: убираем сдвиг → карточки "улетают" к новым позициям
  cards.forEach(card => {
    card.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    card.style.transform = 'translate(0, 0)';
  });

  // 7. Очищаем после анимации
  setTimeout(() => {
    cards.forEach(card => {
      card.style.transition = '';
      card.style.transform = '';
    });
    container.classList.remove('shuffling');
  }, 700);
}




function clearTable() {
  document.getElementById("cardsContainer").innerHTML = "";
  document.getElementById("deckInfo").textContent = "Стол очищен";
}

function toggleBack() {
  isBackVisible = !isBackVisible;
  document.getElementById("toggleBackBtn").textContent = 
    isBackVisible ? "Рубашка: ВКЛ" : "Рубашка: ВЫКЛ";
  if (currentDeck) showAllCards();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderDeckList();

  // Кнопки
  document.getElementById('loadDeckBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });
  document.getElementById('howToBtn').addEventListener('click', () => {
    window.location.href = 'how-to.html';
  });
  document.getElementById('show1Btn').addEventListener('click', showRandomCard);
  document.getElementById('show3Btn').addEventListener('click', showThreeRandomCards);
  document.getElementById('showAllBtn').addEventListener('click', showAllCards);
  document.getElementById('shuffleBtn').addEventListener('click', shuffleOnTable);
  document.getElementById('clearBtn').addEventListener('click', clearTable);
  document.getElementById('toggleBackBtn').addEventListener('click', toggleBack);
  document.getElementById('closeModal').addEventListener('click', closeModal);

  // Загрузка файла
  document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const deck = JSON.parse(event.target.result);
        if (!deck.name || !Array.isArray(deck.cards) || deck.cards.length === 0) {
          throw new Error("Неверный формат");
        }
        savedDecks.push(deck);
        localStorage.setItem('metaphorDecks', JSON.stringify(savedDecks));
        renderDeckList();
        alert("Колода добавлена!");
      } catch (err) {
        alert("❌ Ошибка: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });
});