import React,{useState,useEffect, useRef} from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

const CollectionPage = () => {
    const {collection} = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const {products, loading, error} = useSelector((state) => state.products)
    const sidebarRef = useRef(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        const filterParams = {
            ...params,
            collections: collection,
            sortBy: params.sortBy || "",
            page: params.page || 1
        };
        dispatch(fetchProductsByFilters(filterParams));
    }, [searchParams, dispatch, collection]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <div className='flex flex-col lg:flex-row'>
            <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' />
            </button>

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar collection={collection} />
            </div>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>{collection} Collection</h2>
                <SortOptions />
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage
