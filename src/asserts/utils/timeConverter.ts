const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const getTimeObj = (time?: string) => {
    const date = (time? new Date(time) : new Date());
    return {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        day: date.getDate(),
        weekday: weekdays[date.getDay()],
        hour: ('0' + date.getHours()).slice(-2),
        min: ('0' + date.getMinutes()).slice(-2),
    };
};

export const timeTransform = (time?: string) => {
    if (!time) {
        return '';
    }
    const current = getTimeObj();
    const past = getTimeObj(time);

    if (current.year !== past.year) {
        return `${past.day}\u00A0${past.month} ${past.year}\u00A0г.`;
    }
    const difference = current.day - past.day;
    if (current.month !== past.month || difference > 6) {
        return `${past.day}\u00A0${past.month}`;
    }
    if (difference > 0) {
        return `${past.weekday}`;
    }
    return `${past.hour}:${past.min}`;
};
