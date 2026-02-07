# Friendly Guide: How to Edit and Update Your Website (ai generated)

You already have a website made with Next.js.
Here’s how to download it, preview it, edit it, and push your changes back online.

---

### 1. Install Homebrew (the Mac package manager)

First, open **Terminal** (Command + Space, type "Terminal").

Paste this and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the instructions. This installs Homebrew, which helps install other tools.

---

### 2. Install Git and Node.js

Still in Terminal, run:

```bash
brew install git node
```

---

### 3. Install a text editor (VS Code)

You will need a **text editor** to edit the website files.

A text editor is an app for editing code (similar to Word for documents).
You can’t really use something like TextEdit or Word for this.

We recommend **Visual Studio Code (VS Code)**. It is free and popular.

Install it with:

```bash
brew install --cask visual-studio-code
```

Or download from:
[https://code.visualstudio.com/](https://code.visualstudio.com/)

Once installed, you will use VS Code to open and edit the website code.

---

### 4. (Optional but helpful) Install GitHub Desktop

**GitHub Desktop** is a simple app for managing your Git changes with buttons instead of typing Git commands.

You can:

- Clone the project
- See what files you changed
- Commit and push your changes to GitHub

Download here:
[https://desktop.github.com/](https://desktop.github.com/)

You can mix and match: edit in VS Code, preview in Terminal, push changes in GitHub Desktop.

---

### 5. Clone your website code

Ask your brother (me) for the GitHub link to your website repo (looks like `https://github.com/...`).

You can either:

**Option A:** Use GitHub Desktop to clone it (easiest)

**Option B:** Use Terminal:

```bash
cd ~/Documents
git clone https://github.com/YOUR_REPO_URL.git
cd YOUR_PROJECT_FOLDER
```

---

### 6. Install the website dependencies

Inside the project folder (in Terminal):

```bash
npm install
```

---

### 7. Run the website locally (preview your changes)

Inside the project folder (in Terminal):

```bash
npx next dev
```

You will see a link like:
`http://localhost:3000`

Open that in your browser. You are now previewing the site locally.
Any edits you make will show here.

---

### 8. How to edit the website (React & Next.js explained)

#### How the site works:

This website is built with **React** and **Next.js**.

- **React** = a way of building a site from small building blocks called **components**.
- **Next.js** = a framework that adds routing, performance, and extra features on top of React.

Example: in `app/page.tsx` you will see this code:

```tsx
export default function PortfolioPage() { ... }
```

That defines the **main page component**.

Other things you will see:

- The **portfolioData** object at the top contains all the text and images that appear on the site.
- The **AnimatedHeroText** component makes the text animate at the top.
- The **Projects** section is built by looping through `portfolioData.projects`.

#### How to edit:

1. Open VS Code
2. Open your project folder
   (File → Open Folder → select your project) 3. You will see files like:

   ```
   /app/page.tsx
   /app/layout.tsx
   /public/images/...
   ```

   Edit the `page.tsx` file to change text, images, or layout.
   You can also add new projects to the `portfolioData.projects` array.

#### Learning React:

If you want to learn **what React is doing under the hood**, I strongly recommend:

- Asking **ChatGPT** inside VS Code
  (install the "ChatGPT" extension for VS Code if you want)
  - Or just asking me (your brother)
  - Or searching: "React components beginner guide" or "How React works"

  React is very popular, there are **tons of tutorials and videos**.

  But to start — you can just edit this file and change text/images without needing to deeply know React.

  ***

### 9. Push your changes

**Option A:** Use GitHub Desktop → commit and push with buttons.

**Option B:** Use Terminal:

```bash
git add .
git commit -m "Your message about what you changed"
git push
```

---

### Summary (Most common commands)

- `npx next dev` → run the site locally
- Edit code in VS Code
- Push changes with GitHub Desktop or `git push`
