(function () {
  console.log("ChatGPT Navigation Enhancer is active!");

  // Scroll step in pixels
  const scrollStep = 100;

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

  // Simple scroll functions
  const scrollUp = () => {
    window.scrollBy({ top: -scrollStep, left: 0, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: scrollStep, left: 0, behavior: "smooth" });
  };

  // Attach event listeners to the buttons
  upButton.addEventListener("click", scrollUp);
  downButton.addEventListener("click", scrollDown);

  // Add keyboard support for arrow keys
  document.addEventListener("keydown", (e) => {
    // If something like an input or textarea is focused, blur it to allow scrolling
    const activeElement = document.activeElement;
    const isInput = activeElement && 
      (activeElement.tagName.toLowerCase() === 'input' || 
       activeElement.tagName.toLowerCase() === 'textarea' ||
       activeElement.isContentEditable);

    if (isInput) {
      activeElement.blur();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      scrollDown();
    }
  });

  console.log("ChatGPT Navigation Enhancer loaded: arrow keys and buttons now scroll the page.");
})();
