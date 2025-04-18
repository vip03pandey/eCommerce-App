const express = require('express')
const Product = require('../models/Products')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware') 

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

module.exports = router
