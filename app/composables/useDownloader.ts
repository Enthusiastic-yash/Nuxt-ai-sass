export const useDownloader = () => {
    const toast = useToast()
    const downloadFile = async (url: string, filename: string = 'download.png') => {
        if (!url) {
            console.error("Download URL is missing.");
            return;
        }

        try {
            // 1. Fetch the file data as a Blob
            const response = await fetch(url);
            const blob = await response.blob();
            
            // 2. Create a temporary URL for the Blob
            const tempUrl = window.URL.createObjectURL(blob);
            
            // 3. Create and configure a temporary anchor tag
            const link = document.createElement('a');
            link.href = tempUrl;
            link.setAttribute('download', filename);
            
            // 4. Simulate a click to trigger the download
            document.body.appendChild(link);
            link.click();
            
            // 5. Clean up the temporary elements and URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(tempUrl);
            
        } catch (error) {
            console.error("Error during file download:", error);
            toast.add({
            title:'Error',
            description: "Download Failed. Please try again.",
            color:'error'
        })
        }
    };
    return {
        downloadFile
    };
};