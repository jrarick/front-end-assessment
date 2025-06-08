## Getting Started

Install the dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

## Notes

**Time to complete**: 3 hours

### What I would've implemented next

- **Better ordering**: The current ordering is based alphabetically, but it probably could (should?) have been ordered by upload order or allow users to drag to reorder images.

- **Better error handling**: The current error handling just covers bare minimum. It could be improved to provide a more user-friendly experience if something goes wrong.

- **Pagination or infinite scrolling**: If the number of images grows, pagination or infinite scrolling would avoid performance concerns that arise when loading dozens of images at the same time.

- **Allow multiple uploads**: The current implementation only allows one image to be uploaded at a time which could be frushtrating if a user has many images to upload.

- **Use server actions for mutations**: Since the requirements were to create a single page app, I didn't use server actions and redirects after uploads/deletes and just relied on JavaScript to handle mutations.

- **Create an enlarged image view**: This could be either a new route or a modal showing the image in a larger view when clicked on.

- **Animate image additions/deletions**: When an image is deleted, it would be nice to have a smooth transition instead of it just popping in and out of existence. The new ViewTransition API could be used for this.

- **Real storage solution instead of file system**: The current implementation relies on the file system for storage which isn't suitable for any production app. Would likely need blob storage or an S3 bucket for a real app.

- **Fuzzy search and/or auto-complete**: The current search matches exact string only. A fuzzy search and auto-complete feature would provide a better user experience.