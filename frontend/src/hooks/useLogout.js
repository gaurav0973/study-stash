import { logout } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useLogout = () => {
    const queryClient = useQueryClient() ;
    const mutation = useMutation({
        mutationFn : logout ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
        },
    })
    return {
        logoutMutation: mutation.mutateAsync,
        isPending : mutation.isPending,
        error : mutation.error,
    }
}
export default useLogout;