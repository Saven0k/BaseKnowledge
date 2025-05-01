// Функция для увеличения размера textarea

export const funcToTallInput = (e) => {
    const textarea = document.querySelector(`.${e}`);
    textarea.addEventListener("keyup", (g) => {
        textarea.style.height = "45px";
        let scHeight = g.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
    });
};