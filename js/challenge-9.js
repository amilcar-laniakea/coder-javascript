/** @format */

const dataExample = [
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
]

$(document).ready(() => {
	$('#renderList').on('click', () => {
		dataExample.forEach((e) => {
			$('#listExample').append(
				$('<li>').html(`
										<div class='product-list-example'>
                      <h4>Id: <span class='product-id'>${e.id}</span></h4>
											<h4>Nombre: <span class='product-name'>${e.name}</span></h4>
											<h5>Categoria: <span class='product-category'>${e.category}</span></h5>
											<h5>Stock: <span class='product-stock'>${e.stock}</span></h5>
											<h5>Precio: $<span class='product-price'>${e.price}</span></h5>
                      <button class='cart-button-action btn btn-primary'>Agregar al Carrito(Localstorage)</button>
                    </div>`)
			)
		})
	})

	$('#unRenderList').on('click', () => {
		$('#listExample').html('')
	})
	$('#concatenatedAnimation').click(() => {
		$('#animationExample1').fadeIn(1000).delay(5000).fadeOut(1000)
		setTimeout(() => {
			$('#div2').fadeIn(2000).delay(1000).fadeOut(2000)
		}, 7000)
	})
})
