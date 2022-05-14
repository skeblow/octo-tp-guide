class TokenService {
    public getToken(): string {
        return localStorage.getItem('token') + '';
    }

    public saveToken(token: string | null): void {
        if (! token) {
            localStorage.removeItem('token');
        }

        localStorage.setItem('token', token + '');
    }
}

export default new TokenService();
