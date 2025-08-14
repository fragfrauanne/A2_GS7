const tasks = [
    { question: "Ich habe _____ gesucht.", answer: "dich / Sie" },
    { question: "Ich habe _____ gefragt.", answer: "dich / Sie" },
    { question: "Ich rufe _____ an.", answer: "dich / Sie" },
    { question: "Ich hole _____ ab.", answer: "dich / Sie" },
    { question: "Ich empfehle _____ das Hotel 'Sonne'.", answer: "dir / Ihnen" },
    { question: "Ich antworte _____ nicht.", answer: "dir / Ihnen" },
    { question: "Ich brauche _____.", answer: "dich / Sie" },
    { question: "Ich gebe _____ meine E-Mail-Adresse.", answer: "dir / Ihnen" },
    { question: "Ich habe _____ nicht gesehen.", answer: "dich / Sie" },
    { question: "Ich helfe _____.", answer: "dir / Ihnen" },
    { question: "Ich bringe _____ einen Tee.", answer: "dir / Ihnen" },
    { question: "Ich schicke _____ ein Foto.", answer: "dir / Ihnen" },
    { question: "Ich lade _____ ein.", answer: "dich / Sie" },
    { question: "Ich kann _____ heute leider nicht besuchen.", answer: "dich / Sie" },
    { question: "Ich möchte _____ etwas schenken.", answer: "dir / Ihnen" },
    { question: "Soll ich _____ die Aufgabe erklären?", answer: "dir / Ihnen" },
    { question: "Soll ich _____ eine Konzertkarte kaufen?", answer: "dir / Ihnen" },
    { question: "Wie schmeckt _____ der Kuchen?", answer: "dir / Ihnen" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
