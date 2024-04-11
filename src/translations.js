export const translations = {
    ro: {
        quest: "Ajută-l pe iepuraș să găsească ouăle de Paște!",
        start: "Începe!",
        win: "Felicitări! Ai câștigat!",
        restart: "Mai joci o dată?",
        good: ["Bine!", "Te descurci de minune!", "Excelent!"],
        bad: [
            "Nu cred că e bine...",
            "Nu acesta e răspunsul...",
            "Mai încearcă o dată...",
        ],
    },
    en: {
        quest: "Help the Easter Bunny find the Easter Eggs!",
        start: "Begin!",
        win: "Congratulations! You've won!",
        restart: "Play again?",
        good: ["Great!", "You're doing a great job!", "Excellent!"],
        bad: [
            "I don't think that's right...",
            "That's not the answer...",
            "Try again...",
        ],
    },
    es: {
        quest: "¡Ayda al Conejito a encontrar todos los huevos de Pascua!",
        start: "¡Comienza!",
        win: "¡Felicidades! ¡Has ganado!",
        restart: "¿Quieres jugar de nuevo?",
        good: ["¡Muy bien!", "¡Eso es!", "¡Excelente!"],
        bad: [
            "No creo que esta sea la respuesta...",
            "No está bien...",
            "Intentalo de nuevo...",
        ],
    },
};

const translate = (lang, string) => {
    let out = null;
    if (translations[lang] && translations[lang][string]) {
        out = translations[lang][string];
    } else {
        out = translations["ro"][string];
    }

    if (out.constructor === Array) {
        return out[Math.floor(Math.random() * out.length)];
    }
    return out;
};

export default translate;
