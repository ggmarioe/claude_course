export default function NotePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Note editor page – {params.id}</h1>
    </div>
  );
}
