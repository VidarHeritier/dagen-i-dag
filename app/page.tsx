import Header from "./Header/page";
import Sceleton from "./Sceleton/page";
import MainLinks from "./MainLinks/mainLinks";

export default function Home() {
  return (
    <main>
      <Header />
      <MainLinks />
      <Sceleton />
    </main>
  );
}
