let decks = [];
let currentDeck = null;
let isBackVisible = true; // по умолчанию — рубашка включена
let shuffledDeck = []; // ← добавь рядом с currentDeck, isBackVisible

// Встроенная колода
const defaultDeck = {
  name: "Колода по умолчанию",
  cards: [
    { title: "Гора", image: "https://via.placeholder.com/120/92c952?text=Гора", description: "Символ цели." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." },
    { title: "Ключ", image: "https://via.placeholder.com/120/d32776?text=Ключ", description: "Решение и доступ." }
  ]
};

decks.push(defaultDeck);
renderDecks();

// === Основные функции ===
function loadDeckFromFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  if (!file) {
    alert("Выберите файл .json!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const deck = JSON.parse(e.target.result);
      if (!deck.name || !Array.isArray(deck.cards) || deck.cards.length === 0) {
        throw new Error("Неверный формат");
      }
      decks.push(deck);
      renderDecks();
      input.value = "";
    } catch (err) {
      alert("❌ Ошибка: файл должен быть JSON с полями name и cards.");
      input.value = "";
    }
  };
  reader.readAsText(file);
}

function loadDeckFromFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const deck = JSON.parse(e.target.result);
      if (!deck.name || !Array.isArray(deck.cards)) throw new Error();
      decks.push(deck);
      renderDecks();
    } catch (err) {
      alert("❌ Неверный формат JSON");
    }
  };
  reader.readAsText(file);
}

function renderDecks() {
  const container = document.getElementById("decksList");
  container.innerHTML = "";

  decks.forEach((deck, index) => {
    const div = document.createElement("div");
    div.className = "deck-item";
    const canDelete = index > 0;
    div.innerHTML = `
      ${deck.name}
      <div class="number">${deck.cards.length} карт</div>
      <button class="glow-on-hover" onclick="selectDeck(${index})">Выбрать</button>
      ${canDelete ? `<button  class="glow-on-hover" onclick="deleteDeck(${index})">Удалить</button>` : ""}
    `;
    container.appendChild(div);
  });
}

function selectDeck(index) {
  currentDeck = decks[index];
  // Перемешиваем колоду при выборе
  shuffledDeck = [...currentDeck.cards].sort(() => Math.random() - 0.5);
  document.getElementById("deckInfo").textContent = `Активна: ${currentDeck.name}`;
  showAllCards(); // или clearTable(), если не хочешь сразу все
}

function showAllCards() {
  if (!currentDeck) {
    alert("Сначала выберите колоду!");
    return;
  }
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  currentDeck.cards.forEach(card => {
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
      front.style.backgroundColor = "#2c3e50";
      front.style.color = "white";
      front.style.display = "flex";
      front.style.justifyContent = "center";
      front.style.alignItems = "center";
      front.style.borderRadius = "8px";
      front.style.fontWeight = "bold";
      front.textContent = "Карта";

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
      el.innerHTML = `<img src="${card.image}" alt="${card.title}">`;
      el.onclick = () => showCardModal(card);
      container.appendChild(el);
    }
  });
}

