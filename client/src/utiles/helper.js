import icons from './icons';
const { BsStarFill, BsStarHalf, BsStar } = icons;
const formatMoney = (number) => {
    return (number = Number(number?.toFixed(1)).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 9,
    }));
};
const renderStar = (number) => {
    if (isNaN(number)) return;
    const stars = [];

    const check = number.toString().split('.')[1];

    if (+check === 5) {
        for (let i = 0; i < Math.floor(number); i++) {
            stars.push(<BsStarFill color="#fcd31c" />);
        }

        stars.push(<BsStarHalf color="#fcd31c" />);

        for (let i = 5; i > Math.round(number); i--) {
            stars.push(<BsStar color="#fcd31c" />);
        }
    } else if (+check < 5 || +check > 5) {
        for (let i = 0; i < Math.floor(number); i++) {
            stars.push(<BsStarFill color="#fcd31c" />);
        }
        for (let i = 5; i > Math.floor(number); i--) {
            stars.push(<BsStar color="#fcd31c" />);
        }
    } else {
        for (let i = 0; i < Math.floor(number); i++) {
            stars.push(<BsStarFill color="#fcd31c" />);
        }
        for (let i = 5; i > Math.floor(number); i--) {
            stars.push(<BsStar color="#fcd31c" />);
        }
    }
    return stars;
};

const formatTimes = (number) => {
    number = Number(number) / 1000;
    const h = Math.floor(number / 3600);
    const m = Math.floor((number % 3600) / 60);
    const s = Math.floor((number % 3600) % 60);
    return { h, m, s };
};

const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (el, i) => {
        return start + i;
    });
};

export { formatMoney, renderStar, formatTimes, generateRange };
