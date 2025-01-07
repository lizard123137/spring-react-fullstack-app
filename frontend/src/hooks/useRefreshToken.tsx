import axios from "../api/axios";

export default function useRefreshToken() {
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
    }

    return refresh;
}