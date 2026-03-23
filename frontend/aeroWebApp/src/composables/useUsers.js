import { useUserStore } from "@/store/userState";
import { ref, reactive } from "vue";

export function useStudents() {
    const users = reactive({
        total: 0,
        data: [],
    });
    const user = ref(null);
    const store = useUserStore();

    async function getUsers(params) {
        const { data, meta } = await store.getStudents(params);
        users.data = data;
        users.total = meta.total;
    }

    return {
        users,
        user,
        getUsers,
    };
}
