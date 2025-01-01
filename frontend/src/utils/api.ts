export const BASE_URL = "http://localhost:8080/";

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include"
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "An error occurred";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();      
      const errorMessage = errorData.message || "An error occurred";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
