const express = require('express')
const Product = require('../models/Products')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware') 
const mongoose = require("mongoose"); 

router.post('/', protect, admin, async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock, category,
            brand, sizes, colors, collections, material, gender, images,
            isFeatured, isPublished, tags, dimensions, weight, sku
        } = req.body
        
        const product = new Product({
            name, description, price, discountPrice, countInStock, category,
            brand, sizes, colors, collections, material, gender, images,
            isFeatured, isPublished, tags, dimensions, weight, sku,
            user: req.user._id
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err.message })
    }
})

// edit route
router.put('/:id', protect, admin, async (req, res) => {
    try{
        const {
            name, description, price, discountPrice, countInStock, category,
            brand, sizes, colors, collections, material, gender, images,
            isFeatured, isPublished, tags, dimensions, weight, sku
        } = req.body
        const product = await Product.findById(req.params.id)
        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice  
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand   || product.brand
            product.sizes = sizes   || product.sizes
            product.colors = colors     || product.colors
            product.collections = collections   || product.collections
            product.material = material   || product.material
            product.gender = gender   || product.gender
            product.images = images     || product.images
            product.isFeatured = isFeatured!==undefined ? isFeatured : product.isFeatured
            product.isPublished = isPublished!==undefined ? isPublished : product.isPublished
            product.tags = tags     || product.tags
            product.dimensions = dimensions     || product.dimensions
            product.weight = weight     || product.weight
            product.sku = sku       || product.sku
            const updatedProduct = await product.save()
            res.status(200).json(updatedProduct)
        }
        else{
            res.status(404).json({message:"Product not found"})
        }
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({ error: err.message })
    }
})

// delete route
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(product){
            await product.deleteOne()
            res.status(200).json({message:"Product deleted successfully"})
        }
        else{
            res.status(404).json({message:"Product not found"})
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({message:"Error deletign product"});
    }
})

// get products
router.get('/', async (req, res) => {
    try {
        const {
            collection, size, color, gender,
            minPrice, maxPrice, sortBy, search,
            category, material, brand, limit
        } = req.query;

        let query = {};

        // Filters
        if (collection && collection.toLowerCase() !== 'all') {
            query.collections = collection;
        }

        if (size) {
            query.sizes = { $in: size.split(',') };
        }

        if (color) {
            query.colors = { $in: [color] };
        }

        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (category && category.toLowerCase() !== 'all') {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(',') };
        }

        if (brand) {
            query.brand = { $in: brand.split(',') };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    sort = { price: 1 };
                    break;
                case 'priceDesc':
                    sort = { price: -1 };
                    break;
                case 'popularity':
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Final query
        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);

        res.json(products);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error getting products" });
    }
});

// Best sellers - specific route
router.get("/best-seller", async (req, res) => {
    try {
        const bestSellers = await Product.find().sort({ rating: -1 });
        if (bestSellers && bestSellers.length > 0) {
            res.json(bestSellers);
        } else {
            res.status(404).json({ message: "No products found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// new arrival
router.get("/new-arrivals", async (req, res) => {
    try{
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


// Single product - dynamic route 
router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        if (foundProduct) {
            res.status(200).json(foundProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error getting product" });
    }
});



// getting all products by category


router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const foundProduct = await Product.findById(id);

        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const similarProducts = await Product.find({
            _id: { $ne: new mongoose.Types.ObjectId(id) }, 
            gender: foundProduct.gender,
            category: foundProduct.category,
        }).limit(4);

        res.json(similarProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting similar products" });
    }
});


// best seller route
router.get("/best-seller", async (req, res) => {
    try{
        res.send("best seller")
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


module.exports = router
