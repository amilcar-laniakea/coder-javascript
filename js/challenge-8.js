/** @format */

const Data = [
	{
		id: 1,
		name: 'Producto prueba 1',
		category: 'Ejemplo',
		price: 5600,
		stock: 1,
	},
	{
		id: 2,
		name: 'Producto prueba 2',
		category: 'Ejemplo',
		price: 7300,
		stock: 3,
	},
	{
		id: 3,
		name: 'Producto prueba 3',
		category: 'Ejemplo',
		price: 1230,
		stock: 10,
	},
	{
		id: 4,
		name: 'Producto prueba 4',
		category: 'Ejemplo',
		price: 1170,
		stock: 8,
	},
	{
		id: 5,
		name: 'Producto prueba 5',
		category: 'Ejemplo',
		price: 700,
		stock: 2,
	},
	{
		id: 6,
		name: 'Producto prueba 6',
		category: 'Ejemplo',
		price: 1500,
		stock: 5,
	},
]

class Product {
	constructor(id, name, category, stock, price) {
		this.id = id
		this.name = name
		this.category = category
		this.stock = stock
		this.price = price
	}
}

const FormatPrice = (cart) => {
	if (cart) {
		return cart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	} else {
		return 0
	}
}

const CartQuantity = (cart) => {
	if (cart) {
		return cart.reduce((acc, itemCart) => acc + itemCart.quantity, 0)
	} else {
		return 0
	}
}

const CartTotal = (cart) => {
	return cart.reduce((acc, cartItem) => acc + parseFloat(cartItem.price) * cartItem.quantity, 0)
}

const AddToCart = (e) => {
	const cart = JSON.parse(localStorage.getItem('cart'))
	let data = e.target
	const selected = data.closest('.product-list-example')

	let product = new Product(
		selected.querySelector('.product-id').textContent,
		selected.querySelector('.product-name').textContent,
		selected.querySelector('.product-category').textContent,
		selected.querySelector('.product-stock').textContent,
		selected.querySelector('.product-price').textContent
	)

	const r = cart.findIndex((i) => {
		return i.id === product.id
	})

	if (r === -1) {
		const productPush = { ...product, quantity: 1 }
		cart.push(productPush)
	} else {
		cart[r].quantity = cart[r].quantity + 1
	}
	localStorage.setItem('cart', JSON.stringify(cart))
	document.getElementById('cartQuantity').innerHTML = CartQuantity(cart)
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
                      <h4>Id: <span class='product-id'>${e.id}</span></h4>
											<h4>Nombre: <span class='product-name'>${e.name}</span></h4>
											<h5>Categoria: <span class='product-category'>${e.category}</span></h5>
											<h5>Stock: <span class='product-stock'>${e.stock}</span></h5>
											<h5>Precio: $<span class='product-price'>${e.price}</span></h5>
                      <button class='cart-button-action btn btn-primary'>Agregar al Carrito(Localstorage)</button>
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

const ProductSortAsc = () => {
	document.querySelector('#orderAsc').addEventListener('click', () => {
		const array = [...Data]
		const Asc = (a, b) => {
			if (a.price < b.price) {
				return 1
			}
			if (a.price > b.price) {
				return -1
			}
			return 0
		}
		const pharmacySorted = array.sort(Asc)
		document.getElementById('productExampleList').innerHTML = ''
		ProductList(pharmacySorted)
	})
}

const ProductSortDesc = () => {
	document.querySelector('#orderDesc').addEventListener('click', () => {
		const array = [...Data]
		const Asc = (a, b) => {
			if (a.price > b.price) {
				return 1
			}
			if (a.price < b.price) {
				return -1
			}
			return 0
		}
		const pharmacySorted = array.sort(Asc)
		document.getElementById('productExampleList').innerHTML = ''
		ProductList(pharmacySorted)
	})
}

const CartModal = () => {
	const cart = JSON.parse(localStorage.getItem('cart'))
	let list = document.createElement('ul')
	cart.forEach((e) => {
		let li = document.createElement('li')
		li.innerHTML = `<div class='product-list-example'>
                      <h4>Id: <span class='product-id'>${e.id}</span></h4>
											<h4>Nombre: <span class='product-name'>${e.name}</span></h4>
											<h5>Categoria: <span class='product-category'>${e.category}</span></h5>
											<h5>Stock: <span class='product-stock'>${e.stock}</span></h5>
											<h5>Cantidad: <span class='product-stock'>${e.quantity}</span></h5>
											<h5>Precio: <span class='product-price'>$${FormatPrice(e.price)}</span></h5>
                    </div>
                   `
		list.appendChild(li)
	})
	document.getElementById('cart').appendChild(list)

	document.getElementById('cartListQuantity').innerHTML = CartQuantity(cart)
	document.getElementById('cartListTotal').innerHTML = CartTotal(cart)
}

const DomLoaded = async () => {
	const cart = JSON.parse(localStorage.getItem('cart'))
	await ProductList(Data)
	await ProductSortAsc()
	await ProductSortDesc()
	document.getElementById('cartQuantity').innerHTML = await CartQuantity(cart)
}
DomLoaded()
