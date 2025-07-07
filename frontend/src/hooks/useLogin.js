import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api";

const useLogin = () => {
    const queryClient = useQueryClient() ;
    const mutation = useMutation({
        mutationFn : login,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
        }
    })
    return {
        loginMutation: mutation.mutateAsync,
        isPending : mutation.isPending,
        error : mutation.error,
    }
}

export default useLogin;