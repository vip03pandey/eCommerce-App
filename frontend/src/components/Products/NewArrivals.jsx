import React, { useRef, useState ,useEffect} from 'react'
import { VscArrowCircleLeft } from "react-icons/vsc";
import { VscArrowCircleRight } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {
    const [newArrivals,setNewArrivals]=useState([]);
    useEffect(()=>{
        const fetchNewArrivals=async()=>{
            try{
                const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                })
                
                setNewArrivals(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchNewArrivals()
    },[])
    const scrollRef=useRef(null);
    const [isDragging,setIsDragging]=useState(false);
    const [startX,setStartX]=useState(0);
    const [scrollLeft,setScrollLeft]=useState(false);
    const [canScrollLeft,setCanScrollLeft]=useState(false);
    const [canScrollRight,setCanScrollRight]=useState(false);
    useEffect(()=>{
        const container=scrollRef.current;
        if(container){
            container.addEventListener("scroll",updateScrollButton);
        }
        return ()=>container.removeEventListener("scroll",updateScrollButton);
    },[newArrivals])
    const scroll=(direction)=>{
        const scrollAmount=direction==='left'?-300:300
        scrollRef.current.scrollBy({top:0,left:scrollAmount,behavior:'smooth'});
    }
    const updateScrollButton=()=>{
        const container=scrollRef.current;
        if(container){
            const leftScroll=container.scrollLeft;
            const rightScrollable=container.scrollWidth>leftScroll+container.clientWidth;
            setCanScrollLeft(leftScroll>0);
            setCanScrollRight(rightScrollable);
        }
    }
    const handleMouseDown=(e)=>{
        setIsDragging(true);
        setStartX(e.pageX-scrollRef.current.scrollLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove=(e)=>{
        if(isDragging){
            const deltaX=e.pageX-scrollRef.current.offsetLeft
            const walk=deltaX-startX;
            scrollRef.current.scrollLeft=scrollLeft-walk
        }
    }
    const handleMouseUpOrLeave=()=>{
        setIsDragging(false);
    }
    
    return (
      <section className='container mx-auto text-center mb-10 relative px-4'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>Discover the latest trends and styles</p>
  
        <div className='absolute right-4 top-19 flex space-x-2 z-10 '>
          <button onClick={()=>scroll('left')} disabled={!canScrollLeft} className={`p-2  shadow rounded-full ${canScrollLeft?'bg-white cursor-pointer':'bg-gray-200'}`}>
            <VscArrowCircleLeft className='text-2xl' />
          </button>
          <button onClick={()=>scroll('right')}  className={`p-2  shadow rounded-full ${canScrollRight?'bg-white cursor-pointer':'bg-gray-200 '}`}>
            <VscArrowCircleRight className='text-2xl' />
          </button>
        </div>
  
        {/* Product list */}
        <div 
          ref={scrollRef} 
          className='overflow-x-auto flex space-x-6 py-4 px-1'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          >
          {newArrivals.map((product) => (
            <div key={product._id} className={`min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative ${isDragging?'cursor-grabbing':'cursor-grab'}`}>
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText}
                className='w-full h-[500px] object-cover rounded-lg'
                draggable="false"
              />
             <div className='absolute bottom-4 left-2 right-2 bg-white bg-opacity-50 backdrop-blur-md text-black rounded-lg p-2'>
            <Link to={`/product/${product._id}`} className="block text-left">
             <h4 className='font-semibold text-lg'>{product.name}</h4>
            <p className='text-sm'>${product.price}</p>
            </Link>
            </div>

            </div>
          ))}
        </div>
      </section>
    )
  }

export default NewArrivals
