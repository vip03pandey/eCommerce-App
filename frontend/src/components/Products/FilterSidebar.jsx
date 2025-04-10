import React,{useState,useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const navigate=useNavigate()
    const [filters,setFilters]=useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:100,
    })
    const [priceRange,setPriceRange]=useState([0,100])
    const categories=["Topwear","Bottomwear"]
    const colors=[
        "Black",
        "White",
        "Red",
        "Blue",
        "Green",
        "Yellow",
    ]
    const genders=["Men","Women"]
    const sizes=[
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
    ]
    const materials=[
        "Cotton",
        "Polyester",
        "Linen",
        "Wool",
        "Silk",
    ]
    const brands=[
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Asics",
        "Vans",

      ]
      useEffect(()=>{
        const params=Object.fromEntries([...searchParams])
        setFilters({
            category:params.category || "",
            gender:params.gender || "",
            color:params.color || "",
            size:params.size ? params.size.split(","): [],
            material:params.material ? params.material.split(","): [],
            brand:params.brand ? params.brand.split(","): [],
            minPrice:params.minPrice || 0,
            maxPrice:params.maxPrice || 100,
        })
        setPriceRange([0,params.maxPrice || 100])
      },[searchParams])

    const handleFilterChange=(e)=>{
        const {name,value,checked,type}=e.target
        let newFilters={...filters}
        if(type==="checkbox"){
            if(checked){
                newFilters[name]=[...(newFilters[name] || []),value]
            }else{
                newFilters[name]=newFilters[name].filter((item)=>item!==value)
            }
        }
        else{
            newFilters[name]=value
        }
        setFilters(newFilters)
        updateURLParams(newFilters)
    } 
    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
      
        Object.keys(newFilters).forEach((key) => {
          if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
            params.set(key, newFilters[key].join(","));
          } else if (newFilters[key]) {
            params.set(key, newFilters[key]);
          }
        });
      
        setSearchParams(params);
        navigate(`?${params.toString()}`);
      }; 
      const handlePriceChange=(e)=>{
        const newPrice=e.target.value
        setPriceRange([0,newPrice])
        const newFilters={...filters}
        newFilters.minPrice=0
        newFilters.maxPrice=newPrice
        setFilters(newFilters)
        updateURLParams(newFilters)
      }    
  return (
    <div className='p-4'>
        <h3 className='text-xl font-medium text-gray-800 mb-4'>Filters</h3>
        <div className='mb-6 '>
            <label className='block text-gray-800 font-medium mb-2'>Category</label>
            {categories.map((category)=>(
                <div key={category} className='flex items-center mb-1'>
                    <input 
                    type="radio" 
                    value={category}
                    onChange={handleFilterChange}
                    checked={filters.category===category}
                    name='category' 
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded' />
                    <span className='text-gray-700'>{category}</span>
                </div>
            ))}
        </div>

        {/* gender */}
        <div className='mb-6 '>
            <label className='block text-gray-800 font-medium mb-2'>Gender</label>
            {genders.map((gender)=>(
                <div key={gender} className='flex items-center mb-1'>
                    <input 
                    type="radio" 
                    value={gender}
                    onChange={handleFilterChange}
                    name='gender' 
                    checked={filters.gender===gender}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded' />
                    <span className='text-gray-700'>{gender}</span>
                </div>
            ))}
        </div>

        {/* color */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2  '>Color</label>
            {colors.map((color)=>(
                <button value={color}
                onClick={handleFilterChange} key={color} name='color' className={`w-8 h-8 rounded-full border-1 border-black-500 cursor-pointer transition hover:sclae-105 m-0.5 ${filters.color===color?"ring-2 ring-blue-500":""}`} style={{backgroundColor:color.toLocaleLowerCase()}}></button>
            ))}
        </div>

        {/* size */}
        <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2  '>Size</label>
        {sizes.map((size)=>(
                <div key={size} className='flex items-center mb-1'>
                    <input 
                    type="checkbox" 
                    name='size' 
                    value={size}
                    onChange={handleFilterChange}
                    checked={filters.size.includes(size)}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded' />
                    <span className='text-gray-700'>{size}</span>
                </div>
            ))}
        </div>

        {/* material */}
        <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2  '>Material</label>
        {materials.map((material)=>(
                <div key={material} className='flex items-center mb-1'>
                    <input 
                    type="checkbox" 
                    name='material' 
                    value={material}
                    onChange={handleFilterChange}
                    checked={filters.material.includes(material)}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded' />
                    <span className='text-gray-700'>{material}</span>
                </div>
            ))}
        </div>

        {/* brand */}
        <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2  '>Brand</label>
        {brands.map((brand)=>(
                <div key={brand} className='flex items-center mb-1'>
                    <input 
                    type="checkbox" 
                    name='brand' 
                    value={brand}
                    onChange={handleFilterChange}
                    checked={filters.brand.includes(brand)}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded' />
                    <span className='text-gray-700'>{brand}</span>
                </div>
            ))}
        </div>
        {/* price range */}
        <div className='mb-8'>
            <label className='block text-gray-600 font-medium mb-2  '>Price Range</label>
            <input type="range" name='priceRange' min={0} max={100} value={priceRange[1]} onChange={handlePriceChange} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
            <div className='flex justify-between text-gray-600 mt-2'>
                <span>$0</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar
