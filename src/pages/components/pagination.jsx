import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import qs from 'query-string';

export default function usePagination(){
    const location = useLocation();
    const history = useHistory();

    const [actualPage, setActualPage] = useState(getActualPage() || 1);

    function getActualPage(){
        const query = qs.parse(location.search)
        const page = query.page

        return page ? Number(page) : undefined    
    }

    useEffect(() => {
        const query = qs.parse(location.search)
        history.push({search: qs.stringify({
            ...query, page: actualPage
        })})
    }, [actualPage])

    return{
        setActualPage, actualPage
    }
}