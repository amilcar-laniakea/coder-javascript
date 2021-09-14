/** @format */

const Data = [
	{
		name: 'Producto prueba 1',
		category: 'Ejemplo',
		price: 5600,
		stock: 1,
	},
	{
		name: 'Producto prueba 2',
		category: 'Ejemplo',
		price: 7300,
		stock: 3,
	},
	{
		name: 'Producto prueba 3',
		category: 'Ejemplo',
		price: 1230,
		stock: 10,
	},
]

class Product {
	constructor(name, category, stock, price) {
		this.name = name
		this.category = category
		this.stock = stock
		this.price = price
	}
}

const AddToCart = (e) => {
	const cart = JSON.parse(localStorage.getItem('cart'))
	let data = e.target
	const selected = data.closest('.product-list-example')
	cart.push(
		new Product(
			selected.querySelector('.product-name').textContent,
			selected.querySelector('.product-category').textContent,
			selected.querySelector('.product-stock').textContent,
			selected.querySelector('.product-price').textContent
		)
	)
	localStorage.setItem('cart', JSON.stringify(cart))
}

const ProductList = (item) => {
	let cart = localStorage.getItem('cart')
	if (!cart) {
		localStorage.setItem('cart', JSON.stringify([]))
	}
	let list = document.createElement('ul')

	item.forEach((e) => {
		let li = document.createElement('li')
		li.innerHTML = `<div class='product-list-example'>
											<h4 class='product-name'>Nombre: ${e.name}</h4>
											<h5 class='product-category'>Categoria: ${e.category}</h5>
											<h5 class='product-stock'>Stock: ${e.stock}</h5>
											<h5 class='product-price'>Precio: ${e.price}</h5>
                      <button class='cart-button-action'>Agregar al Carrito(Localstorage)</button>
                    </div>
                   `
		list.appendChild(li)
	})
	document.getElementById('productExampleList').appendChild(list)
	const addProductCart = document.querySelectorAll('.cart-button-action')
	addProductCart.forEach((item) => {
		item.addEventListener('click', AddToCart)
	})
}

const DomLoaded = () => {
	ProductList(Data)
}
DomLoaded()
