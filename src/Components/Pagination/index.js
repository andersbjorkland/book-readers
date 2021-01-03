import { Wrapper } from "./Pagination.styles";

const Pagination = ({resultsPerPage, numberOfResults, onClick, currentPage = 1}) => {
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

    let limitUp = currentPage + 2;
    limitUp = limitUp > lastPage ? lastPage : limitUp;
    if (limitUp < 5 && 5 <= lastPage) {
        limitUp = 5;
    }

    if (lastPage > 1) {
        for (let i = limitDown; i <= limitUp; i++) {
            pages.push(<button key={i} onClick={() => onClick(i)}>{i}</button>);
        }
    }



    return (
        <Wrapper>
            {pages}
        </Wrapper>
    );
}

export default Pagination;