function showAllCards() {
  if (!currentDeck) {
    alert("Сначала выберите колоду!");
    return;
  }

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  // Используем shuffledDeck — уже перемешанную при выборе колоды
  shuffledDeck.forEach(card => {
    if (isBackVisible) {
      // === Режим рубашки: двусторонняя карта с анимацией ===
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

      // Рубашка (лицевая сторона)
      const front = document.createElement("div");
      front.style.position = "absolute";
      front.style.width = "100%";
      front.style.height = "100%";
      front.style.backfaceVisibility = "hidden";
      front.style.backgroundColor = "#2c3e50";
      front.style.color = "white";
      front.style.display = "flex";
      front.style.justifyContent = "center";
      front.style.alignItems = "center";
      front.style.borderRadius = "8px";
      front.style.fontWeight = "bold";
      front.textContent = "Карта";

      // Обратная сторона (изображение)
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
      // === Без рубашки: сразу показываем изображение ===
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `<img src="${card.image}" alt="${card.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      el.onclick = () => showCardModal(card);
      container.appendChild(el);
    }
  });

  document.getElementById("deckInfo").textContent = `Показаны все карты: ${currentDeck.name}`;
}

function clearTable() {
  document.getElementById("cardsContainer").innerHTML = "";
  document.getElementById("deckInfo").textContent = "Стол очищен";
}

function toggleBack() {
  isBackVisible = !isBackVisible;
  document.getElementById("toggleBack").textContent = 
    isBackVisible ? "🃏 Рубашка: ВКЛ" : "🃏 Рубашка: ВЫКЛ";
  if (currentDeck) showAllCards();
}

function showCardModal(card) {
  document.getElementById("modalTitle").textContent = card.title;
  document.getElementById("modalImage").src = card.image;
  document.getElementById("modalDesc").textContent = card.description;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  // Восстанавливаем одиночный режим
  document.getElementById("modalImage").style.display = "block";
  document.getElementById("modalDesc").innerHTML = ""; // очищаем, если был HTML
}

document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    // Обработка файла (как у тебя уже есть)
    loadDeckFromFile(file);
  }
});

function showRandomCard() {
  if (!currentDeck || !currentDeck.cards || currentDeck.cards.length === 0) {
    alert("Нет активной колоды или карт!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * currentDeck.cards.length);
  const card = currentDeck.cards[randomIndex];
  showCardModal(card);
}

function showThreeRandomCards() {
  if (!currentDeck || !currentDeck.cards || currentDeck.cards.length === 0) {
    alert("Нет активной колоды или карт!");
    return;
  }

  const deck = currentDeck.cards;
  const uniqueCards = [...new Set(
    Array.from({length: 3}, () => deck[Math.floor(Math.random() * deck.length)])
  )].slice(0, 3);

  // Формируем HTML для трёх карт
  let cardsHtml = uniqueCards.map(card => `
    <div style="display:inline-block; margin:10px; text-align:center; max-width:200px;">
      <img src="${card.image}" alt="${card.title}" style="width:100%; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
      <h4 style="margin:8px 0;">${card.title}</h4>
      <p style="font-size:14px;">${card.description}</p>
    </div>
  `).join('');

  // Меняем модальное окно на множественный режим
  document.getElementById("modalTitle").textContent = "Три карты";
  document.getElementById("modalImage").style.display = "none";
  document.getElementById("modalDesc").innerHTML = cardsHtml;
  document.getElementById("modal").classList.remove("hidden");
}

function deleteDeck(index) {
  if (index === 0) return;
  const deckToDelete = decks[index];
  const isActive = currentDeck === deckToDelete;

  if (confirm("Удалить колоду «" + deckToDelete.name + "»?")) {
    decks.splice(index, 1);
    if (isActive) {
      currentDeck = null;
      clearTable();
    }
    renderDecks();
  }
}

function shuffleOnTable() {
  const container = document.getElementById("cardsContainer");
  const cards = Array.from(container.children);

  if (cards.length === 0) {
    alert("Нет карт на столе для перемешивания!");
    return;
  }

  // Добавляем визуальный фидбек
  container.classList.add("shuffle");

  // Анимируем "встряхивание"
  cards.forEach(card => {
    card.classList.add("shuffle-move");
  });

  // Через 300 мс — перемешиваем порядок
  setTimeout(() => {
    // Убираем анимацию
    cards.forEach(card => {
      card.classList.remove("shuffle-move");
    });

    // Перемешиваем массив элементов
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

    // Очищаем и добавляем в новом порядке
    container.innerHTML = "";
    shuffledCards.forEach(card => {
      container.appendChild(card);
    });

    container.classList.remove("shuffle");
  }, 300);
}

// Глобальные функции для HTML
window.loadDeckFromFile = loadDeckFromFile;
window.selectDeck = selectDeck;
window.showAllCards = showAllCards;
window.clearTable = clearTable;
window.toggleBack = toggleBack;
window.showCardModal = showCardModal;
window.closeModal = closeModal;
window.deleteDeck = deleteDeck;