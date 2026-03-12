import Product from "../model/Product.js"

// GET all products (menu items)

export const getProducts = async (req, res) => {
  try {

    const products = await Product.find()

    res.status(200).json(products)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }
}