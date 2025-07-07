import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../lib/api"

const useSignup = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: ["authUser"] 
            })
        },
    })

    return {
        signupMutation: mutation.mutateAsync, 
        isPending: mutation.isPending,
        error: mutation.error,
    }
}

export default useSignup
