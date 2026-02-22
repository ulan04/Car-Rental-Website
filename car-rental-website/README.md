# Car Rental Website (React SPA Foundations)

## Project Description
This is a simple Car Rental Website built as a React Single Page Application (SPA).  
Users can view available cars and submit a basic booking request form. The project will be expanded during the semester.

**Target audience:** students, workers, and travelers who need short-term car rental.  
**Problem solved:** centralizes car info and a basic booking flow instead of scattered chat/phone messages.

**MVP features:**
- Home page with a list of cars
- Car cards with basic information (type, price/day, seats, transmission)
- Booking request form (name, phone, dates, pickup location)
- Basic layout using Header, MainContent, Footer components
- Basic CSS styling

---

## SPA Theory Answers

### 1) What is a Single Page Application (SPA)?
A Single Page Application (SPA) is a web application that loads a single HTML page and updates the content dynamically without reloading the entire page. After the initial load, the app fetches data and renders UI changes using JavaScript. Navigation in an SPA feels like moving between pages, but technically it updates views inside the same page. This makes interactions faster and smoother. SPAs often use client-side routing to handle different views. React is commonly used to build SPAs because it efficiently updates the UI when state changes.

### 2) How does SPA differ from traditional Multi-Page Applications (MPA)?
In a traditional Multi-Page Application (MPA), each navigation usually triggers a full page reload and the server returns a new HTML page. In an SPA, navigation typically does not reload the page; it updates only the necessary parts of the UI. MPAs rely more on server-side rendering for each page, while SPAs rely more on client-side rendering after the first load. SPAs often provide a faster and more app-like user experience. However, SPAs can require more JavaScript and initial loading time. MPAs can be simpler for SEO and server-driven content, while SPAs need extra handling for SEO in some cases.

### 3) What is the Virtual DOM?
The Virtual DOM is a lightweight in-memory representation of the real DOM used by React. When state changes, React updates the Virtual DOM first instead of directly manipulating the real DOM. React then compares the new Virtual DOM with the previous one to find what changed (diffing). After that, React updates only the changed parts in the real DOM. This reduces expensive DOM operations and improves performance. The Virtual DOM helps React manage UI updates efficiently and predictably.

### 4) Why does React use a component-based architecture?
React uses a component-based architecture to break the UI into small, reusable pieces called components. This makes the code easier to organize, maintain, and scale as the application grows. Components can be reused in multiple places, reducing duplication. Each component can manage its own logic and UI, which improves separation of concerns. Component-based design also supports easier testing and debugging. In larger projects, teams can work on different components in parallel, making development more efficient.

---

## How to Run
1. Install dependencies:
   ```bash
   npm install