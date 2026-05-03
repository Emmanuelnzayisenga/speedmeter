import Register from "@/components/Register";
import BackButton from "@/components/ui/BackButton";

export const dynamic = "force-dynamic";

function page() {
  return (
    <div>
      <BackButton />
      <Register />
    </div>
  );
}
export default page;
