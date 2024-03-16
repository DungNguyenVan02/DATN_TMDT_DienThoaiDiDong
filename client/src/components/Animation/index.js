import { RotatingLines, Comment } from 'react-loader-spinner';
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

const Uploading = () => {
    return (
        <Comment
            visible={true}
            height="90"
            width="90"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="transparent"
        />
    );
};

export { Spinner, Uploading };
