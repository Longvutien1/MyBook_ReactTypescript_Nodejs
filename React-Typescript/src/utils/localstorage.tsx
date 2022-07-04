export const isAuthencicate = () => {
    if (!localStorage.getItem("user")) return;

    return JSON.parse(localStorage.getItem("user") as string);
}