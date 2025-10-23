import HistorySheet from "./History/HistorySheet";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HistorySheet />
      <div className="mt-4">{children}</div>
    </>
  );
}
