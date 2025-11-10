import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface HookResult<T> {
    data: T | undefined;
    isLoading: boolean;
}

export function useApi<T>(url: string): HookResult<T> {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(url)
            .then(({ data }) => setData(data))
            .finally(() => setIsLoading(false));
    }, [url]);

    return { data, isLoading };
}
