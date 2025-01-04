import { useStore } from "../../data/useStore";
import Detail from "../Curse/Detail";
import appStyles from "../../assets/css/app.module.css"

const DetailLayout = () => {
  const curses = useStore((state) => state.curses);
  const schedules = useStore((state) => state.schedules);
  const index = useStore((state) => state.index);

  return (
    <div className={appStyles["detail-layout"]}>
      {curses.map((curse) => {
        const schedule = schedules[index];
        const names = curse.nrcs.flatMap((c) => c.curse);
        const nrc = schedule?.nrcs.find((nrc) => names.includes(nrc.curse));
        return <Detail nrc={nrc} key={curse.curse} isOpen print />;
      })}
    </div>
  );
};

export default DetailLayout;
