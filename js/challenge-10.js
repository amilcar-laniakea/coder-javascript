/** @format */

$(document).ready(() => {
	$('#hpApi').click(() => {
		var hp = 'https://hp-api.herokuapp.com/api'
		$.ajax({
			url: `${hp}/characters`,
			method: 'GET',
		}).then((response) => {
			response.forEach((item) => {
				$('#hpOutput').append(`
				<div class='api-global-container'>
					<div class='api-main-container'>
						<div class='api-image-container'>
							<img class='api-image' src="${item.image}">
						</div>
						
						<h3 class='api-name'>Nombre: ${item.name}</h3>
						<h3 class='api-house'>Casa: ${item.house ? item.house : 'No especificado'}</h3>
						<h3 class='api-gender'>Fecha de nacimiento: ${
							item.dateOfBirth ? item.dateOfBirth : 'No especificado'
						}</h3>
					</div>
				</div>
				`)
			})
		})
	})
})
