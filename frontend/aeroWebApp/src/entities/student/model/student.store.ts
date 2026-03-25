import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type Student } from "./student.types";

export const useStudentStore = defineStore("student", () => {
	const student = ref<Student | null>(null)
    const students = ref<Student[]>([])

	return { student, students };
});
