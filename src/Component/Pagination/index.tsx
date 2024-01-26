/* eslint-disable no-unused-vars */
import Pagination from 'react-bootstrap/Pagination';


const pageinationItem = (totalPage : number, onChangePage : (page: number) => void, currentPage: number) => {
    const items = [];
    for (let number = 1; number <= totalPage; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => onChangePage(number)} active={number === currentPage}>
                {number}
            </Pagination.Item>,
        );
    }
    return items;
};
interface Props {
    totalPages : number;
    onChangePage : (page: number) => void;
    currentPage : number;
}
export default function PaginationBasic(props: Props) {
    const { totalPages,onChangePage,currentPage } = props;
    return (
        <Pagination>
            {pageinationItem(totalPages, onChangePage, currentPage)}
        </Pagination>
    );
}
