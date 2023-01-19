import { handlePaginate } from "./handlePaginate"

//This is a pagination navigation
const Paginate = ({ page, getPosts }) => {

    return (
        <div className="paginateNav">
            <div id="previous" className={page.previous?.page > 0 ? "unhide" : "hide"} onClick={(e) => handlePaginate(e.target.id, getPosts, page)}>&#8592;</div>
            <p>{page.current} of {page.total }</p>
            <div id="next" className={page.next?.page ? "unhide" : "hide"} onClick={(e) => handlePaginate(e.target.id, getPosts, page)}>&#8594;</div>
        </div>
    )
}

export default Paginate;