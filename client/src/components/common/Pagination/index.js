import PaginationItem from './PaginationItem';
import { useSearchParams } from 'react-router-dom';
import { usePagination } from '~/components/hooks';
function Pagination({ totalCount }) {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, +params.get('page') || 1);

    return (
        <div className="flex justify-center gap-2">
            {pagination?.map((pages, i) => (
                <PaginationItem key={i}>{pages}</PaginationItem>
            ))}
        </div>
    );
}

export default Pagination;
