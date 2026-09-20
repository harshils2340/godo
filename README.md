# GoDo

Airbnb for things to do tonight. Type a sentence, see who is actually free, book.

Live demo: [harshils2340.github.io/godo](https://harshils2340.github.io/godo/)

You type something like `escape room in Waterloo tonight, 4 of us`. GoDo shortlists real local shops, then reads each shop’s own booking system (FareHarbor, Resova, Peek, Xola, and others) for open times and real prices. You book on GoDo. Unclaimed shops are a request against that live slot. Claimed shops can Instant Book.

GPS Near me sorts by the pin you are standing on. Otto on each listing answers only from that shop’s published facts.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

The concierge API (live times) is a separate process:

```bash
cd backend
npm install
npx tsx scripts/demo-server.mts
```

Point `VITE_API_URL` at that server, or at the hosted API.

## Stack

Vite, React, TypeScript. Node and Hono for the API. Stripe for checkout on GoDo.
