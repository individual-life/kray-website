export default function KrayNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-(--color-white-grey) w-full h-screen  px-[50px] pb-[20px]  flex flex-col">
      {children}
    </div>
  );
}
