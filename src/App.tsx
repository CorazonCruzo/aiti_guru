import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { QueryProvider } from "@/app/providers/QueryProvider";
import { SessionProvider } from "@/app/providers/SessionProvider";
import { router } from "@/app/router/router";

function App() {
    return (
        <QueryProvider>
            <SessionProvider>
                <RouterProvider router={router} />
            </SessionProvider>
            <Toaster position="top-right" />
        </QueryProvider>
    );
}

export default App;
