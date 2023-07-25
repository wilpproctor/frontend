export default function StudentFeed({ feed }) {
  return (
    <div className="relative">
      <img width="100%" src={`data:image/jpeg;base64,${feed}`} />
    </div>
  );
}
