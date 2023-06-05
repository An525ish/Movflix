import { useEffect, useState } from 'react'
import { fetchApi } from '../utils/api';


const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        fetchApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            })
            .catch((err) => {
            setLoading(false)
            setError(err)
            })
    }, [url])


    return { data, loading, error }
}

export default useFetch