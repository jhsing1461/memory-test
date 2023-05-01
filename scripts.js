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
      "https://memory-demo.fly.dev/no_memory/",
      "https://memory-demo.fly.dev/short_term_memory/",
      "https://memory-demo.fly.dev/long_term_memory/",
      "https://memory-demo.fly.dev/short_long_term_memory/",
    ];

    const requests = urls.map((url) =>
      fetch(url, {
        method: "POST",
        followAllRedirects: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: email, user_message: message, api_key: apiKey}),
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
      userInputText.textContent = `${message}`;
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
          responseText.style.whiteSpace = "pre";
          responseText.textContent = `${responseData.response}`;
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
  