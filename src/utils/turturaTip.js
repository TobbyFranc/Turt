export const getTurturaTip = async (query) => {
  const lower = query.toLowerCase();

  const tips = {
    yoruba: "Ojude Oba festival is trending as youth remix tradition with digital storytelling.",
    nigeria: "Digital diaspora communities are reshaping Nigerian identity through fashion and language revival.",
    japan: "Online forums are buzzing about Japan’s fusion of Shinto rituals with modern pop culture.",
    india: "Twitter trends highlight a resurgence of regional Indian cuisines and wedding rituals.",
    france: "French TikTok is reviving old village customs through viral dance and dress challenges.",
  };

  return tips[lower] || "Online communities are remixing tradition and identity in surprising ways.";
};
