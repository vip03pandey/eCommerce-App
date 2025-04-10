import React,{useState,useEffect, useRef} from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
const CollectionPage = () => {
    const [products,setProducts]=useState([]);
    const sidebarRef=useRef(null)
    const [isSidebarOpen,setIsSidebarOpen]=useState(false)
    const toggleSidebar=()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }
    useEffect(()=>{
        document.addEventListener("mousedown",handleClickOutside)
        document.removeEventListener("mousedown",handleClickOutside)
        
    },[])
    const handleClickOutside=(e)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false)
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            const fetchedProducts=[
                {
                    _id:"1",
                    name:"T-shirt",
                    price:100,
                    images:[{
                         url: "https://picsum.photos/id/1012/200/200",
                         altText: "T-shirt 2",
                    }]
                },
                {
                    _id:"2",
                    name:"T-shirt",
                    price:100,
                    images:[{
                         url: "https://picsum.photos/id/1011/200/200",
                         altText: "T-shirt ",
                    }]
                },
                {
                    _id:"3",
                    name:"T-shirt",
                    price:100,
                    images:[{
                         url: "https://picsum.photos/id/1013/200/200",
                         altText: "T-shirt ",
                    }]
                },
                {
                    _id:"4",
                    name:"T-shirt",
                    price:100,
                    images:[{
                         url: "https://picsum.photos/id/1014/200/200",
                         altText: "T-shirt 2",
                    }]
                }
                ,
                {
                  _id:"5",
                  name:"T-shirt",
                  price:100,
                  images:[{
                       url: "https://picsum.photos/id/1015/200/200",
                       altText: "T-shirt 2",
                  }]
              },
              {
                  _id:"6",
                  name:"T-shirt",
                  price:100,
                  images:[{
                       url: "https://picsum.photos/id/1016/200/200",
                       altText: "T-shirt ",
                  }]
              },
              {
                  _id:"7",
                  name:"T-shirt",
                  price:100,
                  images:[{
                       url: "https://picsum.photos/id/1012/200/200",
                       altText: "T-shirt ",
                  }]
              },
              {
                  _id:"8",
                  name:"T-shirt",
                  price:100,
                  images:[{
                       url: "https://picsum.photos/id/1018/200/200",
                       altText: "T-shirt 2",
                  }]
              }
            ]
            setProducts(fetchedProducts)
            console.log("rerendered")
        },1000)
    },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2' />
        </button>

        <div ref={sidebarRef} className={`${isSidebarOpen?"translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
            <SortOptions/>
            <ProductGrid products={products}/>
        </div>
    </div>
  )
}

export default CollectionPage
