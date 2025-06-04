# About

API based Go (Gin) backend for interacting with AWS' S3 buckets. With React (Vite) frontend that mimics OS file system explorer GUI.

The API can:

1. List objects at queried path.
2. Upload object to target path.
3. Return presigned URL to target object.
4. Create a 'folder' at target path.
5. Delete folder/object at target path.

The frontend:

1. Manages complex global states with Zustand.
2. Uses TanStack Query (React Query) to cache & invalidate API calls.
3. Broken down into components.
4. Tailwind + prettier order plugin for managing CSS.



# Set up

Create .env at the root and supply with configured bucket credentials as per example:

    S3_BUCKET=""
    S3_REGION=""


Having go toolchain installed, at the root, run:

    go run .

Having Node installed, in a seperate terminal:

    cd front
    npm run dev

Open in the browser:

    http://localhost:5173/
