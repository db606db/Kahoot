
async function getQuestionAndChoices() {
  const question = document.querySelector('.question-text')?.innerText.trim();
  const choices = Array.from(document.querySelectorAll('.answer-button')).map(btn => btn.innerText.trim());
  return question && choices.length ? { question, choices } : null;
}

async function askAI(question, choices) {
  const prompt = `Réponds à cette question de quiz. Question : "${question}". Choix : ${choices.join(", ")}`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Aucune réponse";
}

function showFloatingAnswer(answer) {
  let panel = document.getElementById("ai-answer-box");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "ai-answer-box";
    panel.style.position = "fixed";
    panel.style.bottom = "20px";
    panel.style.right = "20px";
    panel.style.padding = "12px 18px";
    panel.style.backgroundColor = "#ffffff";
    panel.style.color = "#000000";
    panel.style.border = "2px solid #ccc";
    panel.style.borderRadius = "10px";
    panel.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
    panel.style.zIndex = "9999";
    panel.style.fontSize = "16px";
    document.body.appendChild(panel);
  }
  panel.innerText = "🤖 Réponse IA : " + answer;
}

async function triggerAI() {
  const data = await getQuestionAndChoices();
  if (!data) return alert("Question ou réponses introuvables !");
  const aiResponse = await askAI(data.question, data.choices);
  showFloatingAnswer(aiResponse);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "triggerAI") {
    triggerAI();
    sendResponse({ status: "ok" });
  }
});
