import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('');

    useEffect(() => {
        const idTimeout = setTimeout(() => {
            setValueDebounce(value);
        }, delay);
        return () => clearTimeout(idTimeout);
    }, [value, delay]);

    return valueDebounce;
};

export default useDebounce;
