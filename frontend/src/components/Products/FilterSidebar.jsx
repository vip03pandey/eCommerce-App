import React,{useState,useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsByFilters } from '../../../redux/slices/productsSlice';
const FilterSidebar = ({collection}) => {
    const dispatch=useDispatch()
    const [searchParams,setSearchParams]=useSearchParams()
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
      useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
      
        const newFilters = {
          collection,
          category: params.category || "",
          gender: params.gender || "",
          color: params.color || "",
          size: params.size ? params.size.split(",") : [],
          material: params.material ? params.material.split(",") : [],
          brand: params.brand ? params.brand.split(",") : [],
          minPrice: parseInt(params.minPrice) || 0,
          maxPrice: parseInt(params.maxPrice) || 100,
          limit: 8,
          page: params.page || 1,
        };
      
        setFilters(newFilters);
        dispatch(fetchProductsByFilters(newFilters));
    }, [searchParams, dispatch, collection]);
      

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };
        
        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }
        
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
      
        Object.keys(newFilters).forEach((key) => {
          if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
            params.set(key, newFilters[key].join(","));
          } else if (newFilters[key] !== "" && newFilters[key] !== 0) {
            params.set(key, newFilters[key]);
          }
        });
      
        setSearchParams(params);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        debouncedPriceChange(newPrice);
    };

    const debouncedPriceChange = useCallback(
        debounce((newPrice) => {
            const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
            setFilters(newFilters);
            updateURLParams(newFilters);
        }, 300),
        [filters]
    );
      

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
            <label className='block text-gray-600 font-medium mb-2'>Color</label>
            <div className='flex flex-wrap gap-2'>
                {colors.map((color)=>(
                    <div key={color} className='flex items-center'>
                        <input 
                            type="radio" 
                            name='color'
                            value={color}
                            onChange={handleFilterChange}
                            checked={filters.color === color}
                            className='hidden'
                            id={`color-${color}`}
                        />
                        <label 
                            htmlFor={`color-${color}`}
                            className={`w-8 h-8 rounded-full border-1 border-black-500 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{backgroundColor: color.toLowerCase()}}
                        />
                    </div>
                ))}
            </div>
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
            <input type="range" 
                name='priceRange' 
                min={0} max={100} 
                value={priceRange[1]} 
                onChange={handlePriceChange} 
                className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
            <div className='flex justify-between text-gray-600 mt-2'>
                <span>$0</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar
