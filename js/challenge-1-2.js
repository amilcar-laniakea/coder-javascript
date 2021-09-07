/** @format */

/* Algoritmo con desafios 1 y 2 de la clase: */

const BasicAlgorithm = () => {
	let firstName = prompt('Ingresa tu Nombre: (No pongas "Lionel")')
	let lastName = prompt('Ingresa tu Apellido: (No pongas "Messi")')
	let firstNumber = prompt('Ingresa un Número')
	let lastNumber = prompt('Ingresa otro Número :)')

	if (!firstName) {
		alert('No ingresaste tu Nombre, intenta de nuevo')
		return
	} else if (firstName.toLowerCase() === 'lionel') {
		alert('No eres Lionel Messi, impostor!')
		return
	}

	if (!lastName) {
		alert('No ingresaste tu Apellido, intenta de nuevo')
		return
	} else if (lastName.toLowerCase() === 'messi') {
		alert('No eres Lionel Messi, impostor!')
		return
	}

	firstNumber = parseFloat(firstNumber)
	lastNumber = parseFloat(lastNumber)

	if (!firstNumber) {
		alert('No ingresaste el primer número o el valor ingresado no es un número, intenta de nuevo')
		return
	}

	if (!lastNumber) {
		alert(
			'No ingresaste el segundo número o el valor ingresado no es un número, intenta de nuevo'
		)
		return
	}

	const sum = firstNumber + lastNumber
	const multiply = firstNumber * lastNumber
	const divide = firstNumber / lastNumber

	const completeName = 'Hola, tu Nombre Completo es: ' + firstName + ' ' + lastName

	console.log(completeName)
	alert(completeName)
	alert('La suma da un total de: ' + sum)
	alert('La multiplicación da un total de: ' + multiply)
	alert('La división da un total de: ' + divide)
}

BasicAlgorithm()
