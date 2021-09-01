/** @format */

CounterSimple = (e) => {
	for (let i = 1; i <= e; i++) {
		console.log(`El contador recorre con el numero: ${i}`)
	}
}

CounterText = (e, n) => {
	let output = 0
	for (let i = 1; i <= e; i++) {
		output = output + n
		console.log(`El contador recorre con el numero de 5 en 5: ${output}`)
	}
}

const CiclesAlgorithm = async () => {
	let number

	number = prompt('Ingresa un Número:')

	while (number === null || number == '' || isNaN(number) || number <= 0) {
		number = prompt('Ingresa un Número:')
	}

	parseInt(number)
	if (number) {
		if (number > 1 && number <= 100) {
			console.log('Contador sencillo:')
			CounterSimple(number)
			console.log('Contador de 5 en 5:')
			CounterText(number, 5)
		} else if (number > 100) {
			alert('Mucho computo intenta con un numero menor...')
		} else {
			alert('No puede hacerse un ciclo con 1 :)')
		}
	}
}

CiclesAlgorithm()
