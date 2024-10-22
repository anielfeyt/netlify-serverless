const axios = require("axios");

export const handler = async (event, context) => {
  const { imageUrl } = event.queryStringParameters;

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing imageUrl parameter" }),
    };
  }

  try {
    // Fetch the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Get the content type of the image
    const contentType = response.headers["content-type"];

    // Return the image with proper headers
    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*", // Enable CORS
      },
      body: response.data.toString("base64"),
      isBase64Encoded: true, // Important to indicate the body is base64 encoded
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching the image" }),
    };
  }
};
