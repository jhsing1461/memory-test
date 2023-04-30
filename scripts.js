document.getElementById("submitButton").addEventListener("click", async function () {
    const emailInput = document.getElementById("emailInput");
    const apiKeyInput = document.getElementById("apiKeyInput");
    const email = emailInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!email) {
      emailInput.focus();
      return;
    }
  
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (!message) {
      userInput.focus();
      return;
    }
  
    userInput.value = "";
  
    const urls = [
      "http://127.0.0.1:8000/no-memory",
      "http://127.0.0.1:8000/short-term",
      "http://127.0.0.1:8000/long-term",
      "http://127.0.0.1:8000/short-long-term",
    ];

    const requests = urls.map((url) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: email, input: message, api_key: apiKey}),
      })
    );
  
    const historyContainers = document.querySelectorAll(".historyContainer");
  
    historyContainers.forEach((container, index) => {
      const messageWrapper = document.createElement("div");
      messageWrapper.className = "messageWrapper";
  
      const userRow = document.createElement("div");
      userRow.className = "userRow";
      const userInputText = document.createElement("span");
      userInputText.style.color = "#27ae60";
      userInputText.textContent = `User: ${message}`;
      userRow.appendChild(userInputText);
      messageWrapper.appendChild(userRow);
  
      container.appendChild(messageWrapper);
  
      requests[index]
        .then(async (response) => {
          const aiRow = document.createElement("div");
          aiRow.className = "aiRow";
  
          const responseData = await response.json();
          const responseText = document.createElement("span");
          responseText.style.color = response.ok ? "#27ae60" : "red";
          responseText.textContent = `AI: ${responseData.response}`;
          aiRow.appendChild(responseText);
  
          messageWrapper.appendChild(aiRow);
        })
        .catch((error) => {
          const aiRow = document.createElement("div");
          aiRow.className = "aiRow";
          aiRow.style.color = "red";
          aiRow.textContent = `Error: ${error.message}`;
          messageWrapper.appendChild(aiRow);
        });
    });
  });
  