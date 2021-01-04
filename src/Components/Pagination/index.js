import { Link } from "react-router-dom";
import { Wrapper } from "./Pagination.styles";

const Pagination = ({resultsPerPage, numberOfResults, baseUrl, currentPage = 1}) => {
    let lastPage = parseInt(numberOfResults/resultsPerPage);
    if (numberOfResults % resultsPerPage > 0) {
        lastPage++;
    }

    // Make so that always 5 pages are linked whenever possible.
    const pages = [];
    let limitDown = currentPage - 2;
    limitDown = limitDown < 1 ? 1 : limitDown;
    if (limitDown > lastPage - 5 && lastPage - 5 > 0) {
        limitDown = lastPage - 5;
    }

    let limitUp = currentPage + 2 <= lastPage ? currentPage + 2 : lastPage;
    if (limitUp < 5 && 5 <= lastPage) {
        limitUp = 5;
    }

    if (limitDown > 1) {
        pages.push(<Link key={1} to={baseUrl + 1}>{'|<'}</Link>);
    }

    if (lastPage > 1) {
        for (let i = limitDown; i <= limitUp; i++) {
            pages.push(<Link key={i} to={baseUrl + i}>{i}</Link>);
        }
    }

    console.log(limitDown, currentPage, limitUp);

    return (
        <Wrapper>
            {pages}
        </Wrapper>
    );
}

export default Pagination;