import { createSearchParams, useSearchParams } from 'react-router-dom';
import icons from '~/utiles/icons';
import Button from '~/components/Button';
import withBaseComponent from '~/components/hocs/withBaseComponent';

function PaginationItem({ children, navigate, location }) {
    const { HiOutlineDotsHorizontal } = icons;
    const [params] = useSearchParams();

    const handleChangePage = (page) => {
        const queries = Object.fromEntries([...params]);
        if (Number(page)) queries.page = page;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        });
    };
    return (
        <Button
            customStyles={`${
                (+params.get('page') || 1) === children
                    ? 'bg-gradient-custom text-white'
                    : 'hover:text-gray-800 bg-gray-600 text-gray-300'
            } px-4 py-2 flex justify-center rounded-md cursor-pointer hover:bg-gray-300 ${
                typeof children === 'string' ? 'hover:bg-transparent items-end' : ' items-center'
            }`}
            onClick={() => handleChangePage(children)}
        >
            {typeof children === 'number' ? children : <HiOutlineDotsHorizontal size={20} />}
        </Button>
    );
}

export default withBaseComponent(PaginationItem);
