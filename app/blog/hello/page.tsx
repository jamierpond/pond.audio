import { BlogItem } from "../BlogItem";
export default function Page() {
  function Content() {
    return (
      <div>
        <h1>This is the content of a blog</h1>
      </div>
    );
  }

  return (
    <BlogItem
      title="Hello, world!"
      content={Content()}
      createdAt="2021-01-01"
      editedAt="2021-01-01"
    />
  );
}
