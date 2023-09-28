# SheetBeat
Spotter UX Engineer submission from Jake Zien
Sep 28 2023

## Design
I spent the first half-day on this project doing some design research around beat sheets and screenwriting software. I noticed a few things:
- There's no shortage of webby software trying to capture the workflow of screenwriters, including StudioBinder, Final Draft, Celtx, Save the Cat, Beat, Scrivener, Ulysses, and more. 
- All of these apps center their ui on a traditional-looking screenplay, a text document written in Courier. 
- Some of these apps have a higher-level "Beats" view that complements the long document, organizing story beats into kanban-like columns and cards.

### My idea
This is a writing task: a beat sheet is an outline of the script. The mental mode seems to be "hashing out ideas; making coarse, chunky edits." So replacing a text editor with a clicky UI doesn't seem like the right move: a user trying to write an outline won't find it faster or easier to create the outline by clicking around on plus buttons and in and out of text fields. Instead, let's leverage the user's quick-and-dirty writing to build a more useful UI for them.
The idea in a few points:
- Goal: a super responsive workflow that doesn't try to replace quick writing with slow clicking.
- A 2-pane UI, where the left pane is a text editor and the right pane displays a more visual UI.
  - The text editor pane supports markdown. Headings mark the beginning of Acts and Beats, and the content between headings becomes the content of the Acts and Beats. Use heuristics to find times and camera details in the content.
- Edits on the left and right are synchronized, so the user can define a structure in text, then edit it on the right using UI-based CRUD operations.
- When the user makes edits, update the state of the beatsheet; persist this state to the data store via the provided APIs when the user pauses editing, or at regular intervals in a long editing session.


## Implementation
This is still very much in progress; I wish it were less so! It loads the acts and beats from the API, then processes and displays them in both markdown and a basic UI. The UI supports limited interaction: you can reorder and delete Acts, and in doing so you'll experience the state issue that stymied more progress. Same for the text input. I also haven't finished reordering and deleting Beats, nor editing their text content via the right-side UI, nor the data via the APIs. Still, I think this shows the gist of the workflow I wanted to build.


## Thank you
Thanks for your consideration, and for the opportunity to stretch my dev and design skills! I hope you find the ideas here interesting. 



——— 

## Next boilerplate

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

