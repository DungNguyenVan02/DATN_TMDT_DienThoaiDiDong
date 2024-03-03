import { RotatingLines } from 'react-loader-spinner';
const Spinner = () => {
    return (
        <RotatingLines
            visible={true}
            height="24"
            width="24"
            strokeColor="gray"
            strokeWidth="4"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
        />
    );
};

export { Spinner };
