/** @format */

class Product {
	constructor(id, name, category, stock, price, image) {
		this.id = id
		this.name = name
		this.category = category
		this.stock = stock
		this.price = price
		this.image = image
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
	const selected = data.closest('.item-product-list')

	let product = new Product(
		selected.querySelector('.item-product-list-id').textContent,
		selected.querySelector('.item-product-list-title').textContent,
		selected.querySelector('.item-product-list-category').textContent,
		selected.querySelector('.item-product-list-stock').textContent,
		selected.querySelector('.item-product-list-price').textContent,
		selected.querySelector('.item-product-list-image').src
	)

	const r = cart.findIndex((i) => {
		return i.id === product.id
	})

	if (r === -1) {
		const productPush = { ...product, quantity: 1 }
		cart.push(productPush)
	} else {
		if (cart[r].quantity >= cart[r].stock) {
			$('#stockModal').modal()
			return
		}
		cart[r].quantity = cart[r].quantity + 1
	}
	localStorage.setItem('cart', JSON.stringify(cart))
	document.getElementById('cartQuantity').innerHTML = CartQuantity(cart)
}

const GetStoreData = async () => {
	let cart = localStorage.getItem('cart')
	if (!cart) {
		localStorage.setItem('cart', JSON.stringify([]))
	}
	var cfg = {
		apiKey: 'AIzaSyCQQZT_W3C-0yU8JxIBtf33fW1026do-Kg',
		authDomain: 'faby-js.firebaseapp.com',
		projectId: 'faby-js',
		storageBucket: 'faby-js.appspot.com',
		messagingSenderId: '130264108257',
		appId: '1:130264108257:web:508d2b0bc012006cbcfba0',
	}

	firebase.initializeApp(cfg)
	const db = firebase.firestore()
	const data = db.collection('coder-js-store')

	await data.get().then((r) => {
		let array = []

		r.docs.map((item) => {
			return array.push({ ...item.data(), id: item.id })
		})

		ProductList(array)
		localStorage.setItem('productList', JSON.stringify(array))
	})
}

const ProductList = (item) => {
	let cart = localStorage.getItem('cart')
	if (!cart) {
		localStorage.setItem('cart', JSON.stringify([]))
	}
	let list = document.createElement('ul')

	item.forEach((e) => {
		let li = document.createElement('li')
		li.innerHTML = `<div class='item-product-list'>
                      <img class='item-product-list-image' src="${e.image}" alt="${e.name}" width="600" height="400">
                      <h6>Id: <span class='item-product-list-id'>${e.id}</span></h6>
											<h5>Nombre: <span class='item-product-list-title'>${e.name}</span></h5>
											<h5>Categoria: <span class='item-product-list-category'>${e.category}</span></h5>
											<h5>Stock: <span class='item-product-list-stock'>${e.stock}</span></h5>
											<h5>Precio: $<span class='item-product-list-price'>${e.price}</span></h5>
                      <button class='cart-button-action btn btn-primary'>Agregar a la Bolsa</button>
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
		const products = JSON.parse(localStorage.getItem('productList'))
		const array = [...products]
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
		const products = JSON.parse(localStorage.getItem('productList'))
		const array = [...products]
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
		li.innerHTML = `
                    <div class='item-product-cart-list'>
                      <img class='item-product-cart-list-image' src="${e.image}" alt="${
			e.name
		}" width="600" height="400">
                      <h4>Id: <span class='item-product-cart-list-id'>${e.id}</span></h4>
											<h4>Nombre: <span class='item-product-cart-list-title'>${e.name}</span></h4>
											<h5>Categoria: <span class='item-product-cart-list-category'>${e.category}</span></h5>
											<h5>Stock: <span class='item-product-cart-list-stock'>${e.stock}</span></h5>
											<h5>Cantidad: <span class='item-product-cart-list-quantity'>${e.quantity}</span></h5>
											<h5>Precio por Unidad: <span class='item-product-cart-list-price'>$${FormatPrice(
												e.price
											)}</span></h5>
                      <div>
                        <button class='item-product-cart-list-quantity-add'>+</button>
                        <button class='item-product-cart-list-quantity-delete'>-</button>
                      </div>
                      <button class='remove-item-cart'>Eliminar</button>
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
	await GetStoreData()
	await ProductSortAsc()
	await ProductSortDesc()
	document.getElementById('cartQuantity').innerHTML = await CartQuantity(cart)
}
DomLoaded()
