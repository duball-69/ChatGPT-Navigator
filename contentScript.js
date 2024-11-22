// contentScript.js

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

    if (currentIndex === -1) {
      // Start at the second-to-last article if not initialized
      currentIndex = articles.length - 2;
      console.log(`Initialized currentIndex to ${currentIndex} (second-to-last article).`);
    } else if (currentIndex > 1) {
      // Decrement by 2 to skip an article
      currentIndex -= 2;
      console.log(`Decremented currentIndex by 2. New currentIndex: ${currentIndex}.`);
    } else {
      console.log("Already at the beginning or not enough articles to skip.");
      return;
    }

    // Ensure currentIndex is within bounds
    if (currentIndex >= 0 && currentIndex < articles.length) {
      const targetArticle = articles[currentIndex];
      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: "smooth", block: "start" }); // Changed 'center' to 'start'
        console.log(`Scrolled to article index: ${currentIndex}.`);
      } else {
        console.error(`Article at index ${currentIndex} is undefined.`);
      }
    } else {
      console.error(`currentIndex ${currentIndex} is out of bounds.`);
    }
  };

  // Scroll down by skipping 1 article, starting at the second article
  const scrollToNext = () => {
    if (articles.length === 0) {
      articles = getArticles(); // Refresh the list if no articles are found
      console.log("No articles found. Refreshed articles list.");
    }

    if (currentIndex === -1) {
      // Start at the second article if not initialized
      currentIndex = 1;
      console.log(`Initialized currentIndex to ${currentIndex} (second article).`);
    } else if (currentIndex < articles.length - 2) {
      // Increment by 2 to skip an article
      currentIndex += 2;
      console.log(`Incremented currentIndex by 2. New currentIndex: ${currentIndex}.`);
    } else {
      console.log("Already at the end or not enough articles to skip.");

      // Try to scroll to the bottom or simulate button click
      const pathD = "M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z";
      const pathElement = document.querySelector(`path[d="${pathD}"]`);
      if (pathElement) {
        const button = pathElement.closest('button');
        if (button) {
          button.click();
          console.log('Clicked the "Scroll to Bottom" button.');
        } else {
          console.warn('Button containing the SVG path not found.');
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          console.log('Scrolled to the bottom of the page.');
        }
      } else {
        console.warn('SVG path element not found.');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        console.log('Scrolled to the bottom of the page.');
      }
      return;
    }

    // Ensure currentIndex is within bounds
    if (currentIndex >= 0 && currentIndex < articles.length) {
      const targetArticle = articles[currentIndex];
      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: "smooth", block: "start" }); // Changed 'center' to 'start'
        console.log(`Scrolled to article index: ${currentIndex}.`);
      } else {
        console.error(`Article at index ${currentIndex} is undefined.`);
      }
    } else {
      console.error(`currentIndex ${currentIndex} is out of bounds.`);
    }
  };

  // Attach event listeners to the buttons
  upButton.addEventListener("click", scrollToPrevious);
  downButton.addEventListener("click", scrollToNext);

  // Add event listener for keyboard arrows
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      scrollToPrevious();
    } else if (event.key === "ArrowDown") {
      scrollToNext();
    }
  });

  // Monitor for changes in the DOM to refresh the list of <article> elements
  const observer = new MutationObserver((mutationsList, observer) => {
    const oldArticles = articles;
    articles = getArticles();
    console.log(`Mutation detected. Updated articles count: ${articles.length}.`);

    // Check if a new conversation has started by comparing article counts
    if (
      Math.abs(oldArticles.length - articles.length) > 2 ||
      currentIndex >= articles.length
    ) {
      currentIndex = -1; // Reset index for new conversation
      console.log("Detected a new conversation. Resetting currentIndex.");
    } else {
      // Otherwise, just update the articles list
      console.log("Articles list updated without resetting currentIndex.");
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
