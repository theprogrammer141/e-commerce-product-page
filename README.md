# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it
- Bonus: Keep track of cart items even after refreshing the page (using `localStorage`)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS styling & Custom Flexbox Layouts
- Mobile-first approach
- Vanilla JavaScript
- LocalStorage API for state persistence

### What I learned

During this project, my major learnings came from tackling layout and responsive design challenges:

1. **Debugging the Box Model on Mobile:** I ran into an issue where my product image wasn't reaching the edges of the screen on mobile, despite having `width: 100%`. By tracing the DOM, I learned how padding and margin on parent containers (like the `<main>` tag) constrain the available width for child elements. 
2. **Managing Dynamic Content & Fixed Heights:** I built a dynamic cart modal that injects HTML based on the cart state. I realized that leaving CSS properties intended for empty states (like a heavy `margin-top` used to center text) can cause vertical overflow when actual content is injected. I also learned the trade-offs of using a rigid `height` versus a flexible `min-height` on components that handle dynamic HTML.
3. **State Persistence:** I implemented `localStorage` to ensure the cart data remains intact even if the user refreshes or leaves the page.

### Continued development

In future projects, I want to focus on:
- Refining CSS architectures for bigger projects, making sure that element states are predictable.
- Improving accessibility (a11y) to ensure screen readers provide standard announcements for dynamic components like modals and galleries.
- Exploring state management further, either by adopting more robust Vanilla JS architectures or transitioning into a modern framework.

### AI Collaboration

I used an AI assistant primarily acting as a "mentor" during my debugging process. Instead of asking for direct solutions or code blocks, I used it to help me trace CSS rendering behaviors. 

- **How I used it:** When my product image didn't span the full screen, or my dynamically injected cart items overflowed the modal, I provided the context and the AI asked probing questions about margins, paddings, and hard-coded heights.
- **What worked well:** The conversational debugging—being guided to identify problematic parent containers (like checking `<main>` inherited padding, or observing the `margin-top` on a dynamically injected container)—really reinforced my understanding of the CSS cascade and DOM hierarchy!

## Author

- Frontend Mentor - [@theprogrammer141](https://www.frontendmentor.io/profile/theprogrammer141)

- LinkedIn - [Muhammad Abdullah](https://www.linkedin.com/in/muhammad-abdullah-872b74278/)

- GitHub - [Muhammad Abdullah](https://github.com/theprogrammer141)