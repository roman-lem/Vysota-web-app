import { useUserStore } from "@/store/userState";
import { ref, reactive } from "vue";

export function useStudents() {
	const students = reactive({
		total: 0,
		data: [],
	});
	const student = ref(null);
	const store = useUserStore();

	async function getStudents(params) {
		const { data, meta } = await store.getStudents(params);
		students.data = data;
		students.total = meta.total;
	}

	async function getStudentById(id) {
		student.value = await store.getStudentById(id);
	}

	async function setStudentParams(data) {
		await store.setStudentParams(data);
	}

	return {
		students,
		student,
		getStudents,
		getStudentById,
		setStudentParams,
	};
}
