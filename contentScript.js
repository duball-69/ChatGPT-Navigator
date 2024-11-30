(function () {
  console.log("ChatGPT Navigation Enhancer is active!");

  // Style the buttons directly
  const style = document.createElement("style");
  style.textContent = `
    #nav-container {
      position: fixed;
      bottom: 40px; /* Positioned 20px higher */
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 2px; /* Reduced gap for closer buttons */
    }
    #nav-container button {
      width: 40px;
      height: 40px;
      background-color: transparent; /* Transparent background */
      border: none; /* Remove default button border */
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #nav-container button::before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
    }
    #nav-up::before {
      border-width: 0 10px 15px 10px;
      border-color: transparent transparent #ffffff transparent; /* White Up Arrow */
    }
    #nav-up:hover::before {
      border-color: transparent transparent #888888 transparent; /* Grey Up Arrow on Hover */
    }
    #nav-down::before {
      border-width: 15px 10px 0 10px;
      border-color: #ffffff transparent transparent transparent; /* White Down Arrow */
    }
    #nav-down:hover::before {
      border-color: #888888 transparent transparent transparent; /* Grey Down Arrow on Hover */
    }
  `;
  document.head.appendChild(style);

  // Create navigation buttons
  const navContainer = document.createElement("div");
  navContainer.id = "nav-container";

  const upButton = document.createElement("button");
  upButton.id = "nav-up";

  const downButton = document.createElement("button");
  downButton.id = "nav-down";

  navContainer.appendChild(upButton);
  navContainer.appendChild(downButton);
  document.body.appendChild(navContainer);

  // Function to get all <article> elements
  const getArticles = () => Array.from(document.querySelectorAll("article"));

  // Initialize variables for tracking navigation
  let articles = getArticles();
  let currentIndex = -1;

  // Scroll up by skipping 1 article, starting at the second-to-last article
  const scrollToPrevious = () => {
    if (articles.length === 0) {
      articles = getArticles(); // Refresh the list if no articles are found
      console.log("No articles found. Refreshed articles list.");
    }

    if (currentIndex === 0) {
      // If at the first article, wrap around to the last article
      currentIndex = articles.length - 1;
      console.log("Wrapped to the last article.");
    } else if (currentIndex === -1 || currentIndex > 0) {
      // Start at the second-to-last article if not initialized, or move up
      currentIndex = currentIndex === -1 ? articles.length - 2 : currentIndex - 1;
      console.log(`Moved to article index: ${currentIndex}`);
    } else {
      console.log("Already at the beginning.");
      return;
    }

    // Ensure currentIndex is within bounds
    if (currentIndex >= 0 && currentIndex < articles.length) {
      const targetArticle = articles[currentIndex];
      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log(`Scrolled to article index: ${currentIndex}.`);
      } else {
        console.error(`Article at index ${currentIndex} is undefined.`);
      }
    }
  };

  // Scroll down by skipping 1 article
  const scrollToNext = () => {
    if (articles.length === 0) {
      articles = getArticles(); // Refresh the list if no articles are found
      console.log("No articles found. Refreshed articles list.");
    }

    if (currentIndex === -1) {
      // Start at the first article if not initialized
      currentIndex = 0;
      console.log("Initialized at the first article.");
    } else if (currentIndex < articles.length - 1) {
      // Increment by 1 to go to the next article
      currentIndex++;
      console.log(`Moved to article index: ${currentIndex}`);
    } else {
      console.log("Already at the end.");
      return;
    }

    // Ensure currentIndex is within bounds
    if (currentIndex >= 0 && currentIndex < articles.length) {
      const targetArticle = articles[currentIndex];
      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log(`Scrolled to article index: ${currentIndex}.`);
      } else {
        console.error(`Article at index ${currentIndex} is undefined.`);
      }
    }
  };

  // Attach event listeners to the buttons
  upButton.addEventListener("click", scrollToPrevious);
  downButton.addEventListener("click", scrollToNext);

  // Monitor for changes in the DOM to refresh the list of <article> elements
  const observer = new MutationObserver(() => {
    const oldArticles = articles;
    articles = getArticles();
    console.log(`Mutation detected. Updated articles count: ${articles.length}.`);

    // Prevent resetting currentIndex unnecessarily
    if (currentIndex >= articles.length) {
      currentIndex = articles.length - 1;
    }
  });

  // Start observing the main content area for changes
  const mainElement = document.querySelector("main");
  if (mainElement) {
    observer.observe(mainElement, { childList: true, subtree: true });
    console.log("Started observing <main> for DOM changes.");
  } else {
    console.warn("Main element not found. Observer not initialized.");
  }
})();
