const handleError = async (error: any) => {
    try {
        console.error("Application Error", error);
    } catch (e) {
        console.error(`handleError threw an error ${e}`);
    }
}

export default handleError;