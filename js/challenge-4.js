/** @format */

const StudentAverageNotes = (item) => {
	return (item.note_1 + item.note_2 + item.note_3 + item.note_4) / 4
}

const RequestProducts = () => {
	class Student {
		constructor(name, note_1, note_2, note_3, note_4) {
			this.name = name
			this.note_1 = parseFloat(note_1)
			this.note_2 = parseFloat(note_2)
			this.note_3 = parseFloat(note_3)
			this.note_4 = parseFloat(note_4)
		}
	}

	let arrayStudents = []

	do {
		var studentName = prompt('Ingresa el Estudiante o escribe fin para finalizar:')
		if (studentName == 'fin') {
			break
		} else {
			let calification_one = prompt('Ingresa la nota 1 del estudiante:')
			let calification_two = prompt('Ingresa la nota 2 del estudiante:')
			let calification_three = prompt('Ingresa la nota 3 del estudiante:')
			let calification_four = prompt('Ingresa la nota 4 del estudiante:')
			arrayStudents.push(
				new Student(
					studentName,
					calification_one,
					calification_two,
					calification_three,
					calification_four
				)
			)
		}
	} while (studentName != 'fin')

	let listStudents = document.createElement('ul')

	let totalNoteAverageAlumns = 0

	arrayStudents.forEach((item) => {
		let averageNotes = StudentAverageNotes(item)
		totalNoteAverageAlumns = totalNoteAverageAlumns + averageNotes
		let li = document.createElement('li')
		li.innerHTML = `
                      <h3>Nombre: ${item.name}<h3/>
                      <h3>Nota Sociales: ${item.note_1}<h3/>
                      <h3>Nota Geografia: ${item.note_2}<h3/>
                      <h3>Nota Matematicas${item.note_3}<h3/>
                      <h3>Nota Fisica: ${item.note_4}<h3/>
                      <h3>Promedio de Notas: ${averageNotes}<h3/>
                     `
		listStudents.appendChild(li)
	})
	totalNoteAverageAlumns = totalNoteAverageAlumns / arrayStudents.length
	document.getElementById('results').appendChild(listStudents)
	document.getElementById('courseAverage').innerHTML = totalNoteAverageAlumns
}
RequestProducts()
