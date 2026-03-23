import { useUserStore } from "@/store/userState";
import { ref, reactive } from "vue";

export function useUsers() {
    const users = reactive({
        total: 0,
        data: [],
    });
    const user = ref(null);
    const store = useUserStore();

    async function getUsers(params) {
        const { data, meta } = await store.getUsers(params);
        users.data = data;
        users.total = meta.total;
    }

    async function getUserById(id) {
        const data = await store.getUserById(id)
        user.value = data
    }

    return {
        users,
        user,
        getUsers,
        getUserById
    };
}
