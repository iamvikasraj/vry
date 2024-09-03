function loadTweets() {
  const tweetContainers = document.querySelectorAll(".tweet-container");

  tweetContainers.forEach((container) => {
    const tweetId = container.getAttribute("data-tweet-id");
    const url = `https://publish.twitter.com/oembed?url=https://twitter.com/Vraj247/status/${1828705148161429543}&omit_script=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML = data.html;
      })
      .catch((error) => console.error("Error:", error));
  });
}

function loadTwitterScript() {
  const script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  script.charset = "utf-8";
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTweets();
  loadTwitterScript();
});
