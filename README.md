# EnB Creations

A rustic-themed e-commerce prototype for "E&B Creations" built with SvelteKit, Tailwind CSS v4, and DaisyUI v5.

## Tech Stack

-   **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Library:** [DaisyUI v5](https://daisyui.com/)
-   **Package Manager:** [Bun](https://bun.sh/)

## Features

-   **Custom "Rustic" Theme:** A tailored color palette (Cream, Stone, Terracotta, Sage, Brown) implemented via DaisyUI and Tailwind.
-   **State Management:** Global cart and notification state using Svelte 5 Runes (`.svelte.ts` singleton).
-   **Data Model:** Aligned with Convex schema (including `quantity` tracking).
-   **Responsive Design:** Fully responsive Navbar, Hero, Shop Grid, and Footer.
-   **Animations:** Custom fade-in and hover effects.

## Project Setup

1.  **Install Dependencies:**

    ```bash
    bun install
    ```

2.  **Start Development Server:**

    ```bash
    bun run dev
    ```

3.  **Build for Production:**

    ```bash
    bun run build
    ```

## Roadmap

-   [ ] **Backend:** Integrate [Convex](https://www.convex.dev/) for database and real-time updates.
-   [ ] **Payments:** Integrate [Stripe](https://stripe.com/) for checkout processing.