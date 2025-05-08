import React, { useState,useEffect } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../../redux/slices/productsSlice';
import {addToCart} from '../../../redux/slices/cartSlice';

const ProductDetails = ({productId}) => {
    const {id}=useParams()
    const dispatch = useDispatch()
    const { selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products);
    const {user,guestId}=useSelector((state)=>state.auth)
    const [mainImage,setmainImage]=useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const productFetchId=productId || id
    useEffect(()=>{
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId))
            dispatch(fetchSimilarProducts({id:productFetchId}))
        }
    },[dispatch,productFetchId])

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
          setmainImage(selectedProduct.images[0]?.url);
          setSelectedColor("");
          setSelectedSize("");
          setQuantity(1);
        }
      }, [selectedProduct]);
      
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const changeImage = (image) => {
        setmainImage(image);
    }

    const handleAddToCart = () => {
        if(!selectedSize || !selectedColor){
            toast.error("Please select size and color",{duration:1000});
            return;
        }
        setIsButtonDisabled(true);
        dispatch(addToCart({
            productId:productFetchId,
            size:selectedSize,
            color:selectedColor,
            quantity:quantity,
            guestId,
            userId:user?._id
        })
    ).then(()=>{
        toast.success("Product added to cart",{duration:2000});
        setIsButtonDisabled(false);
    }).catch((err)=>{
        toast.error("Failed to add to cart",{duration:2000});
        setIsButtonDisabled(false);
    })
    }
    
    if(loading){
        return <p className='text-center'>Loading...</p>
    }
    if(error){
        return <p className='text-center'>Error fetching product details</p>
    }

  return (
    <div className='p-6 '>
        {selectedProduct && (
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image, index) =>(
                        <img key={index} src={image.url} alt={image.altText} srcset="" 
                        className={`w-20 h-20 object-cover cursor-pointer border rounded-lg ${mainImage===image.url?'border-black':'border-gray-300'}`}
                        onClick={()=>changeImage(image.url)} />
                    ))}
                </div>
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                        <img src={mainImage} alt="Main Product" className='w-full h-auto object-cover rounded-lg' />
                    </div>
                </div>
                <div className='md:hidden overscroll-x-scroll flex space-x-4 mb-4'>
                {selectedProduct.images.map((image, index) =>(
                        <img key={index} src={image.url} alt={image.altText} srcset="" 
                        className={`w-20 h-20 object-cover cursor-pointer border rounded-lg ${mainImage===image.url?'border-black':'border-gray-300'}`}
                        onClick={() => setmainImage(image.url)} />
                    ))}
                </div>
                <div className='md:w-1/2 md:ml-10'>
                <h1 className='text-2xl md:text-3xl font-semibold'>{selectedProduct.name}</h1>
                <p className='text-gray-600 text-lg mb-1 line-through'>{selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}</p>
                <p className='text-gray-500 text-xl mb-2'>{selectedProduct.price && `$${selectedProduct.price}`}</p>
                <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>

                <div className='mb-4'>
                    <p className='text-gray-700 '>Color:</p>
                    <div className='flex gap-2 mt-2'>
                        {selectedProduct.colors.map((color) =>(
                            <button key={color} className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor===color?'border-black':'border-white'}`} style={{backgroundColor:color.toLocaleLowerCase(),filter:"brightness(0.5)"}}
                            onClick={()=>setSelectedColor(color)}></button>
                        ))}

                    </div>
                </div>
                <div className='mb-4'>
                    <p className='text-gray-700'>Size:</p>
                    <div className='flex gap-2 mt-2'>
                        {selectedProduct.sizes.map((size)=>(
                            <button key={size} className={`px-4 py-2 rounded border cursor-pointer ${selectedSize===size?'bg-black text-white':'bg-white '}`}
                            onClick={()=>setSelectedSize(size)}>{size}</button>
                        ))}
                    </div>
                </div>
                <div className='mb-6 '>
                    <p className='text-gray-700 '>Quantity</p>
                    <div className='flex items-center space-x-4 mt-2'>
                        <button className='px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer' onClick={()=>setQuantity((quantity)=>quantity-1)} disabled={quantity<=1}>-</button>
                        <span className='text-lg'>{quantity}</span>
                        <button className='px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer ' onClick={()=>setQuantity((quantity)=>quantity+1)}>+</button>
                    </div>
                </div>

                <button 
                onClick={handleAddToCart} 
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer ${isButtonDisabled?'opacity-50 cursor-not-allowed':'hover:bg-gray-900'}`}>
               {isButtonDisabled? "Adding..." : "Add to Cart"}
                </button>

                <div className='mt-10 text-gray-700'>
                    <h3 className='text-xl font-bold mb-4'>Characterstics</h3>
                    <table className='w-full text-left text-sm text-gray-600'>
                        <tbody>
                            <tr>
                                <td className='py-1'>Brand</td>
                                <td className='py-1'>{selectedProduct.brand}</td>
                            </tr>
                            <tr>
                                <td className='py-1'>Material</td>
                                <td className='py-1'>{selectedProduct.material}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div className='mt-20 '>
                <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                <ProductGrid products={similarProducts} loading={loading} error={error} />
            </div>
        </div>
        )}
    </div>
  )
}

export default ProductDetails
