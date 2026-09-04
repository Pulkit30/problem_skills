## Goal

Build a small user directory using data from the JSONPlaceholder API.

## API

Use:

`https://jsonplaceholder.typicode.com/users`

## Core tasks

### 1. Fetch the users

- [ ] Fetch users from the API when the page loads.
- [ ] Store the returned users in application state.
- [ ] Display the users in a simple list or set of cards.

### 2. Add search

- [ ] Add a search input above the user list.
- [ ] Filter users by **name**.
- [ ] Make the search case-insensitive.
- [ ] Update the displayed results as the user types.

### 3. Handle UI states

Implement these three states:

- [ ] **Loading:** Show a clear loading indicator/message while fetching.
- [ ] **Error:** Show a useful message if the API request fails.
- [ ] **Empty:** Show a useful message when the search has no matches.

### 4. Basic UX

- [ ] Keep the interface simple and easy to understand.
- [ ] Make the search input clearly identifiable.
- [ ] Make sure users can easily tell how many/results are being displayed, if useful.
- [ ] Avoid unnecessary interactions or visual complexity.

## Scope

### Required

- API fetching
- User list
- Name search
- Loading state
- Error state
- Empty state
- Reasonably clean, readable code

### Not required

Do **not** spend time on:

- Authentication
- Routing
- Pagination
- Backend changes
- Complex state-management libraries
- Advanced animations
- Elaborate visual design
- Automated tests

## Stretch goal

Only attempt this if the core requirements are complete:

- [ ] Extend search so it matches both **name and email**.
