// Mock API — replace callBattleApi with your real endpoint
const mockResponses = [
  {
    solution_1: `## Approach: Divide and Conquer

Using a **recursive binary search** strategy:

1. Split the array at the midpoint
2. Recursively solve each half
3. Merge results in O(n log n) time

\`\`\`js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
\`\`\`

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n)`,
    solution_2: `## Approach: In-Place Quicksort

Using **Lomuto partition scheme** for cache-friendly access:

1. Pick the last element as pivot
2. Partition elements around pivot
3. Recursively sort partitions

\`\`\`js
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
  return arr;
}
\`\`\`

**Time Complexity:** O(n log n) average, O(n²) worst  
**Space Complexity:** O(log n) stack`,
    judge: {
      solution_1_score: 8,
      solution_2_score: 9,
      solution_1_reasoning:
        "Merge sort is stable and guarantees O(n log n) in all cases, making it predictable and safe for production. However, the extra O(n) space is a trade-off.",
      solution_2_reasoning:
        "Quicksort's in-place nature with O(log n) stack space makes it more memory-efficient and cache-friendly in practice. Wins with a slight edge on real-world performance.",
    },
  },
  {
    solution_1: `## REST API Design

A **resource-centric** approach following REST conventions:

- \`GET /users\` → list all users
- \`POST /users\` → create user
- \`GET /users/:id\` → get specific user
- \`PUT /users/:id\` → full update
- \`PATCH /users/:id\` → partial update

**Pros:** Widely understood, stateless, excellent tooling support.

**Cons:** Can lead to over/under-fetching on complex queries.`,
    solution_2: `## GraphQL API Design

A **schema-first** approach with a single endpoint:

\`\`\`graphql
type Query {
  user(id: ID!): User
  users(filter: UserFilter): [User]
}

type Mutation {
  createUser(input: CreateUserInput!): User
  updateUser(id: ID!, input: UpdateUserInput!): User
}
\`\`\`

**Pros:** Precise data fetching, strongly typed, self-documenting.

**Cons:** More complex to set up, N+1 query issues need DataLoader.`,
    judge: {
      solution_1_score: 7,
      solution_2_score: 9,
      solution_1_reasoning:
        "REST is mature and simple but struggles with complex, nested data requirements — a common need in modern apps.",
      solution_2_reasoning:
        "GraphQL elegantly handles complex queries and eliminates over-fetching. Its type system and introspection make it a superior choice for rich UIs.",
    },
  },
  {
    solution_1: `## CSS Grid Layout

Using **CSS Grid** for the two-dimensional layout:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
\`\`\`

Ideal for complex layouts requiring both row and column control. Grid areas allow named placement for clarity.

**Best for:** Dashboard layouts, card grids, magazine-style designs.`,
    solution_2: `## CSS Flexbox Layout

Using **Flexbox** for one-dimensional flow:

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.item { flex: 1 1 300px; }
\`\`\`

Flexbox shines in component-level layouts where items need to grow, shrink, or center naturally.

**Best for:** Navigation bars, card rows, form controls, centering.`,
    judge: {
      solution_1_score: 9,
      solution_2_score: 8,
      solution_1_reasoning:
        "Grid's two-dimensional control is exactly what this layout needs. Named template areas make the code readable and its intrinsic sizing handles responsiveness elegantly.",
      solution_2_reasoning:
        "Flexbox is excellent for simpler scenarios but lacks the 2D power Grid offers. It remains the better choice for linear, single-axis layouts.",
    },
  },
];

let callCount = 0;

export async function callBattleApi(problem) {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 2200));

  const response = mockResponses[callCount % mockResponses.length];
  callCount++;

  return {
    problem,
    ...response,
  };
}
