import { ReactElement } from "react";

export function BlogItem({
  title,
  content,
  createdAt,
  editedAt,
}: {
  title: string;
  content: ReactElement;
  createdAt: string;
  editedAt: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Published: {createdAt}</p>
      <p>Last edited: {editedAt}</p>
      <>{content}</>
    </div>
  );
}
