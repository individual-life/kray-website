import Header from "@/components/common/Header";

export default function KrayNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-(--color-white-grey) w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
}
