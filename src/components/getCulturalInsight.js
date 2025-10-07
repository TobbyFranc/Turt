export const getCulturalInsight = async (topic, location) => {
  const prompt = `Describe ${topic.toLowerCase()} traditions in ${location}.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a cultural expert." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No insight available.";
  } catch (error) {
    console.error(`AI error for ${topic}:`, error);
    return "Unable to fetch cultural insight.";
  }
};
