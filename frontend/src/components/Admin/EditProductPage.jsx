import React,{useState} from 'react'

const EditProductPage = () => {
    const [productData,setProductData]=useState({
        name:"",
        description:"",
        price:0,
        countInStock:0,
        sku:"",
        category:"",
        brand:"",
        material:"",
        colors:[],
        sizes:[],
        collections:"",
        gender:"",
        images:[{
            url:"https://picsum.photos/id/1011/200/200",
        },
        {
            url:"https://picsum.photos/id/1012/200/200",
        }
    ]
    })
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setProductData((prevData)=>({...prevData,[name]:value}))
    }
    const handleImageUpload=async (e)=>{
        const file=e.target.files[0];
        console.log(file);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(productData);
    }
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-6'>Edit Product</h2>
        <form onSubmit={handleSubmit} >
            <div className='mb-6'>
                <label className="block font-semibold mb-2">Product Name</label>
                <input type="text" name='name' value={productData.name} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required/>
            </div>
            <div className='mb-6'>
                <label className="block font-semibold mb-2">Description</label>
                <textarea  name='description' value={productData.description} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required/>
            </div>
            <div className='mb-6'>
                <label className="block font-semibold mb-2">Price</label>
                <input type="number" min={0} name='price' value={productData.price} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required/>
            </div>

            <div className='mb-6'>
                <label className="block font-semibold mb-2">CountInStock</label>
                <input type="number" min={0} name='countInStock' value={productData.countInStock} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required/>
            </div>
            <div className='mb-6'>
                <label className="block font-semibold mb-2">SKU</label>
                <input type="text" name='sku' value={productData.sku} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded' required/>
            </div>
            <div className='mb-6'>
                <label className="block font-semibold mb-2">Sizes (comma separated)</label>
                <input type="text" name='sizes' 
                value={productData.sizes.join(',')} 
                onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(',').map((size)=>size.trim())})} 
                className='w-full p-2 border border-gray-300 rounded' required/>
            </div>
            <div className='mb-6'>
                <label className="block font-semibold mb-2">Colors (comma separated)</label>
                <input type="text" name='colors' value={productData.colors.join(',')} 
                onChange={(e)=>setProductData({...productData,colors:e.target.value.split(',').map((size)=>size.trim())})} 
                className='w-full p-2 border border-gray-300 rounded' required/>
            </div>

            {/* image upload */}
            <div className='mb-6 '>
                <label className="block font-semibold mb-2">Upload Image</label>
                <input type="file" onChange={handleImageUpload} className='w-full p-2 border border-gray-300 rounded' required/>
                <div className='flex gap-4 mt-4'>
                    {productData.images.map((image,index)=>(
                        <img key={index} src={image.url} alt={image.altText} srcset="" 
                        className='w-20 h-20 object-cover cursor-pointer border rounded-lg' 
                        onClick={()=>setProductData({...productData,images:[{url:"",altText:""}]})} />
                    ))}
                </div>
            </div>
            <button type='submit' className='w-full bg-green-500 cursor-pointer text-white py-2 rounded-md hover:bg-green-600 transition-colors'>Update Product</button>
        </form>
    </div>
  )
}

export default EditProductPage
