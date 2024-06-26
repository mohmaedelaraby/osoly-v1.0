import { useToast } from "@chakra-ui/react"

export const useToastMessage = () => {
    const toast = useToast()

    const handleSuccess = (description = 'Success') => {
        toast({
            description,
            status: 'success',
            isClosable: true,
        })
    }

    const handleError = (description = "Something went wrong") => {
        toast({
            description,
            status: 'error',
        })
    }
    const handleInfo = (description = "") => {
        toast({
            description,
            status: 'info',
        })
    }

    return ({
        successToast: handleSuccess,
        errorToast: handleError,
        infoToast: handleInfo
    })
}