
import {stringifyDateMonth, stringifyDateDay} from 'helpers/date';
import {memoizeByStringParam} from 'helpers';
import {MONTH_NAMES, MONTH_NAMES_GENITIVE} from 'constants';


const setWeekStart = (date) => {
    while (date.getDay() !== 1) {
        date.setHours(-24);
    }

    return date;
};

const daysCache = {};

const getToday = () => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
};

const getMonthDay = (date, {isEmpty = false, currentYear, currentMonth, currentMonthDay} = {}) => {
    const dayKey = stringifyDateDay(date);

    const hash = `${dayKey}-${isEmpty}`;

    if (daysCache[hash]) {
        return daysCache[hash];
    }

    const weekDay = date.getDay();
    const monthDay = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const isCurrentYear = year === currentYear;
    const isCurrentMonth = isCurrentYear && month === currentMonth;

    // Не показываем будущие недели
    if (isCurrentMonth && (weekDay === 1) && monthDay > currentMonthDay) {
        return null;
    }

    const isFutureDay = !isEmpty && isCurrentMonth && monthDay > currentMonthDay;
    // const title = date.toLocaleDateString('ru', {month: 'long', day: 'numeric'});
    const monthGenitive = MONTH_NAMES_GENITIVE[month];

    return daysCache[hash] = {
        dayKey,
        monthDay,
        monthGenitive,
        isFutureDay,
        // суббота или воскресенье
        isWeekEnd: weekDay === 6 || weekDay === 0,
        month: date.getMonth(),
        isEmpty,
    };
};

export const getMonth = (offset = 0) => {
    const date = getToday();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentMonthDay = date.getDate();

    // сдвигаем на нужное количество месяцев
    date.setMonth(date.getMonth() - offset);
    // устанавливаем первый день месяца
    date.setDate(1);

    const monthKey = stringifyDateMonth(date);

    const title = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

    const activeMonth = date.getMonth();

    const days = [];

    // устанавливаем начало недели
    setWeekStart(date);

    while (activeMonth !== date.getMonth()) {
        days.push(getMonthDay(date, {currentYear, currentMonth, currentMonthDay, isEmpty: true}));

        date.setHours(24);
    }

    while (activeMonth === date.getMonth()) {
        const day = (getMonthDay(date, {currentYear, currentMonth, currentMonthDay}));

        if (day === null) {
            break;
        }

        days.push(day);

        date.setHours(24);
    }

    return {title, days, monthKey};
};

export const memoizedGetMonth = memoizeByStringParam(getMonth);
