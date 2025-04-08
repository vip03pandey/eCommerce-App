import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
const Home = () => {
  const placeHolderProducts = [
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
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
      <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
      <ProductDetails/>
      <div className='container mx-auto '>
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
        <ProductGrid products={placeHolderProducts}/>
      </div>
    </div>
  )
}

export default Home
