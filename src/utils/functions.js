export const handleError = (error) => {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    console.error("Network error:", error.message);
  } else {
    console.error("Error fetching item:", error);
  }
  throw new Error("Failed to fetch item");
};
