export const defaultTabs = ["Fashion", "Cuisine", "Greetings", "Taboos", "Marriage", "Festival"];
export const extraTabs = ["Music", "Dance", "Spirituality", "Architecture", "Art"];

export const extractKeywords = (text, topic) => {
  const lower = text.toLowerCase();
  const patterns = {
    Fashion: /dress|clothing|attire|style|textile/g,
    Cuisine: /dish|food|meal|spice|cuisine/g,
    Marriage: /wedding|ritual|bride|groom|ceremony/g,
    Festival: /festival|celebration|holiday|parade|tradition/g,
    Music: /music|instrument|song|rhythm|melody/g,
    Dance: /dance|movement|choreography|ritual/g,
    Spirituality: /spiritual|belief|faith|religion|ancestor/g,
    Architecture: /building|structure|design|temple|monument/g,
    Art: /art|painting|sculpture|craft|expression/g,
    Greetings: /hello|greeting|salutation|respect|handshake/g,
    Taboos: /taboo|forbidden|avoid|prohibited|custom/g,
  };
  const matches = text.match(patterns[topic]) || [];
  return [...new Set(matches)].slice(0, 5).join(", ");
};

export const generateContentMap = async (query, summary) => {
  const base = summary || `Cultural insights about ${query} are currently limited.`;
  const allTabs = [...defaultTabs, ...extraTabs];
  const map = { Description: base };

  const wikidataRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${query}&language=en&format=json&origin=*`);
  const wikidata = await wikidataRes.json();
  const entity = wikidata.search?.[0]?.label || "";

  for (const tab of allTabs) {
    const keywords = extractKeywords(base, tab);
    map[tab] = keywords
  ? `${tab} in ${query} includes elements like ${keywords}.`
  : `${tab} in ${query} reflects unique cultural expressions.`;

  }

  return map;
};
