import StudentFeed from "./StudentFeed";

function AlertDialog({ id, metadata, onConfirm, onDeny }) {
  return (
    <div className="fixed flex items-center justify-center inset-0 z-50 bg-black/30 p-4">
      <div className="w-full max-w-5xl max-h-full overflow-y-auto bg-white px-6 py-4">
        <h1 className="text-2xl font-semibold">Alert</h1>
        <p>{id} triggered an alert. Are they cheating?</p>
        <p className="text-red-500">{metadata.reason}</p>
        <div>
          <StudentFeed
            feed={{ image: metadata.images.frontcam, detected: [] }}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-3 py-1 bg-neutral-200 font-semibold rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-neutral-200 font-semibold rounded"
            onClick={onDeny}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AlertDialogs({ useAlertStore }) {
  const caught = useAlertStore((state) => state.caught);
  const removeCaught = useAlertStore((state) => state.removeCaught);
  const addConfirmed = useAlertStore((state) => state.addConfirmed);
  return caught.map(({ id, metadata }, index) => (
    <AlertDialog
      key={index}
      id={id}
      metadata={metadata}
      onConfirm={() => {
        removeCaught(index);
        addConfirmed(id, metadata);
      }}
      onDeny={() => {
        removeCaught(index);
      }}
    />
  ));
}
