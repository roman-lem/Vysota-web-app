
import type { NewStudent, Student, StudentDto } from "../model/student.types";


export function studentMapper(dto: StudentDto): Student {
	const [year, month, day] = dto.birth_date.split("-").map((i) => Number(i));
	return {
		id: dto.id,
		name: dto.name,
		parentName: dto.parent_name,
		parentPhone: dto.parent_phone,
		level: dto.level,
		birthDate: new Date(year!, month! - 1, day!),
	};
}

export function studentToDto(student: Student): StudentDto{
	return {
		id: student.id,
		name: student.name,
		parent_name: student.parentName,
		parent_phone: student.parentPhone,
		level: student.level,
		birth_date: student.birthDate.toLocaleDateString(),
	};
}


export function newStudentToDto(student: NewStudent): StudentDto {
	console.log("NewStudentDto", student)
	return {
		id: -1,
		name: student.name,
		parent_name: student.parentName,
		parent_phone: student.parentPhone,
		level: student.level,
		birth_date: new Date(student.birthDate).toLocaleDateString(),
	};
}