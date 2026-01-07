interface AuthContextType {
    user: User | null,
    token: string | null,
    isLoading: boolean,
    signup: () => Promise<void>,
    login: () => Promise<void>,
    logout: () => Promise<void>,
    errors: {},
    setErrors: () => void,
    setIsLoading: () => void,
    isAuthenticated: () => boolean,
}