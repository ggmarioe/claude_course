export default function PublicNotePage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Public note page – {params.slug}</h1>
    </div>
  );
}
