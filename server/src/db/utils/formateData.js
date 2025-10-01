// Форматирование даты в строку формата "дд.мм.гггг"
function formatDate(date = new Date()) {
  return [
    String(date.getDate()).padStart(2, '0'),        // День с ведущим нулем
    String(date.getMonth() + 1).padStart(2, '0'),   // Месяц с ведущим нулем (месяцы с 0)
    date.getFullYear()                              // Год без изменений
  ].join('.');
}

module.exports = formatDate;